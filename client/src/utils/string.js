import _ from 'lodash';

export const blackList = [
  'the',
  'an',
  'a'
];

let altText = {
  'i': '1',
  'ii': '2',
  'iii': '3',
  'iv': '4',
  'v': '5',
  'vi': '6',
  'vii': '7',
  'viii': '8',
  'ix': '9',
  'x': '10',
  'xi': '11',
  'xii': '12',
  'xiii': '13',
  '&': 'and',
  'ben': 'benjamin',
  'ad': 'anno domini',
  'sunscreen': 'suntan lotion',
  'vw beetle': 'beetle',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'ten': '10'
};

let potentialMultiWordAbbreviations = [
  'anno domini',
  'suntan lotion'
];

export const alternateText = Object.assign(altText, _.invert(altText));

export function cleanWord(word){
  return _
    .chain(word)
    .deburr()
    .unescape()
    .replace(/<[^>]*>/g, "")
    .replace(/[\"\'\*\-\_\(\)\=\+\{\}\|\/\\\[\]\!\`\~\.\?\<\>\;\:\,\^]/g, "")
    .trim()
    .value();
}

export function reverseAndOrder(str) {
  // break string at 'and' and reverse the words around it
  let output = str;
  lowStr = str.toLowerCase();
  let strArr = lowStr.split('and');

  if(strArr.length > 1) {
    let andIdx = strArr.find((word, idx) => {
      if(word === 'and') return idx;
    });

    let preAnd  = strArr[andIdx - 1];
    let postAnd = strArr[andIdx + 1];
    let output  = strArr.slice(0, andIdx - 1)
    .concat(preAnd)
    .concat('and')
    .concat(postAnd)
    .join('');
  }
  
  return output;
}

export function compareKeywords(kws1, kws2) {
  for(let i=0; i<kws1.length; i++) {
    if(!kws2[i] || (kws2[i] !== kws1[i])) {
      return false;
    }
  }

  return true;
}

export function createKeywords(str, blackList) {
  let whiteStrArr = str.toLowerCase().split(' ');
  let blackStrArr = [];

  whiteStrArr.forEach(word => {
    let cleanedWord = cleanWord(word);
    
    if((blackList && !blackList.includes(cleanedWord)) || !blackList) {
      blackStrArr.push(cleanedWord);
    }
  });

  return blackStrArr;
}