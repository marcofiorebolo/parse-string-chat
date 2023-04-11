
/**
 * Properties used in the regular expressions
 * @typedef     {Object}    ChatStructure   "{date: "", mention: "", sentence: "", type: ""}"
 * @property    {string}    date            "14:24:32"
 * @property    {string}    mention         "14:24:32 Customer : "
 * @property    {string}    sentence        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 * @property    {string}    type            "customer"
 */

const CHAT_REGEX = /(?<mention>(?<date>(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) (?<type>Agent|Customer|[.' \w']+) (: )?)(?<sentence>(.*.\n?))/gm
const PIECES_REGEX = /(?<mention>(?<date>(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)) [\w ]*:? ?)/g

const TYPES = ['agent', 'customer'];

class Parser {
    
    constructor(mainRegex, piecesRegex, types) {
        this.mainRegex = mainRegex ? mainRegex : new RegExp(CHAT_REGEX);
        this.piecesRegex = piecesRegex ? piecesRegex : new RegExp(PIECES_REGEX)
        this.types = types ? types : new Set(TYPES);
    }
    
    getPieces(text) {
        let match = [];
        const pieces = [];
        let index = 0;

        while (match = this.piecesRegex.exec(text)) {
            const piece = text.substring(index, match.index);
            index = match.index;
            if (!piece.trim()) {
                continue;
            }
            pieces.push(piece);
        }
        pieces.push(text.substring(index, text.length));
        return pieces;
    }

    /**
     * 
     * @param {string} stringChat 
     * @returns {ChatStructure[]}
     */
    parseString(stringChat) {
        let match = [];
        const resList = [];
        const pieces = this.getPieces(stringChat);

        for (const piece of pieces) {
            while(match = this.mainRegex.exec(piece)) {
                if(match.groups) {
                    resList.push({
                        date: match.groups.date,
                        mention: match.groups.mention,
                        sentence: match.groups.sentence,
                        type: this.types.has((match.groups.type).toLowerCase()) ? (match.groups.type).toLowerCase() : match.groups.type
                    });
                }
            }
        }
        return resList;
    }
}

module.exports = Parser;