const englishToBraille = {
  'a': 'O.....',
  'b': 'O.O...',
  'c': 'OO....',
  'd': 'OO.O..',
  'e': 'O..O..',
  'f': 'OOO...',
  'g': 'OOOO..',
  'h': 'O.OO..',
  'i': '.OO...',
  'j': '.OOO..',
  'k': 'O...O.',
  'l': 'O.O.O.',
  'm': 'OO..O.',
  'n': 'OO.OO.',
  'o': 'O..OO.',
  'p': 'OOO.O.',
  'q': 'OOOOO.',
  'r': 'O.OOO.',
  's': '.OO.O.',
  't': '.OOOO.',
  'u': 'O...OO',
  'v': 'O.O.OO',
  'w': '.OOO.O',
  'x': 'OO..OO',
  'y': 'OO.OOO',
  'z': 'O..OOO',
  ' ': '......',
  'CAP': '.....O',
  'NUM': '.O.OOO'
};

const brailleToEnglish = {
  'O.....': 'a',
  'O.O...': 'b',
  'OO....': 'c',
  'OO.O..': 'd',
  'O..O..': 'e',
  'OOO...': 'f',
  'OOOO..': 'g',
  'O.OO..': 'h',
  '.OO...': 'i',
  '.OOO..': 'j',
  'O...O.': 'k',
  'O.O.O.': 'l',
  'OO..O.': 'm',
  'OO.OO.': 'n',
  'O..OO.': 'o',
  'OOO.O.': 'p',
  'OOOOO.': 'q',
  'O.OOO.': 'r',
  '.OO.O.': 's',
  '.OOOO.': 't',
  'O...OO': 'u',
  'O.O.OO': 'v',
  '.OOO.O': 'w',
  'OO..OO': 'x',
  'OO.OOO': 'y',
  'O..OOO': 'z',
  '......': ' ',
  '.....O': 'CAP',
  '.O.OOO': 'NUM'
};

const numbersToBraille = {
  '1': 'O.....',
  '2': 'O.O...',
  '3': 'OO....',
  '4': 'OO.O..',
  '5': 'O..O..',
  '6': 'OOO...',
  '7': 'OOOO..',
  '8': 'O.OO..',
  '9': '.OO...',
  'O': '.OOO..'
};

function translateBrailleToEnglish (brailleInput) {
  const brailleArr = brailleInput.trim().split(/\s+/);
  let result = '';
  let capitalizeNext = false;
  let numberMode = false;

  brailleArr.forEach(brailleChar => {X
    if (brailleChar === '.....O') {
      capitalizeNext = true;
    } else if (brailleChar === '.O.OOO') {
      numberMode = true;
    } else {
      let letter;
      if (numberMode) {
        letter = Object.keys(numbersToBraille).find(key => numbersToBraille[key] == brailleChar);
        if (!letter) letter = '?'
      } else {
        letter = brailleToEnglish[brailleChar] || '?';
        if (capitalizeNext && letter !== ' ') {
          letter = letter.toUpperCase();
          capitalizeNext = false;
        }
      }

      result += letter;
      if (brailleChar === '......') {
        numberMode = false;
      }
    }
  });

  return result;
}

function translateEnglishToBraille (englishInput) {
  let result = '';
  let numberMode = false;

  for (const letter of englishInput) {
    if (letter.match(/[A-Z]/)) {
      result += '.....O ' + (englishToBraille[letter.toLowerCase()] || '......') + ' ';
    } else if (letter.match(/[0-9]/)) {
      if (!numberMode) {
        result += '.O.OOO ';
        numberMode = true;
      }
      result += numbersToBraille[letter] + ' ';
    } else if (letter.match(/[a-z]/)) {
      result += (englishToBraille[letter] || '......') + ' ';
      numberMode = false;
    } else if (letter === ' ') {
      result += '...... ';
      numberMode = false;
    }
  }

  return result.trim().replace(/ /g, '');
}

function isBraille (input) {
  return /^[O. ]+$/.test(input);
}

function detectAndTranslate(input) {
  if (isBraille(input)) {
    return translateBrailleToEnglish(input);
  } else {
    return translateEnglishToBraille(input);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2).join(' ');
  const translation = detectAndTranslate(args);
  console.log(translation);
}
