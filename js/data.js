// =====================================================
// TOYS FOR TALKING — Camp & App Data
// =====================================================

const CAMPS = [
  {
    id: 'llsc-june-inperson',
    name: 'Little Lamps Speech Camp',
    subtitle: 'June Cohort · In-Person · Ages 0–4',
    description: 'A small-group, play-based speech camp held in-person in the Dallas area. Children ages 0–4 build communication skills through guided play each Sunday. Sessions are split into two intimate 35-minute groups.',
    dates: 'June 7 – June 28, 2026',
    startDate: '2026-06-07',
    endDate: '2026-06-28',
    time: 'Sundays · 4:00 – 5:30 PM (two 35-min groups)',
    location: 'Dallas, TX · Location confirmed after registration',
    price: 199,
    spots: 12,
    spotsLeft: 8,
    icon: 'bi-sun',
    tags: ['Ages 0–4', 'In-Person', 'June Cohort'],
    highlights: [
      'Sundays, June 7 – June 28',
      'Two 35-minute small-group sessions per meeting',
      'Play-based strategies you can use at home',
      'Meet-up location confirmed post-registration'
    ]
  },
  {
    id: 'llsc-july-inperson',
    name: 'Little Lamps Speech Camp',
    subtitle: 'July Cohort · In-Person · Ages 0–4',
    description: 'A small-group, play-based speech camp held in-person in the Dallas area. Children ages 0–4 build communication skills through guided play each Sunday. Sessions are split into two intimate 35-minute groups.',
    dates: 'July 12 – August 2, 2026',
    startDate: '2026-07-12',
    endDate: '2026-08-02',
    time: 'Sundays · 4:00 – 5:30 PM (two 35-min groups)',
    location: 'Dallas, TX · Location confirmed after registration',
    price: 199,
    spots: 12,
    spotsLeft: 10,
    icon: 'bi-sun',
    tags: ['Ages 0–4', 'In-Person', 'July Cohort'],
    highlights: [
      'Sundays, July 12 – August 2',
      'Two 35-minute small-group sessions per meeting',
      'Play-based strategies you can use at home',
      'Meet-up location confirmed post-registration'
    ]
  },
  {
    id: 'llsc-june-virtual',
    name: 'Virtual Little Lamps Speech Camp',
    subtitle: 'June Cohort · Virtual · Ages 0–4',
    description: 'The same guided, play-based Little Lamps experience — available to families anywhere. Session time will be determined based on what works best for all virtual attendees.',
    dates: 'June 7 – June 28, 2026',
    startDate: '2026-06-07',
    endDate: '2026-06-28',
    time: 'Sundays · Time TBD (scheduled with group)',
    location: 'Virtual · Link sent after registration',
    price: 99,
    spots: 12,
    spotsLeft: 10,
    icon: 'bi-laptop',
    tags: ['Ages 0–4', 'Virtual', 'June Cohort'],
    highlights: [
      'Sundays, June 7 – June 28',
      'Time coordinated with all virtual attendees',
      'Join from anywhere — no travel required',
      'Zoom link sent after registration'
    ]
  },
  {
    id: 'llsc-july-virtual',
    name: 'Virtual Little Lamps Speech Camp',
    subtitle: 'July Cohort · Virtual · Ages 0–4',
    description: 'The same guided, play-based Little Lamps experience — available to families anywhere. Session time will be determined based on what works best for all virtual attendees.',
    dates: 'July 12 – August 2, 2026',
    startDate: '2026-07-12',
    endDate: '2026-08-02',
    time: 'Sundays · Time TBD (scheduled with group)',
    location: 'Virtual · Link sent after registration',
    price: 99,
    spots: 12,
    spotsLeft: 12,
    icon: 'bi-laptop',
    tags: ['Ages 0–4', 'Virtual', 'July Cohort'],
    highlights: [
      'Sundays, July 12 – August 2',
      'Time coordinated with all virtual attendees',
      'Join from anywhere — no travel required',
      'Zoom link sent after registration'
    ]
  }
];

window.AppState = {
  bookingType: null,
  guardian: {},
  children: [],
  selectedCamp: null,
  evalReason: '',
  paymentConfirmed: false,
  confirmationId: null
};

window.CAMPS = CAMPS;
