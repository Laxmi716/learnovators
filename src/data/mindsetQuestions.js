// 6 gentle behavioural questions mapping to: resilience | confidence | focus
// Language is warm and non-clinical throughout.

export const MINDSET_DIMENSIONS = ['resilience', 'confidence', 'focus'];

export const mindsetQuestions = [
  {
    id: 1,
    question:
      'When something doesn\'t go the way you hoped — an exam result, a project, a plan — what tends to happen next for you?',
    note: 'There\'s no right answer here. Just notice what feels most true.',
    options: [
      { text: 'I take a little time to process it, then look for what I can do differently', category: 'resilience' },
      { text: 'I think about what I\'m good at and remind myself this isn\'t the whole picture', category: 'confidence' },
      { text: 'I make a plan — writing out next steps helps me feel in control', category: 'focus' },
      { text: 'It takes me a while to bounce back, but I usually do', category: 'resilience' },
    ],
  },
  {
    id: 2,
    question:
      'When you\'re working on something important to you, how do you usually manage your time?',
    note: 'Think about a project or study period that mattered to you.',
    options: [
      { text: 'I break it into smaller pieces and work through them steadily', category: 'focus' },
      { text: 'I push through even when it\'s hard — I know it\'ll be worth it', category: 'resilience' },
      { text: 'I trust my instincts about what to prioritise in the moment', category: 'confidence' },
      { text: 'I sometimes struggle to stay on track, but I keep returning to it', category: 'focus' },
    ],
  },
  {
    id: 3,
    question:
      'Someone gives you feedback that you disagree with. How do you handle it?',
    note: 'Think about a time this actually happened.',
    options: [
      { text: 'I listen, take time to reflect, and hold my ground if I still believe I\'m right', category: 'confidence' },
      { text: 'I try to understand their perspective before deciding what to do with it', category: 'resilience' },
      { text: 'I look for the specific part that\'s useful and focus on that', category: 'focus' },
      { text: 'Feedback can sting, but I usually come around to learning from it', category: 'resilience' },
    ],
  },
  {
    id: 4,
    question:
      'How do you feel when you\'re about to try something you\'ve never done before?',
    note: 'There\'s no wrong way to feel — just be honest.',
    options: [
      { text: 'Curious and a bit excited — I like new challenges', category: 'confidence' },
      { text: 'Nervous, but I remind myself I can figure it out as I go', category: 'resilience' },
      { text: 'I like to prepare as much as I can before diving in', category: 'focus' },
      { text: 'Uncertain, but usually I surprise myself once I start', category: 'confidence' },
    ],
  },
  {
    id: 5,
    question:
      'When you have multiple things competing for your attention, what do you tend to do?',
    note: 'Think about your most recent busy week.',
    options: [
      { text: 'I make a list and work through it — crossing things off helps me', category: 'focus' },
      { text: 'I keep going even when things pile up — I don\'t give up easily', category: 'resilience' },
      { text: 'I decide what matters most and let myself let go of the rest', category: 'confidence' },
      { text: 'I get overwhelmed sometimes, but I always find a way to manage', category: 'resilience' },
    ],
  },
  {
    id: 6,
    question:
      'How do you feel about where you\'re heading, right now in your life?',
    note: 'Be as honest as you like — this is just for you.',
    options: [
      { text: 'I have a clear sense of direction and I\'m working toward it', category: 'focus' },
      { text: 'I\'m still figuring it out, but I trust I\'ll get there', category: 'resilience' },
      { text: 'I believe in myself even when the path isn\'t totally clear', category: 'confidence' },
      { text: 'It\'s a bit uncertain right now, but that\'s okay — I\'m open', category: 'resilience' },
    ],
  },
];

// Scoring helper
export function scoreMindset(answers) {
  const scores = { resilience: 0, confidence: 0, focus: 0 };
  answers.forEach((optionIndex, qIndex) => {
    const q = mindsetQuestions[qIndex];
    if (q && q.options[optionIndex]) {
      scores[q.options[optionIndex].category]++;
    }
  });
  return scores;
}

// Convert numeric score to soft label
export function toSoftLabel(score) {
  if (score <= 1) return 'Growing';
  if (score <= 3) return 'Steady';
  return 'Strong';
}
