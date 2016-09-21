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
  '&': 'and'
};

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