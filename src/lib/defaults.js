/**
 * Default values for public-facing site settings.
 * These are used as fallbacks when no settings exist in the database.
 */
export const DEFAULT_SETTINGS = {
  massTimings: {
    weekdayMasses: [
      { label: 'Daily Mass (Mon — Thu, Sat)', time: '6:45', period: 'AM', language: 'Konkani' },
      { label: 'Friday Evening Mass', time: '5:30', period: 'PM', language: 'Konkani' },
      { label: 'Saturday Evening Mass', time: '5:00', period: 'PM', language: 'Konkani' },
    ],
    sundayMasses: [
      { label: 'Morning Mass', time: '7:15', period: 'AM', language: 'Konkani' },
      { label: 'Catechism Classes', time: '8:45', period: 'AM', language: 'Faith Study' },
      { label: "Children's Mass", time: '10:00', period: 'AM', language: 'Konkani' },
    ],
  },
  parishPriest: {
    name: 'Fr. Santhosh Lobo',
    photoUrl: '',
    message: '"Welcome to our parish community. Infant Mary Church stands as a beacon of faith, hope, and togetherness. Let us walk this spiritual journey hand in hand, strengthening our bonds of fellowship and service to one another."',
    title: 'Parish Priest',
    location: 'Infant Mary Church, Katipalla',
  },
  contact: {
    email: 'contact@infantmarychurch.org',
    phone: '+91 824 240XXXX',
    address: 'Katipalla, Mangaluru, Karnataka 575030.',
    officeHours: '9:00 AM — 5:00 PM',
  },
  socialLinks: {
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
}
