import { Router } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@gmail.com', status: 'pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'approved' },
  { id: 3, name: 'Liza Doe', email: 'liza@gmail.com', status: 'pending' },
  { id: 4, name: 'Anaa smith' , email: 'anaa@gmail.com', status: 'approved' }
];

const router = Router();

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Approve user
router.put('/:id/approve', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.status = 'approved';
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Reject user
router.put('/:id/reject', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.status = 'rejected';
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.status(200).json({ message: 'User deleted successfully' });
});

// Add new user
router.post('/', (req, res) => {
  const { name, email, status } = req.body;
  const newUser = { id: users.length + 1, name, email, status };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
