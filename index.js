let readline = require('readline-sync');

console.log('-------------------------------------------------');
console.log('*************************************************');
console.log('***                                           ***');
console.log('**                                  ______     **');
console.log('*     Welcome to Games "R" Us       |     |     *');
console.log('*              Hangman              O     |     *');
console.log('*                                  /|\\    |     *');
console.log('**                                  |     |    **');
console.log('***                                / \\  __|    ***');
console.log('*************************************************');
console.log('-------------------------------------------------\n\n\n');

console.log('Instructions:');
console.log('1.- Choose a difficulty by typing: Medium, Hard or Impossible');
console.log('2.- The app will think of a word. Your job is to guess the word by typing letter by letter or by typing the whole word.');
console.log('       a.- If you want to guess by letter, just type the letter that you want to guess first');
console.log('       b.- If you want to guess by word, type in the whole word. More than one letter will count as if you are trying to guess the whole word.\n          You only have one try for the whole word');
console.log('3.- If the letter you guess is in the word, the app will show you the letter and the position within the word');
console.log('4.- If the letter is not in the word, that will count as a miss.')
console.log('5.- If you have 6 missed, you lose. Correct letters do not count as misses.\n\n');

let mediumWordsArray = ['even', 'pizza', 'water', 'sixty', 'angel', 'music', 'fifty', 'party', 'woman', 'sugar', 'amber', 'believe', 'lyric', 'catch', 'said'];
let hardWordsArray = ['abnegation', 'abstruse', 'archetypal', 'bombastic', 'camaraderie', 'circumlocution', 'multifarious', 'pellucid', 'punctilious', 'sanctimonious', 'expectation', 'hilarious', 'scarce', 'unfamiliar', 'equivalent'];
let impossibleWordsArray = ['supercalifragilisticexpialidocious', 'pseudopseudohypoparathyroidism', 'antidisestablishmentarianism', 'thyroparathyroidectomized', 'dichlorodifluoromethane', 'incomprehensibilitie', 'baccalaureate', 'extemporaneous', 'nomenclature'];
let placeholder= [];
let misteryWord;
let maxTries = 6;
let letterPosition = [];

