const Parser = require('./Parser');
const fs = require('fs');

let outputDir = './output';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
} 

function main() {
    const parser = new Parser();
    let result = "";
    
    let files = fs.readdirSync('./data');
    let buffer = "";

    for(let i = 0; i < files.length; i++) {
        buffer = fs.readFileSync(`./data/${files[i]}`, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
        });
        result = parser.parseString(buffer);
        console.log(result);
        fs.writeFile(`${outputDir}/Step${i+1}.txt`, JSON.stringify(result, ' ', 2), (err) => {
            if (err) throw err;
        });
    }
    
}

main()