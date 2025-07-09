// Simple Messages Server - Deploy this on any free hosting service
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// File to store messages
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Initialize messages file if it doesn't exist
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify({ messages: [] }));
}

app.get('/', (req, res) => {
  res.send('Welcome to the Simple Messages Server! Use /api/messages to interact with messages.');
});

// Get all messages
app.get('/api/messages', (req, res) => {
  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
    res.json(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

// Add a new message
app.post('/api/messages', (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    // Read current messages
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messagesData = JSON.parse(data);
    
    // Create new message
    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now()
    };
    
    // Add to beginning of array
    messagesData.messages.unshift(newMessage);
    
    // Keep only last 100 messages to save space
    if (messagesData.messages.length > 100) {
      messagesData.messages = messagesData.messages.slice(0, 100);
    }
    
    // Save back to file
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messagesData, null, 2));
    
    res.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Messages server running on port ${PORT}`);
});

module.exports = app;
