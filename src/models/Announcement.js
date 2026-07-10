import mongoose from 'mongoose'

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  category: {
    type: String,
    enum: ['News', 'Announcements', 'Blog'],
    default: 'News',
  },
  date: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Please upload a poster image'],
  },
}, {
  timestamps: true,
})

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema)
