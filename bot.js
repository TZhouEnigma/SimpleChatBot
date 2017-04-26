

var restify = require('restify');

var recast = require('recastai');

var recastClient = new recast.request('5df7198d60d7f84b3660cb3f0e61aadf', 'en');

var builder = require('botbuilder');




var connector = new builder.ChatConnector({



appId: '18a7f09d-c911-41dd-9831-29d2833a6e35',



appPassword: 'Zb09znXOqaBa9zJpqHj38Ja'


});




var bot = new builder.UniversalBot(connector);


bot.dialog('/', function(session) {



console.log(session.message.text);



recastClient.analyseText(session.message.text)



.then(function(res) {




if (res.intent()) { console.log('Intent: ', res.intent().slug) }




if (res.intent().slug === 'greetings') {




session.send("Hi there!");




}



})



.catch(function() {




session.send('I need some sleep right now... Talk to me later!')



});


});




var server = restify.createServer();


server.listen(8000);


server.post('/', connector.listen());