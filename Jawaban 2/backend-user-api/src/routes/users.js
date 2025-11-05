import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Semua field wajib diisi' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email sudah terdaftar' });
        }

        const user = await User.create({ name, email, password });
        return res.status(201).json({
            message: 'Pengguna berhasil ditambahkan',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (_, res) => {
    try {
        const users = await User.find().select('-password');
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'ID tidak valid' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }
        return res.json({ message: 'Pengguna berhasil dihapus' });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'ID tidak valid' });
    }
});

export default router;