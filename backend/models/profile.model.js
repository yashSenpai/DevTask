import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  startDate: String,
  endDate: String,
  description: String
});

const educationSchema = new mongoose.Schema({
  degree: String,
  school: String,
  year: String
});

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: String,
    company: String,
    location: String,
    summary: String,
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema],
    unlocked: { type: Boolean, default: false },
    unlockedAt: Date,
    unlockedBy: String
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);