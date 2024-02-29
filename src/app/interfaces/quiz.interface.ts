export interface IQuiz {
    name: string;
    description: string;
    questions: IQuestion[];   
}

export interface IQuestion{
    name: string;
    id: number;
    answers: IAnswer[];
    link: string;
}

export interface IAnswer{
    name: string;
    id: number;
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
    link: {
        _text: string
    }
}

export interface IAnswerParsed{
    _text: string;
    _attributes: {
        isCorrect: boolean
    }
}