import wordlistContent from '../utils/wordlist';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const wordlistFile = wordlistContent;
  
  let length = 5;
  let uppercase = false;
  let digit = true;
  let dash = true;
  let umlauts = false;
  let keepCase = true;

  if (query.length) {
    length = parseInt(query.length as string, 10);
  }
  if (query.uppercase) {
    uppercase = query.uppercase === 'true';
  }
  if (query.digit) {
    digit = query.digit === 'true';
  }
  if (query.dash) {
    dash = query.dash === 'true';
  }
  if (query.umlauts) {
    umlauts = query.umlauts === 'true';
  }
  if (query.keepCase) {
    keepCase = query.keepCase === 'true';
  }
  if (length < 1 || length > 10) {
    return {
      error: 'Length must be between 1 and 10',
    };
  }

  const wordlist = wordlistFile.split('\n').filter((word: string) => word.trim() !== '');

  let words = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * wordlist.length);
    words.push(wordlist[randomIndex]);
  }

  let result = '';
  if (uppercase && !keepCase) {
    words = words.map((word) => {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    });
  } else if (!keepCase) {
    words = words.map((word) => word.toLowerCase());
  }
  if (digit) {
    const randomIndex = Math.floor(Math.random() * 10);
    words.push(randomIndex.toString());
  }
  if (dash) {
    result = words.join('-');
  } else {
    result = words.join('');
  }

  if (!umlauts) {
    result = result
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/Ä/g, 'Ae')
      .replace(/Ö/g, 'Oe')
      .replace(/Ü/g, 'Ue');
  }

  return result;
});
