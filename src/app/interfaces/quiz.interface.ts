export interface IQuiz {
    name: string;
    description: string;
    questions: IQuestion[];
    options?: IOptions;
}

export interface IOptions{
    showAnswers: boolean;
    shuffleQuestions: boolean;
}

export interface IQuestion{
    name: string;
    id: string;
    answers: IAnswer[];
}

export interface IAnswer{
    name: string;
    id: string;
    isCorrect: boolean;
}


// Parsed from XML

export interface IQuizParsed{
    quiz: {
        q: IQuestionParsed[]
    }
}

export interface IQuestionParsed{
    qName: {
        _text: string
    };
    ans: IAnswerParsed[];
}

export interface IAnswerParsed{
    _text: string;
    _attributes: {
        isCorrect: string
    }
}