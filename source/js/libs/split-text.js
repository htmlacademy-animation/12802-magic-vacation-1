// замена <br> на '\n'
function replaceBreakToNewLine(str) {
  return str.replace(/<br\s*\/?>/mg, `\n`);
}

class SplitText {
  static of(rootElement) {
    return new SplitText(rootElement);
  }

  static get NODES() {
    return {
      ROOT: `root`,
      LINE: `line`,
      WORD: `word`,
      LETTER: `letter`,
      SPACE: `space`
    };
  }

  constructor(rootElement) {
    this._rootElement = rootElement;
  }

  visitor(callback) {
    this._visitor = callback;
    return this;
  }

  prepare() {
    if (!this._rootElement) {
      return this;
    }

    const visitor = this._visitor;

    this._rootElement.innerHTML = replaceBreakToNewLine(this._rootElement.innerHTML);

    const content = this._rootElement.textContent.trim();
    const lines = content.split(`\n`);

    const rootElement = document.createElement(`span`);
    const rootFragment = document.createDocumentFragment();

    let linesCount = lines.length;
    let wordTotalIndex = -1;
    let letterTotalIndex = -1;

    visitor({
      type: SplitText.NODES.ROOT,
      element: rootElement,
      data: {
        linesCount
      }
    });

    lines.forEach((line, lineIndex, linesArray) => {
      const lineElement = document.createElement(`span`);
      const lineFragment = document.createDocumentFragment();

      visitor({
        type: SplitText.NODES.LINE,
        element: lineElement,
        data: {
          line,
          lineIndex,
          linesArray
        }
      });

      line.split(/\s+/).forEach((word, wordIndex, wordsArray) => {
        wordTotalIndex++;

        const wordElement = document.createElement(`span`);
        const wordFragment = document.createDocumentFragment();

        visitor({
          type: SplitText.NODES.WORD,
          element: wordElement,
          data: {
            word,
            wordIndex,
            wordsArray,
            wordTotalIndex
          }
        });

        word.split(``).forEach((letter, letterIndex, lettersArray) => {
          letterTotalIndex++;
          const letterElement = document.createElement(`span`);

          visitor({
            type: SplitText.NODES.LETTER,
            element: letterElement,
            data: {
              letter,
              letterIndex,
              lettersArray,
              letterTotalIndex
            }
          });

          letterElement.textContent = letter;
          wordFragment.appendChild(letterElement);
        });

        const spaceElement = document.createElement(`span`);

        visitor({
          type: SplitText.NODES.SPACE,
          element: spaceElement,
          data: null
        });

        spaceElement.textContent = ` `;

        wordElement.appendChild(wordFragment);
        lineFragment.appendChild(wordElement);
        lineFragment.appendChild(spaceElement);
      });

      lineElement.appendChild(lineFragment);
      rootFragment.appendChild(lineElement);
    });

    rootElement.appendChild(rootFragment);

    this._rootElement.innerHTML = rootElement.outerHTML;

    return this;
  }
}

export default SplitText;