function gameStarter(){
    console.log('Chose your Dificulty:')
    let difficulty = readline.question(`type: Medium, Hard, Impossible\n`).toLowerCase();
    while(difficulty !== 'medium' && difficulty !== 'hard' && difficulty !== 'impossible'){
        difficulty = readline.question(`Please type: Medium, Hard, or Impossible\n`).toLowerCase();
        console.log(difficulty);
    }
    console.clear();
    switch(difficulty.toLowerCase()){
        case 'medium':
            misteryWord = mediumWordsArray[Math.floor(Math.random() * mediumWordsArray.length)];
            console.log('-----------------------------------------------------')
            console.log(`Medium, really... Well, you have ${maxTries} chances.`);
            //console.log(misteryWord);
            break;
        case 'hard':
            misteryWord = hardWordsArray[Math.floor(Math.random() * hardWordsArray.length)];
            console.log(`Hard it is. You have ${maxTries} chances.`);
            //console.log(misteryWord);
            break;
        case 'impossible':
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
    let letterArray = [];
    let playAgain;

    
    for(let i = 0; i < maxTries; i++){
        if(letter.length > 1 && letter === misteryWord){
            youWin();
            playAgain = readline.question('Do you want to play again? y/n:   ');
            playAgainFunc(playAgain);
            return;
        }else if(letter.length > 1){
            yourLose();
            playAgain = readline.question('Do you want to play again? y/n:   ');
            playAgainFunc(playAgain);
            return;
        }else {
            if(letterArray.includes(letter)){
                console.log(`You already typed that letter. Letters typed ( ${letterArray})\n`);
                i--;
            } else {
                let letterIncluded = findLetter(letter, misteryWord);
                if(letterIncluded.length > 0){
                    for(let y = 0; y < letterIncluded.length; y++){
                        placeholder[letterIncluded[y]] = letter;
                        lettersGuessed++;
                    }
                    letterArray.push(letter);
                    console.clear();
                    visualHangman(counter);
                    console.log('✅️   Wuhuu, You got it!');
                    let placeHolderString = placeholder.toString().replace(/,/g, ' ');
                    console.log(placeHolderString);
                    i--;
                } else {
                    console.clear();
                    letterArray.push(letter);
                    counter++;
                    visualHangman(counter);
                    console.log(`❌️   The letter: ${letter} is not in the word`);
                    placeHolderString = placeholder.toString().replace(/,/g, ' ');
                    console.log(placeHolderString);
                }
            }

            if(counter >= maxTries){
                yourLose();
                playAgain = readline.question('Do you want to play again? y/n:   ');
                playAgainFunc(playAgain);
                break;
            }else if(lettersGuessed === misteryWord.length){
                youWin();
                playAgain = readline.question('Do you want to play again? y/n:   ');
                playAgainFunc(playAgain);
                break;
            }else{
                letter = readline.question(`\nwhat is your next letter:    `).toLowerCase();
            }


        }
    }
}


function findLetter(letter, misteryWord){
    letterPosition.length = 0;
    for(let i = 0; i < misteryWord.length; i++){
        if(letter === misteryWord[i]){
            letterPosition.push(i);
        }
    }
    return letterPosition;
}

function playAgainFunc(yesOrNo){
    while((yesOrNo.toLowerCase() !== 'y') && (yesOrNo.toLowerCase() !== 'n')){
        yesOrNo = readline.question('Do you want to play again? y/n:   ');
    }

    if(yesOrNo.toLowerCase() === 'y'){
        console.clear();
        console.log(yesOrNo);
        gameStarter();
    } else {
        console.log(yesOrNo);
        console.log('\n********* SEE YOU SOON ***********\n');
    }
}

function youWin(){
    console.log('\n\n🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩');
    console.log('🌟 🌟 🌟 🌟                      🌟 🌟 🌟 🌟');
    console.log('🌟 🌟 🌟 🌟    You WIN!!!!!!!!   🌟 🌟 🌟 🌟');
    console.log('🌟 🌟 🌟 🌟                      🌟 🌟 🌟 🌟');
    console.log('🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩 🤩\n\n');
}

function yourLose(){
    console.clear();
    console.log(`\n\n💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀`);
    console.log(`❌️                                                              ❌️`);
    console.log(`❌️   You have reached the maximun number of misses. YOU LOSE!   ❌️`);
    console.log(`     👀 👀 👀 The Word was: ${misteryWord}`);
    console.log(`💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀\n\n`);
}

function visualHangman(number){
    switch(number){
        case 1:
            console.log('\n-------------------------');
            console.log('*************************');
            console.log('***                   ***');
            console.log('**          ______     **');
            console.log('*           |     |     *');
            console.log('*           O     |     *');
            console.log('*                 |     *');
            console.log('**                |    **');
            console.log('***             __|   ***');
            console.log('*************************');
            console.log('-------------------------\n\n\n');
            break;
        case 2:
            console.log('\n-------------------------');
            console.log('*************************');
            console.log('***                   ***');
            console.log('**          ______     **');
            console.log('*           |     |     *');
            console.log('*           O     |     *');
            console.log('*           |     |     *');
            console.log('**          |     |    **');
            console.log('***             __|   ***');
            console.log('*************************');
            console.log('-------------------------\n\n\n');
            break;
        case 3:
            console.log('\n-------------------------');
            console.log('*************************');
            console.log('***                   ***');
            console.log('**          ______     **');
            console.log('*           |     |     *');
            console.log('*           O     |     *');
            console.log('*          /|     |     *');
            console.log('**          |     |    **');
            console.log('***             __|   ***');
            console.log('*************************');
            console.log('-------------------------\n\n\n');
            break;
        case 4:
            console.log('\n-------------------------');
            console.log('*************************');
            console.log('***                   ***');
            console.log('**          ______     **');
            console.log('*           |     |     *');
            console.log('*           O     |     *');
            console.log('*          /|\\    |     *');
            console.log('**          |     |    **');
            console.log('***             __|   ***');
            console.log('*************************');
            console.log('-------------------------\n\n\n');
            break;
        case 5:
            console.log('\n-------------------------');
            console.log('*************************');
            console.log('***                   ***');
            console.log('**          ______     **');
            console.log('*           |     |     *');
            console.log('*           O     |     *');
            console.log('*          /|\\    |     *');
            console.log('**          |     |    **');
            console.log('***        /    __|   ***');
            console.log('*************************');
            console.log('-------------------------\n\n\n');
            break;
        case 6:
            console.log('\n-------------------------');
            console.log('*************************');
            console.log('***                   ***');
            console.log('**          ______     **');
            console.log('*           |     |     *');
            console.log('*           O     |     *');
            console.log('*          /|\\    |     *');
            console.log('**          |     |    **');
            console.log('***        / \\  __|   ***');
            console.log('*************************');
            console.log('-------------------------');
            break;
    }
}

gameStarter();