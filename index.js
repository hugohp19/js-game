let readline = require('readline-sync');

console.log('--------------------------------------');
console.log('**************************************');
console.log('***                                ***');
console.log('**                                  **');
console.log('*                                    *');
console.log('*     Welcome to Games "R" Us        *');
console.log('*                                    *');
console.log('**                                  **');
console.log('***                                ***');
console.log('**************************************');
console.log('--------------------------------------\n\n\n');

let mediumWordsArray = ['even', 'pizza', 'water', 'sixty', 'angel', 'music', 'fifty', 'party', 'woman', 'sugar', 'amber'];
let hardWordsArray = ['abnegation', 'abstruse', 'archetypal', 'bombastic', 'camaraderie', 'circumlocution', 'multifarious', 'pellucid', 'punctilious', 'sanctimonious'];
let impossibleWordsArray = ['supercalifragilisticexpialidocious', 'pseudopseudohypoparathyroidism', 'antidisestablishmentarianism', 'thyroparathyroidectomized', 'dichlorodifluoromethane', 'incomprehensibilitie'];
let placeholder= [];
let wordArray;
let maxTries = 6;
let letterPosition = [];

function gameStarter(){
    console.log('Chose your Dificulty:')
    let difficulty = readline.question(`type: Medium, Hard, Impossible\n`);
   switch(difficulty.toLowerCase()){
        case 'medium':
            // console.log('EASY');
            wordArray = mediumWordsArray[Math.floor(Math.random() * mediumWordsArray.length)];
            console.log(`Medium, really... Well, you have ${maxTries} chances.`);
            console.log(wordArray);
            break;
        case 'hard':
            //console.log('HARD');
            wordArray = hardWordsArray[Math.floor(Math.random() * hardWordsArray.length)];
            console.log(`Hard it is. You have ${maxTries} chances.`);
            //console.log(wordArray);
            break;
        case 'impossible':
            //console.log('IMPOSSIBLE');
            wordArray = impossibleWordsArray[Math.floor(Math.random() * impossibleWordsArray.length)];
            console.log(`If it says impossible, why would you... never mind. You still have ${maxTries} chances.`);
            //console.log(wordArray);
            break;
        default:
            console.log('Please type: Easy, Medium, or Hard');
    }

    return wordArray;
    
}

gameStarter();
for(let y = 0; y < wordArray.length; y++){
    placeholder.push('_ ');
};
console.log(`The word has ${wordArray.length} letters. \n ${placeholder}`);
let userLetter = readline.question(`Enter you first letter:\n`);
hangman(userLetter);

function hangman(letter){
    let lettersGuessed = 0;
    let counter = 0;
    for(let i = 0; i < maxTries; i++){
        console.log(i + " , " + maxTries);
        let letterIncluded = findLetter(letter, wordArray);
        if(letterIncluded.length > 0){
            for(let y = 0; y < letterIncluded.length; y++){
                // console.log(letterIncluded.length);
                // console.log(letterIncluded);
                // console.log(letter);
                placeholder[letterIncluded[y]] = letter;
                // console.log(placeholder);
                lettersGuessed++;
            }
            console.log('Wuhuu, You got it');
            let placeHolderString = placeholder.toString().replace(/,/g, ' ');
            console.log(placeHolderString);
            i--;
        } else {
            console.log(`The letter: ${letter} is not in the word`);
            placeHolderString = placeholder.toString().replace(/,/g, ' ');
            console.log(placeHolderString);
            counter++;
        }

        if(counter >= maxTries){
            console.log(`You have reached the maximun number of misses. YOU LOSE!`);
        }else if(lettersGuessed === wordArray.length){
            console.log('*********************************************')
            console.log('***********    You WIN!!!!!!!!   ************')
            console.log('*********************************************')
            break;
        }else{
            letter = readline.question(`\nwhat is your next letter>\n`);
        }
    }
}


function findLetter(letter, wordArray){
    letterPosition.length = 0;
    //console.log(letterPosition)
    for(let i = 0; i < wordArray.length; i++){
        if(letter === wordArray[i]){
            letterPosition.push(i);
        }
    }
    //console.log(letterPosition);
    return letterPosition;
}