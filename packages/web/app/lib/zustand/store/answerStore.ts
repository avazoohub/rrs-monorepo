import { create } from "zustand";

type Answer = {
  round?: number | undefined | null;
  pick?: number | undefined | null;
  questionNumber?: number | undefined | null;
  teamId?: string | number | undefined | null;
  answer?: string | number | undefined | null;
};

type AnswerStore = {
  answer: Answer | null | undefined;
  setAnswer: (answerUpdate: Partial<Answer>) => void;
  clearAnswer: () => void;
};

export const answerStore = create<AnswerStore>((set) => ({
  answer: null,
  setAnswer: (answerUpdate: Partial<Answer>) =>
    set((state) => ({
      answer: {
        ...state.answer,
        ...answerUpdate,
      },
    })),
  clearAnswer: () =>
    set(() => ({
      answer: null,
    })),
}));
