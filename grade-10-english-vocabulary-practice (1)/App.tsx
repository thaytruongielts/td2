import React, { useState, useMemo } from 'react';
import { GraduationCap, RotateCcw, Send, Calculator } from 'lucide-react';
import { quizData } from './data';
import SectionCard from './components/SectionCard';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate total number of questions
  const totalQuestions = useMemo(() => {
    return quizData.reduce((sum, section) => sum + section.questions.length, 0);
  }, []);

  const handleAnswerChange = (id: string, val: string) => {
    if (isSubmitted) return; // Prevent editing after submission
    setAnswers((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizData.forEach((section) => {
      section.questions.forEach((q) => {
        const userAnswer = (answers[q.id] || '').trim().toLowerCase().replace(/\s+/g, ' ');
        // Check against all valid variations
        const isCorrect = q.validAnswers.some(ans => ans.toLowerCase() === userAnswer);
        if (isCorrect) correctCount++;
      });
    });
    // Formula: 10 * (correct / total)
    const rawScore = (10 * correctCount) / totalQuestions;
    return {
      score: rawScore.toFixed(2), // Keep 2 decimal places
      correctCount,
    };
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) {
      if (!confirm("You haven't answered any questions yet. Are you sure you want to submit?")) {
        return;
      }
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all answers?")) {
      setAnswers({});
      setIsSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const result = isSubmitted ? calculateScore() : null;

  return (
    <div className="min-h-screen pb-20">
      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Grade 10 Prep</h1>
              <p className="text-xs text-gray-500 mt-1">Vocabulary & Word Formation</p>
            </div>
          </div>

          {/* Score Display (Visible only after submit) */}
          {isSubmitted && result && (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 font-semibold uppercase">Your Score</p>
                <p className="text-sm font-medium text-gray-700">
                  {result.correctCount} / {totalQuestions} Correct
                </p>
              </div>
              <div className="flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg border-2 border-blue-500">
                <Calculator className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{result.score}</span>
                <span className="text-sm text-gray-400 ml-1">/10</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded-r-lg">
          <p className="text-blue-900">
            <strong>Instructions:</strong> Read the dictionary entries and examples carefully. Fill in the blanks with the correct words or phrases based on the context. Click <em>Submit</em> to see your score.
          </p>
        </div>

        {quizData.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            isSubmitted={isSubmitted}
          />
        ))}

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
           <div className="max-w-4xl mx-auto flex gap-4">
             {!isSubmitted ? (
               <button
                 onClick={handleSubmit}
                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
               >
                 <Send className="w-5 h-5" />
                 Submit Answers
               </button>
             ) : (
               <button
                 onClick={handleReset}
                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl border border-gray-300 transition-all active:scale-95 flex items-center justify-center gap-2"
               >
                 <RotateCcw className="w-5 h-5" />
                 Reset & Try Again
               </button>
             )}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;