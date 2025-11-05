import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama lengkap diperlukan'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email diperlukan'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Format email tidak valid',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password diperlukan'],
            minlength: [8, 'Password minimal 8 karakter'],
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);