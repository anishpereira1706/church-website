import mongoose from 'mongoose'

const MassEntrySchema = new mongoose.Schema({
  label: { type: String, required: true },
  time: { type: String, required: true },
  period: { type: String, required: true },
  language: { type: String, required: true },
}, { _id: false })

const SiteSettingSchema = new mongoose.Schema({
  // Single document singleton — key is always 'main'
  key: { type: String, default: 'main', unique: true },

  massTimings: {
    weekdayMasses: [MassEntrySchema],
    sundayMasses: [MassEntrySchema],
  },

  parishPriest: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    message: { type: String, default: '' },
    title: { type: String, default: '' },
    location: { type: String, default: '' },
  },

  contact: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    officeHours: { type: String, default: '' },
  },

  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
}, { timestamps: true })

export default mongoose.models.SiteSetting || mongoose.model('SiteSetting', SiteSettingSchema)
