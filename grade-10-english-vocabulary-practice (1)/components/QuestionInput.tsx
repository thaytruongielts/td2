import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Question } from '../types';

interface QuestionInputProps {
  question: Question;
  value: string;
  onChange: (val: string) => void;
  isSubmitted: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  value,
  onChange,
  isSubmitted,
}) => {
  // Normalize checking
  const checkAnswer = () => {
    const normalizedInput = value.trim().toLowerCase().replace(/\s+/g, ' ');
    return question.validAnswers.some(
      (ans) => ans.toLowerCase() === normalizedInput
    );
  };

  const isCorrect = isSubmitted ? checkAnswer() : false;
  const isWrong = isSubmitted && !isCorrect;

  return (
    <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 text-gray-800 leading-relaxed text-lg">
        {question.originalNumber && (
          <span className="font-bold text-blue-600 mr-1 select-none">
            {question.originalNumber}.
          </span>
        )}
        <div className="flex-1 flex flex-wrap gap-2 items-baseline">
          <span>{question.prefix}</span>
          <div className="relative inline-block min-w-[200px] flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={isSubmitted}
              placeholder="type here..."
              className={`w-full px-3 py-1 border-b-2 bg-white focus:outline-none transition-colors font-medium
                ${
                  !isSubmitted
                    ? 'border-gray-300 focus:border-blue-500'
                    : isCorrect
                    ? 'border-green-500 text-green-700 bg-green-50'
                    : 'border-red-500 text-red-700 bg-red-50'
                }
              `}
            />
            {isSubmitted && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          <span>{question.suffix}</span>
        </div>
      </div>
      {isWrong && (
        <p className="text-red-500 text-sm mt-2 ml-8 font-medium">
          Incorrect. Try again next time!
        </p>
      )}
    </div>
  );
};

export default QuestionInput;