import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
	title: {
        type: String,
        required: true
    },
	content: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
});

export default mongoose.model("Blog", imageSchema);