/* Template XML:
<quiz>
    <q>
        <qName>name</qName> 
        <ans isCorrect=„false”>answer</ans>
    </q>
</quiz>
*/

import { xml2js, xml2json } from "xml-js";
import { IQuiz, IQuizParsed } from "../interfaces/quiz.interface";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });

const templateXML = {
    openingTag: "<quiz>",
    closingTag: "</quiz>",
    question: {
        openingTag: "<q>",
        closingTag: "</q>",
        questionName: "<qName>",
        answer: {
            openingTag: "<ans>",
            attribute: "isCorrect",
            closingTag: "</ans>"
        },
    }
}



export function LoadFromTemplate(data: string): IQuiz | null {
    // find opening tag
    const openingTagIdx = data.indexOf(templateXML.openingTag);
    // find closing tag
    const closingTagIdx = data.indexOf(templateXML.closingTag);

    // if not found return null
    if (openingTagIdx === -1 || closingTagIdx === -1) return null;

    // extract content including opening and closing tags
    const content = data.slice(openingTagIdx, closingTagIdx + templateXML.closingTag.length);

    // Parse content from XML to JSON
    try{
        const json = xml2js(content, {compact: true}) as IQuizParsed;
        console.log(json);
        let parsedContent: IQuiz = {
            description: '',
            name: '',
            questions: []
        };

        let idCtr = 1;
        let questionIdCtr = 1;

        parsedContent.questions = json.quiz.q.map(q => {
            return {
                name: q.qName._text as string,
                id: uid.rnd(),
                answers: q.ans.map(a => {
                    return {
                        name: a._text.toString(),
                        id: uid.rnd(),
                        isCorrect: a._attributes.isCorrect as boolean
                    }
                })
            }
        });
    
        return parsedContent;
    } catch (e) {
        console.error(e);
        return null;
    }

}
