import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import sharp from 'sharp';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Paths - work both in dev and production
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'projects.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const SITE_SETTINGS_FILE = path.join(DATA_DIR, 'site-settings.json');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');
const VACANCIES_FILE = path.join(DATA_DIR, 'vacancies.json');
const FAQ_FILE = path.join(DATA_DIR, 'faq.json');
const PAGE_SETTINGS_FILE = path.join(DATA_DIR, 'page-settings.json');
const HOME_CONTENT_FILE = path.join(DATA_DIR, 'home-content.json');
const PROJECT_FILTERS_FILE = path.join(DATA_DIR, 'project-filters.json');
const PROMOTIONS_FILE = path.join(DATA_DIR, 'promotions.json');
const INVESTORS_CONTENT_FILE = path.join(DATA_DIR, 'investors-content.json');
const ABOUT_CONTENT_FILE = path.join(DATA_DIR, 'about-content.json');
const CONTACTS_CONTENT_FILE = path.join(DATA_DIR, 'contacts-content.json');
const BUY_METHODS_FILE = path.join(DATA_DIR, 'buy-methods.json');
const ADMIN_AUTH_FILE = path.join(DATA_DIR, 'admin-auth.json');
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

// Generic read/write helpers
function readJsonFile(filePath, defaultValue = null) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultValue;
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Site Settings
function readSiteSettings() {
  return readJsonFile(SITE_SETTINGS_FILE, {
    logoUrl: '',
    faviconUrl: '',
    companyName: 'ХОРОШО',
    companySubtitle: 'ГРУППА КОМПАНИЙ',
    phone: '8 800 000-00-00',
    email: 'info@horoshogk.ru',
    address: 'г. Астрахань, ул. Теплая, д. 10, офис 305',
  });
}

// News
function readNews() {
  return readJsonFile(NEWS_FILE, []);
}

// Team
function readTeam() {
  return readJsonFile(TEAM_FILE, []);
}

// Vacancies
function readVacancies() {
  return readJsonFile(VACANCIES_FILE, []);
}

// FAQ
function readFaq() {
  return readJsonFile(FAQ_FILE, []);
}

// Page Settings
function readPageSettings() {
  return readJsonFile(PAGE_SETTINGS_FILE, []);
}

// Home Content
function readHomeContent() {
  return readJsonFile(HOME_CONTENT_FILE, null);
}

// Project Filters
function readProjectFilters() {
  return readJsonFile(PROJECT_FILTERS_FILE, []);
}

// --- Middleware ---

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// --- Image Upload with auto-optimization ---

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB input
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  },
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const ext = path.extname(req.file.originalname).toLowerCase();
    const baseName = Date.now() + '-' + Math.round(Math.random() * 1000);

    // SVG/ICO/GIF — save as-is without processing
    if (ext === '.svg' || ext === '.ico' || ext === '.gif') {
      const filename = baseName + ext;
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), req.file.buffer);
      return res.json({ url: '/uploads/' + filename });
    }

    // All other images — optimize with sharp → WebP
    const filename = baseName + '.webp';
    await sharp(req.file.buffer)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(UPLOADS_DIR, filename));

    res.json({ url: '/uploads/' + filename });
  } catch (err) {
    console.error('Image optimization error:', err);
    // Fallback: save original file
    const ext = path.extname(req.file.originalname).toLowerCase();
    const filename = Date.now() + '-' + Math.round(Math.random() * 1000) + ext;
    fs.writeFileSync(path.join(UPLOADS_DIR, filename), req.file.buffer);
    res.json({ url: '/uploads/' + filename });
  }
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

// --- Site Settings API ---

app.get('/api/site-settings', (req, res) => {
  res.json(readSiteSettings());
});

app.put('/api/site-settings', (req, res) => {
  writeJsonFile(SITE_SETTINGS_FILE, req.body);
  res.json(req.body);
});

// --- News API ---

app.get('/api/news', (req, res) => {
  res.json(readNews());
});

app.put('/api/news', (req, res) => {
  writeJsonFile(NEWS_FILE, req.body);
  res.json(req.body);
});

app.post('/api/news', (req, res) => {
  const news = readNews();
  news.push(req.body);
  writeJsonFile(NEWS_FILE, news);
  res.status(201).json(req.body);
});

app.delete('/api/news/:id', (req, res) => {
  const news = readNews();
  const filtered = news.filter(n => n.id !== req.params.id);
  writeJsonFile(NEWS_FILE, filtered);
  res.json({ success: true });
});

// --- Team API ---

app.get('/api/team', (req, res) => {
  res.json(readTeam());
});

app.put('/api/team', (req, res) => {
  writeJsonFile(TEAM_FILE, req.body);
  res.json(req.body);
});

// --- Vacancies API ---

app.get('/api/vacancies', (req, res) => {
  res.json(readVacancies());
});

app.put('/api/vacancies', (req, res) => {
  writeJsonFile(VACANCIES_FILE, req.body);
  res.json(req.body);
});

// --- FAQ API ---

app.get('/api/faq', (req, res) => {
  res.json(readFaq());
});

