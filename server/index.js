const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
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

app.post('/api/booking', (req, res) => {
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

    // Send email notification (using sendmail if available)
    const subject = `Новая заявка: ${projectName} - ${rooms}-комн. кв. ${number}`;
    const body = [
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Проект: ${projectName}`,
      `Квартира: ${rooms}-комн., ${area} м², этаж ${floor}, кв. №${number}`,
      `Цена: ${price}`,
      `Дата: ${new Date().toLocaleString('ru-RU')}`,
    ].join('\n');

    // Try to send email via sendmail (non-blocking)
    const { exec } = require('child_process');
    const emailTo = process.env.BOOKING_EMAIL || '';
    if (emailTo) {
      const mailCmd = `echo "${body}" | mail -s "${subject}" ${emailTo}`;
      exec(mailCmd, (err) => {
        if (err) console.log('Email send failed (sendmail not configured):', err.message);
        else console.log('Booking email sent to', emailTo);
      });
    } else {
      console.log('New booking received (no BOOKING_EMAIL set):', booking);
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
