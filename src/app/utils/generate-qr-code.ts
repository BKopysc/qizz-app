import { Canvas, createCanvas } from "canvas";
import * as qr from 'qrcode';

export async function generateQRCode(data: string): Promise<Canvas> {
    const qrCanvas = createCanvas(150, 150);
    await qr.toCanvas(qrCanvas, data);
    return qrCanvas;
}

export async function generateQRCodeForVerify(verifyUrl:string, quizSignature: number, 
    scoreSignature: number, score: number, id: number): Promise<Canvas> {
    const data = `${verifyUrl}?quizSig=${quizSignature}&scoreSig=${scoreSignature}&score=${score}&id=${id}`;
    return await generateQRCode(data);
}