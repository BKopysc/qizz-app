
export function shareScoreTemplate(score: number, total: number, name: string, url: string): string {
    return `I scored ${score} out of ${total} in [${name}] quiz. Try to beat me!\n\n${url}`;
}