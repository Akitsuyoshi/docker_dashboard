import mongoose from 'mongoose';

const { Schema } = mongoose;
const MODEL_NAME = 'User';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  age: Number,
});

export default mongoose.model(MODEL_NAME, userSchema);
