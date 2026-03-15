// =====================================================
// TOYS FOR TALKING — Camp & App Data
// Update this file with real camp details
// =====================================================

const CAMPS = [
  {
    id: 'summer-speech-explorer',
    name: 'Speech Explorer Camp',
    subtitle: 'Ages 3–6 · Beginner',
    description: 'A playful, low-pressure introduction to speech and language through songs, stories, and interactive games. Perfect for young children just beginning their speech journey.',
    dates: 'June 9 – June 20, 2026',
    startDate: '2026-06-09',
    endDate: '2026-06-20',
    time: 'Mon – Fri · 9:00 AM – 12:00 PM',
    location: 'Toys for Talking Center',
    price: 450,
    spots: 8,
    spotsLeft: 3,
    icon: 'bi-stars',
    tags: ['Ages 3–6', 'Beginner', 'Play-Based'],
    highlights: [
      'Small group sessions (max 8 kids)',
      'Daily thematic play activities',
      'Parent progress update each Friday',
      'Take-home activity packet'
    ]
  },
  {
    id: 'language-builders',
    name: 'Language Builders Camp',
    subtitle: 'Ages 5–9 · Intermediate',
    description: 'Designed for children working on vocabulary, sentence structure, and conversational skills. Uses storytelling, puppets, and group activities to build confidence and communication.',
    dates: 'June 23 – July 11, 2026',
    startDate: '2026-06-23',
    endDate: '2026-07-11',
    time: 'Mon – Fri · 9:00 AM – 1:00 PM',
    location: 'Toys for Talking Center',
    price: 650,
    spots: 10,
    spotsLeft: 5,
    icon: 'bi-book',
    tags: ['Ages 5–9', 'Intermediate', 'Conversational'],
    highlights: [
      'Evidence-based language strategies',
      'Peer interaction & social skills',
      'Weekly parent workshop (Fridays)',
      'Digital portfolio of progress'
    ]
  },
  {
    id: 'articulation-all-stars',
    name: 'Articulation All-Stars Camp',
    subtitle: 'Ages 6–12 · All Levels',
    description: 'Focused on speech sound development and clarity. Children practice target sounds through games, music, drama, and real-world conversation activities.',
    dates: 'July 14 – August 1, 2026',
    startDate: '2026-07-14',
    endDate: '2026-08-01',
    time: 'Mon – Fri · 10:00 AM – 2:00 PM',
    location: 'Toys for Talking Center',
    price: 595,
    spots: 12,
    spotsLeft: 7,
    icon: 'bi-bullseye',
    tags: ['Ages 6–12', 'Articulation', 'All Levels'],
    highlights: [
      'Individualized target sounds plan',
      'Drama & performance activities',
      'Biweekly family coaching calls',
      'End-of-camp celebration showcase'
    ]
  }
];

const EVALUATION_SLOTS = generateSlots();

function generateSlots() {
  const slots = {};
  const today = new Date();
  let count = 0;
  let d = new Date(today);
  d.setDate(d.getDate() + 1);
  while (count < 20) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      const key = d.toISOString().split('T')[0];
      const times = ['9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM', '1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM'];
      slots[key] = times.map(t => ({
        time: t,
        available: Math.random() > 0.3
      }));
      count++;
    }
    d.setDate(d.getDate() + 1);
  }
  return slots;
}

window.AppState = {
  bookingType: null,
  guardian: {},
  children: [],
  selectedCamp: null,
  selectedDate: null,
  selectedTime: null,
  evalReason: '',
  paymentConfirmed: false,
  confirmationId: null
};

window.CAMPS = CAMPS;
window.EVALUATION_SLOTS = EVALUATION_SLOTS;
