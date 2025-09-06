const express = require('express');
const cors = require('cors');
require('dotenv').config();
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/resumes', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
