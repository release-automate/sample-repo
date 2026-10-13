import express from 'express';

const app  = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
// ── In-memory user store (POC only) ───────────────────────────
interface User {
  id:        number;
  name:      string;
  email:     string;
  createdAt: string;
}

const users: User[] = [
  { id: 1, name: 'Alice',   email: 'alice@example.com',   createdAt: '2024-01-01' },
  { id: 2, name: 'Bob',     email: 'bob@example.com',     createdAt: '2024-02-15' },
];

// ── Routes ─────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: process.env.npm_package_version });
});

app.get('/users', (_req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body as { name: string; email: string };
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const user: User = {
    id:        users.length + 1,
    name,
    email,
    createdAt: new Date().toISOString().split('T')[0]!,
  };
  users.push(user);
  res.status(201).json(user);
});

app.listen(PORT, () => {
  console.log(`user-service running on :${PORT}`);
});
