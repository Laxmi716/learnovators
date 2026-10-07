// Weekly quiz — 3 questions, worth +10 coins on completion
export const weeklyQuiz = {
  title: "This week's focus quiz",
  subtitle: 'Three quick questions. Complete to earn +10 coins.',
  questions: [
    {
      id: 1,
      question: 'Which of the following is a transferable skill valued across almost every career?',
      options: [
        'Knowing a specific programming language',
        'Clear written and verbal communication',
        'Having a postgraduate degree',
        'Experience in a single industry',
      ],
      answer: 1,
    },
    {
      id: 2,
      question: 'When building a career plan, the most important starting point is usually:',
      options: [
        'Choosing the highest-paying field',
        'Following what your friends are doing',
        'Understanding your own strengths, interests, and values',
        'Picking the most prestigious college available',
      ],
      answer: 2,
    },
    {
      id: 3,
      question: 'Which habit is most associated with long-term learning and career growth?',
      options: [
        'Memorising information before exams',
        'Avoiding feedback to protect your confidence',
        'Reflecting on what you\'ve learned and how to apply it',
        'Waiting for opportunities to come to you',
      ],
      answer: 2,
    },
  ],
  coinReward: 10,
};

// Wellbeing tasks — 3 tasks, each worth +5 coins
export const wellbeingTasks = [
  {
    id: 'task1',
    title: 'Take a breathing break',
    description:
      'Close your eyes and take 5 slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4. That\'s it.',
    icon: '🌬️',
    coinReward: 5,
  },
  {
    id: 'task2',
    title: 'Write one sentence in a journal',
    description:
      'Open a notebook or a notes app. Write one sentence about something that went well today, no matter how small.',
    icon: '📓',
    coinReward: 5,
  },
  {
    id: 'task3',
    title: 'Step away from your screen for 10 minutes',
    description:
      'Go for a short walk, stretch, look out a window, or make a cup of tea. Return when you\'re ready.',
    icon: '☀️',
    coinReward: 5,
  },
];

// Coin store — redeemable items
export const storeItems = [
  {
    id: 'library',
    title: 'Library Book Date Extension',
    description:
      'Extend your library borrowing period by 14 days — no late fees, no hassle.',
    icon: '📚',
    cost: 20,
    redemptionKey: 'library',
    ctaLabel: 'Redeem Extension',
  },
  {
    id: 'ebook',
    title: 'eBook Discount Voucher',
    description:
      'Get a 30% discount voucher for any eBook from our partner library catalogue.',
    icon: '💡',
    cost: 15,
    redemptionKey: 'ebook',
    ctaLabel: 'Get Voucher',
  },
  {
    id: 'mentorship',
    title: 'Alumni Mentorship Session',
    description:
      'Book a 45-minute 1-on-1 session with an alumni mentor in your field of interest.',
    icon: '🎓',
    cost: 50,
    redemptionKey: 'mentorship',
    ctaLabel: 'Book Session',
  },
];
