import { createCanvas } from "canvas";
import { IQuizImage } from "../interfaces/quiz-image.interface";
import { generateQRCode, generateQRCodeForVerify } from "./generate-qr-code";


export async function generateScoreToImage(quizImageData: IQuizImage): Promise<string> {

    // Create a canvas
    const canvas = createCanvas(300, 370); // Adjusted size
    const ctx = canvas.getContext('2d');

    // background
    ctx.fillStyle = '#fcf8ed'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Black border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Watermark with a slight angle
    ctx.save();
    ctx.globalAlpha = 0.2; 
    ctx.font = 'italic 16px Arial';
    ctx.fillStyle = 'gray';
    const angle = -0.3; 
    for (let x = 10; x < canvas.width; x += 50) {
        for (let y = 10; y < canvas.height; y += 50) {
            ctx.translate(x, y); 
            ctx.rotate(angle);
            ctx.fillText('QIzz', 0, 0); 
            ctx.rotate(-angle); 
            ctx.translate(-x, -y);
        }
    }
    ctx.restore(); // Restore the saved transformation matrix
    ctx.globalAlpha = 1; // Reset alpha

    // Set font and style
    ctx.font = 'bold 14px Arial'; 
    ctx.fillStyle = 'black';

    // Draw text on the canvas with labels
    ctx.fillText(`${quizImageData.name}`, 10, 30);

    ctx.font = 'bold 13px Arial';
    ctx.fillText(`Score: ${quizImageData.score}/${quizImageData.maxScore}  (${quizImageData.percentage}%)`, 10, 50);

    //draw dotted line
    ctx.beginPath();
    ctx.setLineDash([3, 2]);
    ctx.strokeStyle = 'gray';
    ctx.moveTo(0, 65);
    ctx.lineTo(300, 65);
    ctx.stroke();

    ctx.font = 'bold 13px Arial';
    ctx.fillStyle = 'blue'
    ctx.fillText(`ID: ${quizImageData.id}`, 10, 85);
    ctx.fillStyle = 'purple'
    ctx.fillText(`SIG-Q: ${quizImageData.quizSignature}`, 10, 105);
    ctx.fillText(`SIG-S: ${quizImageData.scoreSignature}`, 10, 125);

    // Generate QR code for signature
    const signatureQrCode = await generateQRCodeForVerify(
        quizImageData.verifyUrl, 
        quizImageData.quizSignature, 
        quizImageData.scoreSignature, 
        quizImageData.score,
        quizImageData.id
    );
    ctx.font = 'italic 12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Scan to verify authenticity', 10, 145);
    ctx.drawImage(signatureQrCode, 10, 150);

    const padding = 10;
    const gradient = ctx.createLinearGradient(padding, canvas.height - padding, canvas.width - padding, canvas.height - padding);
    for (let i = 0; i < 3; i++) { 
        gradient.addColorStop(i / 2, getRandomColor(quizImageData.quizSignature + i));
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(padding, canvas.height - 5 - padding, canvas.width - 2 * padding, 10);

    const dataUrl = canvas.toDataURL();
    return dataUrl;
}

function getRandomColor(seed: number): string {
    const random = (max: number) => Math.floor(Math.abs(Math.sin(seed++) * 16777215) % max);
    return `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
}