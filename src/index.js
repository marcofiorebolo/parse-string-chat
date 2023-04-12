const Parser = require('./Parser');
const fs = require('fs');

const STEPS = [
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.',
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.\n14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.',
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.',
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.',
    '14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.',
    '14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.'
];

function main() {
    const parser = new Parser();
    let result = "";
    for(let i = 0; i < STEPS.length; i++) {
        result = parser.parseString(STEPS[i]);
        console.log(parser.parseString(STEPS[i]));
        fs.writeFile(`Step${i+1}.txt`, JSON.stringify(result, ' ', 2), (err) => {
            if (err) throw err;
        });
    }
    
}

main()