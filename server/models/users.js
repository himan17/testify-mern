const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema and model for users
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    likedQuizzes: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    avatar: {
        type: Object,
        required: false,
        contains: {
            url: {
                type: String
            },
            publicId: {
                type: String
            }
        }
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('Users', userSchema);
