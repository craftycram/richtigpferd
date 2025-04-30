import wordlist from './wordlist.json';

export default defineEventHandler(async (event) => {
  appendHeader(event, 'Content-Type', 'text/plain;charset=UTF-8'); 
  return wordlist.join('\n');
});
