// Each question has 4 options, each mapped to a category:
// analytical | creative | social | technical
// The index of the chosen option directly maps to the category at that index.

export const CATEGORIES = ['analytical', 'creative', 'social', 'technical'];

export const interestQuestions = [
  {
    id: 1,
    scenario:
      'Your school is organising a tech fair. You are asked to pick a role. Which one appeals to you most?',
    options: [
      { text: 'Analysing data from surveys and presenting findings with charts', category: 'analytical' },
      { text: 'Designing the visual theme, posters, and interactive displays', category: 'creative' },
      { text: 'Coordinating with participants and managing the schedule', category: 'social' },
      { text: 'Building the website or the demo app for the event', category: 'technical' },
    ],
  },
  {
    id: 2,
    scenario:
      'You have a free afternoon and an internet connection. What are you most likely to end up doing?',
    options: [
      { text: 'Watching explainer videos on economics, science, or logic puzzles', category: 'analytical' },
      { text: 'Making something — sketching, editing a video, or writing a story', category: 'creative' },
      { text: 'Catching up with friends, planning something social, or volunteering online', category: 'social' },
      { text: 'Tinkering with a gadget, coding a small project, or fixing something', category: 'technical' },
    ],
  },
  {
    id: 3,
    scenario:
      'A new student in class doesn\'t understand the assignment. What do you naturally do?',
    options: [
      { text: 'Break it down logically, step by step, until it makes sense to them', category: 'analytical' },
      { text: 'Think of a creative analogy or draw a quick diagram to explain', category: 'creative' },
      { text: 'Sit with them, patiently guide them, and check in later', category: 'social' },
      { text: 'Look up a tutorial or tool that can help them understand faster', category: 'technical' },
    ],
  },
  {
    id: 4,
    scenario:
      'If you could spend a year working on one thing, what would it be?',
    options: [
      { text: 'Researching a question nobody has fully answered yet', category: 'analytical' },
      { text: 'Creating a film, a book, or an art project that means something to me', category: 'creative' },
      { text: 'Building a community programme or mentoring younger students', category: 'social' },
      { text: 'Building a product or piece of software that solves a real problem', category: 'technical' },
    ],
  },
  {
    id: 5,
    scenario:
      'Your team needs to solve a problem quickly. Which role do you gravitate toward?',
    options: [
      { text: 'The one who researches options and evaluates pros and cons', category: 'analytical' },
      { text: 'The one who comes up with out-of-the-box ideas and reframes the problem', category: 'creative' },
      { text: 'The one who keeps the team motivated and resolves disagreements', category: 'social' },
      { text: 'The one who implements the solution once a direction is decided', category: 'technical' },
    ],
  },
  {
    id: 6,
    scenario:
      'Which of these subjects or activities has ever made you lose track of time?',
    options: [
      { text: 'Mathematics, statistics, logic, or a really good puzzle', category: 'analytical' },
      { text: 'Writing, drawing, music, or any kind of creative work', category: 'creative' },
      { text: 'Debating, organising events, or talking through ideas with people', category: 'social' },
      { text: 'Programming, electronics, robotics, or figuring out how things work', category: 'technical' },
    ],
  },
];
