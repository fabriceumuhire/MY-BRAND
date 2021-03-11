import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Blog', blogSchema);
