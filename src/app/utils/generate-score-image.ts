import { createCanvas } from "canvas";
import * as qr from 'qrcode';

export async function generateScoreToImage(name: string, score: number, maxScore: number, percentage: number, signature: number): Promise<string> {

    // Create a canvas
    const canvas = createCanvas(300, 350); // Adjusted size
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
    ctx.globalAlpha = 0.3; 
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
    ctx.fillText(`Name: ${name}`, 10, 30);
    ctx.fillText(`Score: ${score}/${maxScore}`, 10, 70);
    ctx.fillText(`Percentage: ${percentage}%`, 10, 110);
    ctx.fillText(`SIG: ${signature}`, 10, 150);

    // Generate QR code for signature
    const signatureQrCode = await generateQRCode(`$N${name}--P${percentage}%--SIG${signature}`);
    ctx.drawImage(signatureQrCode, 10, 180);

    const padding = 10;
    const gradient = ctx.createLinearGradient(padding, canvas.height - padding, canvas.width - padding, canvas.height - padding);
    for (let i = 0; i < 3; i++) { 
        gradient.addColorStop(i / 2, getRandomColor(signature + i));
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(padding, canvas.height - 5 - padding, canvas.width - 2 * padding, 10);

    const dataUrl = canvas.toDataURL();
    return dataUrl;
}

async function generateQRCode(data: string): Promise<any> {
    const qrCanvas = createCanvas(150, 150);
    await qr.toCanvas(qrCanvas, data);
    return qrCanvas;
}

function getRandomColor(seed: number): string {
    const random = (max: number) => Math.floor(Math.abs(Math.sin(seed++) * 16777215) % max);
    return `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
}