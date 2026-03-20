// =====================================================
// TOYS FOR TALKING — Camp & App Data
// =====================================================

const CAMPS = [
  {
    id: 'llsc-june-inperson',
    stripeLink: 'https://buy.stripe.com/test_6oU9AU0Hm3Qa8g630GgA806',
    name: 'Little Lamps Speech Camp',
    subtitle: 'June Cohort · In-Person · Ages 0–4',
    description: 'A 4-week play-based early communication enrichment program where caregivers learn and practice evidence-informed strategies alongside their toddler in a guided, interactive setting. Each session is 35 minutes.',
    dates: 'June 7 – June 28, 2026',
    startDate: '2026-06-07',
    endDate: '2026-06-28',
    time: 'Sundays · 4:00 PM or 4:45 PM',
    location: 'The Little Gym · 820 S MacArthur Blvd #100, Coppell, TX 75019',
    price: 199,
    spots: 12,
    spotsLeft: 8,
    icon: 'bi-sun',
    tags: ['Ages 0–4', 'In-Person'],
    highlights: [
      '4 in-person 35-minute small group sessions',
      'Guided play with real-time parent coaching',
      'Weekly instructional video access',
      '4 live group Q&A sessions with a licensed SLP',
      'Structured, supportive group environment',
      'Small group size — limited to 8 families per session'
    ],
    notIncluded: [
      'Individualized speech therapy',
      'Written treatment plans or progress reports',
      'One-on-one clinical services',
      'Make-up sessions for missed classes',
      'Child drop-off participation'
    ]
  },
  {
    id: 'llsc-july-inperson',
    stripeLink: 'https://buy.stripe.com/test_eVq9AUgGkeuO8g69p4gA805',
    name: 'Little Lamps Speech Camp',
    subtitle: 'July Cohort · In-Person · Ages 0–4',
    description: 'A 4-week play-based early communication enrichment program where caregivers learn and practice evidence-informed strategies alongside their toddler in a guided, interactive setting. Each session is 35 minutes.',
    dates: 'July 12 – August 2, 2026',
    startDate: '2026-07-12',
    endDate: '2026-08-02',
    time: 'Sundays · 4:00 PM or 4:45 PM',
    location: 'The Little Gym · 820 S MacArthur Blvd #100, Coppell, TX 75019',
    price: 199,
    spots: 12,
    spotsLeft: 10,
    icon: 'bi-sun',
    tags: ['Ages 0–4', 'In-Person'],
    highlights: [
      '4 in-person 35-minute small group sessions',
      'Guided play with real-time parent coaching',
      'Weekly instructional video access',
      '4 live group Q&A sessions with a licensed SLP',
      'Structured, supportive group environment',
      'Small group size — limited to 8 families per session'
    ],
    notIncluded: [
      'Individualized speech therapy',
      'Written treatment plans or progress reports',
      'One-on-one clinical services',
      'Make-up sessions for missed classes',
      'Child drop-off participation'
    ]
  },
  {
    id: 'llsc-june-virtual',
    stripeLink: 'https://buy.stripe.com/test_8x29AUeycbiC0NE44KgA804',
    name: 'Virtual Parent Coaching',
    subtitle: 'June Cohort · Virtual · Ages 0–4',
    description: 'A structured 4-week parent education experience designed to help caregivers confidently support early communication at home.',
    dates: 'June 7 – June 28, 2026',
    startDate: '2026-06-07',
    endDate: '2026-06-28',
    time: 'Sundays · Time TBD (scheduled with group)',
    location: 'Virtual · Link sent after registration',
    price: 99,
    spots: 12,
    spotsLeft: 10,
    icon: 'bi-laptop',
    tags: ['Ages 0–4', 'Virtual'],
    highlights: [
      '4 weekly instructional videos',
      '4 live group Q&A sessions with a licensed SLP',
      'Downloadable weekly strategy guides',
      '1 year access to recordings'
    ],
    notIncluded: [
      'Individualized feedback',
      'Direct therapy',
      'One-on-one sessions'
    ]
  },
  {
    id: 'llsc-july-virtual',
    stripeLink: 'https://buy.stripe.com/test_4gMaEYeyc5Yi67YeJogA803',
    name: 'Virtual Parent Coaching',
    subtitle: 'July Cohort · Virtual · Ages 0–4',
    description: 'A structured 4-week parent education experience designed to help caregivers confidently support early communication at home.',
    dates: 'July 12 – August 2, 2026',
    startDate: '2026-07-12',
    endDate: '2026-08-02',
    time: 'Sundays · Time TBD (scheduled with group)',
    location: 'Virtual · Link sent after registration',
    price: 99,
    spots: 12,
    spotsLeft: 12,
    icon: 'bi-laptop',
    tags: ['Ages 0–4', 'Virtual'],
    highlights: [
      '4 weekly instructional videos',
      '4 live group Q&A sessions with a licensed SLP',
      'Downloadable weekly strategy guides',
      '1 year access to recordings'
    ],
    notIncluded: [
      'Individualized feedback',
      'Direct therapy',
      'One-on-one sessions'
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
window.EVAL_STRIPE_LINK = 'https://buy.stripe.com/test_4gM00kcq44Ueaoe30GgA801';
