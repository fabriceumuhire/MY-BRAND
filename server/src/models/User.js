import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: {
        type: String,
        required: true,
        min: 6
    },
	email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
});

export default mongoose.model("User", userSchema);
