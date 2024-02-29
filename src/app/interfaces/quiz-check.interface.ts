import { IAnswer } from "./quiz.interface";

export interface IQuizCheck{
    questionId: string;
    answers: IAnswer[];
}