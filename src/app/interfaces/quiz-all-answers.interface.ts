
export interface IQuizAllAnswers {
    questions: IQuestionAllAnswers[];
}

export interface IQuestionAllAnswers {
    name: string;
    answers: IAllAnswers[];
}

export interface IAllAnswers {
    name: string;
    isCorrect: boolean;
    isUserAnswer: boolean;
}