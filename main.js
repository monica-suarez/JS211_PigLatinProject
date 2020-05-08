'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const pigLatin = (oldword) =>{
//   let vowels = ["a", "e", "i", "o", "u"]
//   let newWord = "";
//   if (vowels.indexOf(oldword[0]) > -1){
//     newWord = oldword.trim().toLowerCase() + "yay";
//     return newWord;
//   }
//   else{
//     let firstLetter = oldword.match(/[aeiou]/);
//     let vowel = oldword.indexOf(firstLetter[0]);
//     newWord = oldword.substring(vowel).trim().toLowerCase() + oldword.substring(0, vowel).trim().toLowerCase() + "ay";
//     return newWord;
//   }
// }
const pigLatin = (oldword)=>{
  if (oldword.match(/ /)) {
    oldword = oldword.toLowerCase().trim();
    let wordArr = oldword.split(' ');
    let result = '';
    for (let i = 0; i < wordArr.length; i++) {
      if (i > 0) {
        result += ' ';
      }
      result += translate(wordArr[i]);
    }
    return result;
  }
  return translate(oldword);
}
const translate = (oldword)=> {
  let i = oldword.search(/[aeiou]/);
  if (!i) {
    return oldword + 'yay';
  }
  if (oldword.match(/qu/)) {
    if (oldword.indexOf('qu') < i) { 
      i++;
    }
  }
  return oldword.substr(i) + oldword.substr(0, i) + 'ay';
};



// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
    it('should test for words starting with mult consonants', () => {
      assert.equal(pigLatin('drop'), 'opdray');
    });
    it('should test for multiple words', () =>{
      assert.equal(pigLatin('run away'), 'unray awayyay');
    });
  });
} else {

  getPrompt();

}






// **********
//   HINTS
// **********

// break your code into pieces and focus on one piece at a time...
// 1. if word begins with a vowel send to one function: adds "yay"
// 2. if word begins in with a consonant send to another function: splices off beginning, returns word with new ending.
  // 3. if multiple words, create array of words, loop over them, sending them to different functions and creating a new array with the new words 