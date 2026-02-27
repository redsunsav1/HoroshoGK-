import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Paths - work both in dev and production
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'projects.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '../uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Email configuration from environment variables
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.yandex.ru',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

const BOOKING_EMAIL = process.env.BOOKING_EMAIL || '';

// Create mail transporter
let mailTransporter = null;
if (emailConfig.auth.user && emailConfig.auth.pass) {
  mailTransporter = nodemailer.createTransport(emailConfig);
  console.log('Email notifications enabled, sending to:', BOOKING_EMAIL);
} else {
  console.log('Email notifications disabled (SMTP_USER/SMTP_PASS not set)');
}

// --- Data helpers ---

function readProjects() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading projects:', error);
  }
  return [];
}

function writeProjects(projects) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}

function readBookings() {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      return JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf-8'));
    }
  } catch (error) {
    console.error('Error reading bookings:', error);
  }
  return [];
}

function writeBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
}

// --- Middleware ---

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// --- Image Upload ---

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + Math.round(Math.random() * 1000) + ext;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  },
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: '/uploads/' + req.file.filename });
});

// --- Projects API (for DataContext.tsx) ---

// Get all projects
app.get('/api/projects', (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  const projects = readProjects();
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Create project
app.post('/api/projects', (req, res) => {
  const projects = readProjects();
  const newProject = req.body;
  projects.push(newProject);
  writeProjects(projects);
  res.status(201).json(newProject);
});

// Update project
app.put('/api/projects/:id', (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    projects[index] = req.body;
    writeProjects(projects);
    res.json(req.body);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    projects.splice(index, 1);
    writeProjects(projects);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Reset to initial data
app.post('/api/reset', (req, res) => {
  const initialProjects = req.body.projects || [];
  writeProjects(initialProjects);
  res.json({ success: true });
});

// --- Booking API ---

app.post('/api/booking', async (req, res) => {
  try {
    const { name, phone, projectName, apartmentId, rooms, area, floor, number, price } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const booking = {
      id: Date.now().toString(),
      name,
      phone,
      projectName: projectName || '',
      apartmentId: apartmentId || '',
      rooms: rooms || 0,
      area: area || 0,
      floor: floor || 0,
      number: number || '',
      price: price || '',
      date: new Date().toISOString(),
    };

    // Save booking to file
    const bookings = readBookings();
    bookings.push(booking);
    writeBookings(bookings);

    // Send email notification via SMTP
    if (mailTransporter && BOOKING_EMAIL) {
      const subject = `🏠 Новая заявка: ${projectName} - ${rooms}-комн. кв. ${number || ''}`;
      const htmlBody = `
        <h2>Новая заявка на бронирование</h2>
        <table style="border-collapse: collapse; font-size: 16px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>ФИО:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Телефон:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Проект:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${projectName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Квартира:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${rooms}-комн., ${area} м²</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Этаж:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${floor}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Номер квартиры:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${number || '—'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Цена:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${price}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Дата заявки:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</td></tr>
        </table>
        <p style="color: #666; margin-top: 20px;">Заявка сохранена в системе. ID: ${booking.id}</p>
      `;

      try {
        await mailTransporter.sendMail({
          from: emailConfig.auth.user,
          to: BOOKING_EMAIL,
          subject,
          html: htmlBody,
        });
        console.log('Booking email sent to', BOOKING_EMAIL);
      } catch (emailErr) {
        console.error('Failed to send booking email:', emailErr.message);
      }
    } else {
      console.log('New booking received (email not configured):', booking);
    }

    res.json({ ok: true, bookingId: booking.id });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings (for admin)
app.get('/api/bookings', (req, res) => {
  res.json(readBookings());
});

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not built. Run: npm run build');
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/projects`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});
