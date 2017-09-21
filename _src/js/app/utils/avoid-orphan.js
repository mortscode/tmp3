import emitter from '../utils/emitter';

export default function avoidOrphan(elem) {
  const last = elem.lastChild;
  let windowWidth = window.innerWidth;
  let skinnyWindow = windowWidth < 680;
  let trimmed;
  let wordArray;
  let wordCount;

  emitter.on('app--resizer', () => {
    windowWidth = window.innerWidth;
  });

  if (last && last.nodeType === 3) {
    trimmed = last.nodeValue.trim();
    wordArray = trimmed.match(/\S+/g);
    wordCount = wordArray ? wordArray.length : 0;

    if (wordCount > 3 && !skinnyWindow) {
      last.nodeValue = trimmed.replace(/\s+([^\s]+\s*)$/g, '\xA0$1');
    }
  }
}
