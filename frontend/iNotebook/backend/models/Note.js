import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Using user model id as foreign key for notes model
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General",
        set: function (value) {
            return value && value.trim() !== "" ? value : "General"; // Replace empty string with "General"
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.model('Note', NoteSchema);