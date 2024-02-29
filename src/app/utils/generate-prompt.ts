export function generatePrompt(subject: string = "any", language: string = 'english', difficulty: string = 'easy',
    numOfQuestions: number = 4, isMultiOptions: boolean = false) {
    const req = { minAns: 3, maxAns: 5 }

    const promptHeader = `Prepare quiz about: ${subject}\n`;
    const promptLanguage = `Language: ${language}\n`;
    const difficultyLevel = `Difficulty: ${difficulty}\n`;
    const promptRequirements = `Requirements: [Minimum ${req.minAns} answers, Maximum ${req.maxAns} answers, unique answers, ${numOfQuestions} questions, ${isMultiOptions ? 'Multiple' : 'Single'} correct answer, add links if possible]\n`;
    const promptFormat = `
    Format in XML: 
    <quiz>
    <q>
    <qName>name</qName> 
    <ans isCorrect=„false”>answer</ans>
    <link></link>
    </q>
    </quiz>\n`;

    return promptHeader + promptLanguage + difficultyLevel + promptRequirements + promptFormat;
}