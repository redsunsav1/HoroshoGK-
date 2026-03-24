import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if not exists
function initDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { projects: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read data from file
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { projects: [] };
  }
}

// Write data to file
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes

// Get all projects
app.get('/api/projects', (req, res) => {
  const data = readData();
  res.json(data.projects);
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  const data = readData();
  const project = data.projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Create project
app.post('/api/projects', (req, res) => {
  const data = readData();
  const newProject = req.body;
  data.projects.push(newProject);
  writeData(data);
  res.status(201).json(newProject);
});

// Update project
app.put('/api/projects/:id', (req, res) => {
  const data = readData();
  const index = data.projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    data.projects[index] = req.body;
    writeData(data);
    res.json(req.body);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  const data = readData();
  const index = data.projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    data.projects.splice(index, 1);
    writeData(data);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Reset to initial data
app.post('/api/reset', (req, res) => {
  const initialProjects = req.body.projects || [];
  writeData({ projects: initialProjects });
  res.json({ success: true });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Initialize and start server
initDataFile();
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/projects`);
});
