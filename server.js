import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Queue Management State (In-memory for now)
  let tickets = [
    { id: '1', number: 'REG-001', studentName: 'Ana Cruz', studentId: '2021-001', deptCode: 'REG', status: 'done', timestamp: Date.now() - 3600000 },
    { id: '2', number: 'REG-002', studentName: 'Carlo Dela Rosa', studentId: '2021-002', deptCode: 'REG', status: 'serving', timestamp: Date.now() - 1800000 },
    { id: '3', number: 'REG-003', studentName: 'Bianca Villanueva', studentId: '2021-003', deptCode: 'REG', status: 'waiting', timestamp: Date.now() - 900000 },
    { id: '4', number: 'ACC-001', studentName: 'Jose Reyes', studentId: 'STAFF-001', deptCode: 'ACC', status: 'serving', timestamp: Date.now() - 1200000 },
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "QR-Sync Backend is running" });
  });

  // Queue API
  app.get("/api/queue", (req, res) => {
    res.json(tickets);
  });

  app.post("/api/queue/join", (req, res) => {
    const { deptCode, studentName, studentId } = req.body;
    const deptTickets = tickets.filter(t => t.deptCode === deptCode);
    const nextNumber = deptTickets.length + 1;
    const paddedNumber = nextNumber.toString().padStart(3, '0');
    
    const newTicket = {
      id: Math.random().toString(36).substr(2, 9),
      number: `${deptCode}-${paddedNumber}`,
      studentName,
      studentId,
      deptCode,
      status: 'waiting',
      timestamp: Date.now(),
    };

    tickets.push(newTicket);
    res.json(newTicket);
  });

  app.post("/api/queue/done", (req, res) => {
    const { ticketId } = req.body;
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.status = 'done';

    // Automatically serve next in same dept
    const nextTicket = tickets
      .filter(t => t.deptCode === ticket.deptCode && t.status === 'waiting')
      .sort((a, b) => a.timestamp - b.timestamp)[0];

    if (nextTicket) {
      nextTicket.status = 'serving';
    }

    res.json({ success: true, tickets });
  });

  app.post("/api/queue/serve-next", (req, res) => {
    const { deptCode } = req.body;
    
    // Mark current serving as done
    tickets.forEach(t => {
      if (t.deptCode === deptCode && t.status === 'serving') {
        t.status = 'done';
      }
    });

    const nextTicket = tickets
      .filter(t => t.deptCode === deptCode && t.status === 'waiting')
      .sort((a, b) => a.timestamp - b.timestamp)[0];

    if (nextTicket) {
      nextTicket.status = 'serving';
    }

    res.json({ success: true, tickets });
  });

  // Mock Auth API
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // In a real app, verify against DB
    res.json({ success: true, token: "mock-jwt-token", user: { email } });
  });

  // QR Code Storage API
  app.post("/api/qrcodes", (req, res) => {
    const { data, label, category } = req.body;
    // In a real app, save to SQL or NoSQL DB
    res.json({ success: true, qrId: Math.random().toString(36).substr(2, 9) });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
