export interface Question {
  id: string;
  originalNumber?: string; // To keep reference to the user's input numbers like "51", "43"
  prefix: string;
  suffix: string;
  validAnswers: string[];
}

export interface Section {
  id: string;
  title: string;
  partOfSpeech?: string;
  pronunciation?: string;
  definition: string[];
  examples: string[];
  questions: Question[];
  isTopicBased?: boolean; // To distinguish between the dictionary style and the topic style at the end
}

export interface QuizState {
  answers: Record<string, string>;
  isSubmitted: boolean;
}