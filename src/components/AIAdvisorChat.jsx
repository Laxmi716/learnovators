import { useState, useRef, useEffect } from 'react';
import { getTopCategory } from '../data/careerPaths';
import { toSoftLabel } from '../data/mindsetQuestions';

export default function AIAdvisorChat({ userDoc }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${userDoc?.name ? userDoc.name.split(' ')[0] : 'there'}! I am your Learnovators AI Career & Mindset Counselor. I have reviewed your academic background in ${userDoc?.academicProfile?.stream || 'your studies'} and your assessment results. What would you like to explore today?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const topInterest = userDoc?.interestScores ? getTopCategory(userDoc.interestScores) : 'technical';
  const stream = userDoc?.academicProfile?.stream || 'General';
  const marks = userDoc?.academicProfile?.marks || '75';
  const resilienceLabel = toSoftLabel(userDoc?.mindsetScores?.resilience ?? 2);
  const focusLabel = toSoftLabel(userDoc?.mindsetScores?.focus ?? 2);

  const promptSuggestions = [
    'What projects should I build for my portfolio?',
    `How do I land an internship in ${stream}?`,
    'How do I balance exams with hands-on skill learning?',
    'What free certifications do you recommend for me?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function generateAdvisorResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('portfolio') || q.includes('build')) {
      if (topInterest === 'technical' || stream === 'Engineering' || stream === 'Science') {
        return `Given your ${topInterest} focus and ${stream} background, recruiters value end-to-end working systems over textbook code. Consider building: 1) A full-stack application addressing a campus or community problem (e.g. peer note exchange or lab equipment booking); 2) An automated data pipeline or API with live documentation on GitHub. With your ${focusLabel.toLowerCase()} focus, setting aside two 90-minute building blocks per week will help you complete a capstone in 6 weeks.`;
      }
      if (topInterest === 'creative' || stream === 'Arts') {
        return `For your creative profile, portfolios should highlight your *thinking process* as much as visual polish. Document 2 in-depth case studies where you show: the original problem, user interviews, rough sketches, failed drafts, and the final solution. This proves your design reasoning to prospective employers.`;
      }
      return `Build projects that demonstrate practical application. With your ${topInterest} orientation, create a comprehensive case study, community initiative, or research presentation with measurable before-and-after impact metrics.`;
    }

    if (q.includes('internship') || q.includes('job') || q.includes('hire')) {
      return `For a student in ${stream} with a ${marks}% academic benchmark, here is the high-yield internship strategy: 1) Don't solely rely on cold applications on mega-portals. Target growing Series A/B startups where founders and engineering/product leads read concise, personalized LinkedIn notes; 2) Include a 2-sentence summary of your ${topInterest} skill strengths and link 1 tangible project; 3) Your mindset check shows ${resilienceLabel.toLowerCase()} resilience — remember that 10 polite rejections are normal before the right offer lands.`;
    }

    if (q.includes('exam') || q.includes('balance') || q.includes('schedule') || q.includes('time')) {
      return `Balancing curricular exams (${stream}) with external career preparation requires cognitive compartmentalization: Use the "80/20 Rule": Dedicate weekdays strictly to your coursework and college assignments so your ${marks}% foundation stays solid. Reserve Saturday mornings (2.5 hours) exclusively for your career roadmap projects or certifications. Your ${focusLabel.toLowerCase()} focus label suggests that time-boxing without notification distractions will yield the highest retention.`;
    }

    if (q.includes('certif') || q.includes('course')) {
      return `Certifications carry the most weight when combined with public proof-of-work. For ${stream} and a ${topInterest} trajectory, prioritize: 1) Google or AWS Foundational/Associate credentials via Coursera financial aid; 2) FreeCodeCamp or Harvard CS50/OpenCourseWare if you want deep conceptual grounding; 3) Always attach a mini GitHub repo or LinkedIn case breakdown for every certificate you earn.`;
    }

    // Default warm advisory response
    return `That's a thoughtful question. Looking at your ${topInterest} orientation, ${stream} background, and ${marks}% score, you have strong raw ingredients. Because your mindset assessment reflects ${resilienceLabel.toLowerCase()} resilience and ${focusLabel.toLowerCase()} focus, your best move is taking consistent micro-actions rather than stressing over a 10-year master plan. Would you like me to suggest specific weekly milestones for this semester?`;
  }

  function handleSend(textToSend) {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAdvisorResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 900);
  }

  return (
    <div className="card flex flex-col h-[520px] p-0 overflow-hidden border-teal-200">
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
              ✨
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-white text-base">Personalized AI Career Advisor</h3>
              <span className="text-[10px] bg-teal-800 text-teal-200 px-2 py-0.5 rounded-full font-sans">
                Tailored to your profile
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Grounded in: {stream} • {marks}% • Top {topInterest} interest
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="flex items-center gap-1.5 text-xs text-teal-700 font-semibold mb-1">
                  <span>Learnovators AI Advisor</span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{m.text}</p>
              <span
                className={`text-[10px] block mt-1.5 text-right ${
                  m.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                }`}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="text-[11px] bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about courses, internships, study habits, or career choices..."
          className="input flex-1 py-2.5 text-xs sm:text-sm"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="btn-primary py-2.5 px-4 text-xs sm:text-sm flex-shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
}