app.put('/api/faq', (req, res) => {
  writeJsonFile(FAQ_FILE, req.body);
  res.json(req.body);
});

// --- Page Settings API ---

app.get('/api/page-settings', (req, res) => {
  res.json(readPageSettings());
});

app.put('/api/page-settings', (req, res) => {
  writeJsonFile(PAGE_SETTINGS_FILE, req.body);
  res.json(req.body);
});

// --- Home Content API ---

app.get('/api/home-content', (req, res) => {
  res.json(readHomeContent());
});

app.put('/api/home-content', (req, res) => {
  writeJsonFile(HOME_CONTENT_FILE, req.body);
  res.json(req.body);
});

// --- Project Filters API ---

app.get('/api/project-filters', (req, res) => {
  res.json(readProjectFilters());
});

app.put('/api/project-filters', (req, res) => {
  writeJsonFile(PROJECT_FILTERS_FILE, req.body);
  res.json(req.body);
});

// --- Promotions API ---

app.get('/api/promotions', (req, res) => {
  res.json(readJsonFile(PROMOTIONS_FILE, []));
});

app.put('/api/promotions', (req, res) => {
  writeJsonFile(PROMOTIONS_FILE, req.body);
  res.json(req.body);
});

// --- Investors Content API ---

app.get('/api/investors-content', (req, res) => {
  res.json(readJsonFile(INVESTORS_CONTENT_FILE, {}));
});

app.put('/api/investors-content', (req, res) => {
  writeJsonFile(INVESTORS_CONTENT_FILE, req.body);
  res.json(req.body);
});

// --- About Content API ---

app.get('/api/about-content', (req, res) => {
  res.json(readJsonFile(ABOUT_CONTENT_FILE, {}));
});

app.put('/api/about-content', (req, res) => {
  writeJsonFile(ABOUT_CONTENT_FILE, req.body);
  res.json(req.body);
});

// --- Contacts Content API ---

app.get('/api/contacts-content', (req, res) => {
  res.json(readJsonFile(CONTACTS_CONTENT_FILE, {}));
});

app.put('/api/contacts-content', (req, res) => {
  writeJsonFile(CONTACTS_CONTENT_FILE, req.body);
  res.json(req.body);
});

// --- Buy Methods API ---

app.get('/api/buy-methods', (req, res) => {
  res.json(readJsonFile(BUY_METHODS_FILE, []));
});

app.put('/api/buy-methods', (req, res) => {
  writeJsonFile(BUY_METHODS_FILE, req.body);
  res.json(req.body);
});

// --- Admin Auth API ---

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const auth = readJsonFile(ADMIN_AUTH_FILE, { password: 'admin' });
  if (password === auth.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Wrong password' });
  }
});

app.put('/api/admin/password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const auth = readJsonFile(ADMIN_AUTH_FILE, { password: 'admin' });
  if (currentPassword !== auth.password) {
    return res.status(401).json({ error: 'Current password is wrong' });
  }
  if (!newPassword || newPassword.length < 3) {
    return res.status(400).json({ error: 'Password too short' });
  }
  writeJsonFile(ADMIN_AUTH_FILE, { password: newPassword });
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

// --- Contact / Callback API ---

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, message, context } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const contact = {
      id: Date.now().toString(),
      name,
      phone,
      message: message || '',
      context: context || '',
      date: new Date().toISOString(),
    };

    // Save to bookings file as well (unified storage)
    const bookings = readBookings();
    bookings.push({ ...contact, type: 'contact' });
    writeBookings(bookings);

    // Send email notification
    if (mailTransporter && BOOKING_EMAIL) {
      const contextStr = context || message || 'Обратный звонок';
      const subject = `📞 Заявка с сайта: ${contextStr}`;
      const htmlBody = `
        <h2>Новая заявка с сайта</h2>
        <table style="border-collapse: collapse; font-size: 16px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>ФИО:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Телефон:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td></tr>
          ${message ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Вопрос:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>` : ''}
          ${context ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Раздел:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${context}</td></tr>` : ''}
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Дата:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</td></tr>
        </table>
        <p style="color: #666; margin-top: 20px;">Заявка сохранена в системе. ID: ${contact.id}</p>
      `;

      try {
        await mailTransporter.sendMail({
          from: emailConfig.auth.user,
          to: BOOKING_EMAIL,
          subject,
          html: htmlBody,
        });
        console.log('Contact email sent to', BOOKING_EMAIL);
      } catch (emailErr) {
        console.error('Failed to send contact email:', emailErr.message);
      }
    } else {
      console.log('New contact received (email not configured):', contact);
    }

    res.json({ ok: true, contactId: contact.id });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: err.message });
  }
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

// Start server with EADDRINUSE auto-recovery
const startServer = () => {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/projects`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy. Killing old process and retrying in 2s...`);
      import('child_process').then(({ execSync }) => {
        try {
          execSync(`fuser -k ${PORT}/tcp`, { stdio: 'ignore' });
        } catch (e) { /* ignore */ }
        setTimeout(() => startServer(), 2000);
      });
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('Shutting down gracefully...');
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 3000);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
