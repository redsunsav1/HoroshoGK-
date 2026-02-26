const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

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
const PORT = 3001;

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'site-data.json');
const UPLOADS_DIR = '/var/www/horoshogk/uploads';

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- Data API ---

function readData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  return null;
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Get all data
app.get('/api/data', (req, res) => {
  const data = readData();
  if (data) {
    res.json(data);
  } else {
    res.json(null);
  }
});

// Save all data
app.post('/api/data', (req, res) => {
  try {
    writeData(req.body);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// --- Booking API ---

const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

function readBookings() {
  if (fs.existsSync(BOOKINGS_FILE)) {
    return JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf-8'));
  }
  return [];
}

function writeBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
}

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

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server running on http://127.0.0.1:${PORT}`);
});
