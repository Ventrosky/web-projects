const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'] });

manager.load('model.nlp')

var standard_input = process.stdin;
    standard_input.setEncoding('utf-8');
    console.log("Please input text in command line.");
    standard_input.on('data', async function (data) {
        if(data === 'exit\n'){
            console.log("User input complete, program exit.");
            process.exit();
        }else
        {
            console.log('User Input Data : ' + data);
            const response = await manager.process('en', data);
            console.log(response);
        }
});