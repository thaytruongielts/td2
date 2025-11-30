import React from 'react';
import { BookOpen } from 'lucide-react';
import { Section } from '../types';
import QuestionInput from './QuestionInput';

interface SectionCardProps {
  section: Section;
  answers: Record<string, string>;
  onAnswerChange: (id: string, val: string) => void;
  isSubmitted: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  answers,
  onAnswerChange,
  isSubmitted,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
      {/* Header / Dictionary Entry */}
      <div className={`${section.isTopicBased ? 'bg-indigo-50 border-indigo-100' : 'bg-blue-50 border-blue-100'} p-6 border-b`}>
        <div className="flex items-center gap-3 mb-2">
          {!section.isTopicBased && <BookOpen className="w-6 h-6 text-blue-600" />}
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {section.title}
          </h2>
          {section.partOfSpeech && (
            <span className="px-2 py-1 bg-white rounded text-sm font-mono text-gray-600 border border-gray-200">
              {section.partOfSpeech}
            </span>
          )}
          {section.pronunciation && (
            <span className="text-gray-500 font-mono text-sm">
              {section.pronunciation}
            </span>
          )}
        </div>

        {/* Definitions */}
        {section.definition.length > 0 && (
          <div className="mb-4">
            {section.definition.map((def, idx) => (
              <p key={idx} className="text-gray-700 italic border-l-4 border-blue-300 pl-3 py-1 my-1">
                {def}
              </p>
            ))}
          </div>
        )}

        {/* Examples */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Examples & Collocations</h3>
          <ul className="space-y-1">
            {section.examples.map((ex, idx) => (
              <li key={idx} className="text-gray-800 text-md pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400">
                {ex}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Questions */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-orange-400 rounded-full"></span>
          Practice Exercises
        </h3>
        <div className="space-y-2">
          {section.questions.map((q) => (
            <QuestionInput
              key={q.id}
              question={q}
              value={answers[q.id] || ''}
              onChange={(val) => onAnswerChange(q.id, val)}
              isSubmitted={isSubmitted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionCard;