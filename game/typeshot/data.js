// words
// window.array = ['abcdefghijklmnopqrstuvwxyz', 'world'];
window.array = [
'hello',
'world',
'doctor',
'love',
'you',
'honey',
'daughter',
'family',
'mother',
'father',
'song',
'sing',
'make',
'history',
'grandpa',
'grandma',//
'destroy',
'find',
'there',
'hero',
'zero',
'unbelievable',
'sound',
'feeling',
'quite',
'great',
'curry',
'nature',
'national',
'association',
'amazing',
'apple',
'advertisement',
'become',
'before',
'bite',
'byte',
'blow',
'bike',
'catch',
'careful',
'yesterday',
'today',
'tomorrow',
'look',
'whiteside',
'jasonkidd',
'alleniverson',
'rayallen',
'klaythompson'
];

window.words = [];
for(var i = 0; i < array.length; i++)
  words.push(new Word(array[i]));

window.isLoaded = true;