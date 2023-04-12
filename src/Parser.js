
/**
 * Final output will be an array of these objects
 * @typedef     {Object}    ChatStructure   "{date: "", mention: "", sentence: "", type: ""}"
 * Properties used in the regular expressions
 * @property    {string}    date            "14:24:32"
 * @property    {string}    mention         "14:24:32 Customer : "
 * @property    {string}    sentence        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 * @property    {string}    type            "customer"
*/

const COMPLETE_REGEX = /(?<mention>(?<date>(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) (?<type>Agent|Customer|[.' \w]+) (: )?)(?<sentence>(.*.\n?))/gm
const LINE_REGEX = /(?<mention>(?<date>(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) [\w ]*:? ?)/g
const TYPES = ['agent', 'customer'];

class Parser {
    
    constructor(completeRegex, lineRegex, types) {
        this.completeRegex = completeRegex ? completeRegex : new RegExp(COMPLETE_REGEX);
        this.lineRegex = lineRegex ? lineRegex : new RegExp(LINE_REGEX)
        this.types = types ? new Set(types) : new Set(TYPES);
    }
    
    getLines(text) {
        let match = [];
        const lines = [];
        let index = 0;

        while (match = this.lineRegex.exec(text)) {
            const line = text.substring(index, match.index);
            index = match.index;
            if (!line.trim()) {
                continue;
            }
            lines.push(line);
        }
        lines.push(text.substring(index, text.length));
        return lines;
    }

    /**
     * 
     * @param {string} stringChat 
     * @returns {ChatStructure[]}
    */
    parseString(stringChat) {
        let match = [];
        const resList = [];
        const lines = this.getLines(stringChat);

        let count = 0;
        for (const line of lines) {
            while(match = this.completeRegex.exec(line)) {
                if(match.groups) {
                    resList.push({
                        date: match.groups.date,
                        mention: match.groups.mention,
                        sentence: match.groups.sentence,
                        type: this.types.has((match.groups.type).toLowerCase()) ? (match.groups.type).toLowerCase() : (count === 0 ? 'customer' : 'agent')
                    });
                    count++;
                }
                
            }
        }
        return resList;
    }
}

module.exports = Parser;