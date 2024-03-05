import hashIt from "hash-it";
import { IQuiz } from "../interfaces/quiz.interface";
import { IQuizVerify } from "../interfaces/quiz-verify.interface";

const pepper = "ohI7qjwMQF";

export function generateSignatureForQuiz(quiz: IQuiz): number {
    return generateSignature(JSON.stringify(quiz));
}

export function generateSignatureForQuizAndScore(quiz: IQuiz, score: number, id: number): {quizSignature: number, scoreSignature: number} {
    const quizSig = generateSignature(JSON.stringify(quiz));
    const scoreSig = quizSig + generateSignature((score+id).toString());
    return {quizSignature: quizSig, scoreSignature: scoreSig};
}

export function verifySignatures(data: IQuizVerify): boolean {
    const onlyScoreSig = generateSignature((data.score + data.id).toString());
    const scoreSig = onlyScoreSig + data.quizSignature;
    return scoreSig === data.scoreSignature;
}

function generateSignature(text: string): number {
    return hashIt(text + pepper);
}
