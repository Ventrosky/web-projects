const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'] });
// Adds the utterances and intents for the NLP
manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'howdy', 'greetings.hello');

// Train also the NLG
manager.addAnswer('en', 'greetings.bye', 'Till next time');
manager.addAnswer('en', 'greetings.bye', 'see you soon!');
manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.hello', 'Greetings!');

// Train and save the model.
(async() => {
    await manager.train();
    manager.save();

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
})();

