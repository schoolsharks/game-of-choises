import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    quesId: {
        type: Number,
        required: true,
        unique: true
    },
    correctOption: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export const Offer = mongoose.model('Offer', offerSchema); 