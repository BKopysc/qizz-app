import * as LZString from 'lz-string';
import { IQuiz } from '../interfaces/quiz.interface';

export function compressData(data: IQuiz): string | null {
    try{
        return LZString.compressToEncodedURIComponent(JSON.stringify(data));
    } catch (e) {
        console.log(e)
        return null;
    }
}

export function decompressData(data: string): IQuiz | null {
    try{
        return JSON.parse(LZString.decompressFromEncodedURIComponent(data)) as IQuiz;
    } catch (e) {
        console.log(e);
        return null;
    }
}