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
let misteryWord;
let maxTries = 6;
let letterPosition = [];

function gameStarter(){
    console.log('Chose your Dificulty:')
    let difficulty = readline.question(`type: Medium, Hard, Impossible\n`);
    switch(difficulty.toLowerCase()){
        case 'medium':
            // console.log('EASY');
            misteryWord = mediumWordsArray[Math.floor(Math.random() * mediumWordsArray.length)];
            console.log('-----------------------------------------------------')
            console.log(`Medium, really... Well, you have ${maxTries} chances.`);
            console.log(misteryWord);
            break;
        case 'hard':
            //console.log('HARD');
            misteryWord = hardWordsArray[Math.floor(Math.random() * hardWordsArray.length)];
            console.log(`Hard it is. You have ${maxTries} chances.`);
            //console.log(misteryWord);
            break;
        case 'impossible':
            //console.log('IMPOSSIBLE');
            misteryWord = impossibleWordsArray[Math.floor(Math.random() * impossibleWordsArray.length)];
            console.log(`If it says impossible, why would you... never mind. You still have ${maxTries} chances.`);
            //console.log(misteryWord);
            break;
        default:
            console.log('Please type: Easy, Medium, or Hard');
    }

    placeholder.length = 0;
    for(let y = 0; y < misteryWord.length; y++){
        placeholder.push('_');
    };
    console.log(`\nThe word has ${misteryWord.length} letters. \n ${placeholder}`);
    let userLetter = readline.question(`\nEnter you first letter:  `).toLowerCase();
    hangman(userLetter);
}

function hangman(letter){
    let lettersGuessed = 0;
    let counter = 0;
    for(let i = 0; i < maxTries; i++){
        let letterIncluded = findLetter(letter, misteryWord);
        if(letterIncluded.length > 0){
            for(let y = 0; y < letterIncluded.length; y++){
                // console.log(letterIncluded.length);
                // console.log(letterIncluded);
                // console.log(letter);
                placeholder[letterIncluded[y]] = letter;
                // console.log(placeholder);
                lettersGuessed++;
            }
            console.log('✅️   Wuhuu, You got it');
            let placeHolderString = placeholder.toString().replace(/,/g, ' ');
            console.log(placeHolderString);
            i--;
        } else {
            console.log(`❌️   The letter: ${letter} is not in the word`);
            placeHolderString = placeholder.toString().replace(/,/g, ' ');
            console.log(placeHolderString);
            counter++;
        }

        if(counter >= maxTries){
            console.log(`\n\n💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀`);
            console.log(`❌️                                                              ❌️`);
            console.log(`❌️   You have reached the maximun number of misses. YOU LOSE!   ❌️`);
            console.log(`     👀 👀 👀 The Word was: ${misteryWord}`);
            console.log(`💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀\n\n`);
        }else if(lettersGuessed === misteryWord.length){
            console.log('\n\n🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩');
            console.log('🌟 🌟 🌟 🌟                      🌟 🌟 🌟 🌟');
            console.log('🌟 🌟 🌟 🌟    You WIN!!!!!!!!   🌟 🌟 🌟 🌟');
            console.log('🌟 🌟 🌟 🌟                      🌟 🌟 🌟 🌟');
            console.log('🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩\n\n');
            break;
        }else{
            letter = readline.question(`\nwhat is your next letter:    `).toLowerCase();
        }
    }

    let playAgain = readline.question('Do you want to play again? y/n:   ');
    if(playAgain.toLowerCase() === 'y'){
        gameStarter();
    } else {
        console.log('\n********* SEE YOU SOON ***********\n');
    }
}


function findLetter(letter, misteryWord){
    letterPosition.length = 0;
    //console.log(letterPosition)
    for(let i = 0; i < misteryWord.length; i++){
        if(letter === misteryWord[i]){
            letterPosition.push(i);
        }
    }
    //console.log(letterPosition);
    return letterPosition;
}

gameStarter();