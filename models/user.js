import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please provide a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        maxLength: 32,
    }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model('User', userSchema);