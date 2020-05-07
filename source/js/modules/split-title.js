import SplitText from '../libs/split-text';

const titleSelector = `[data-split-title]`;

function initSplitTitle() {
  Array.from(document.querySelectorAll(titleSelector))
    .map(SplitText.of)
    .forEach((splitText) => {
      splitText
        .visitor(({type, element, data}) => {
          switch (type) {
            case SplitText.NODES.ROOT: {
              element.classList.add(`split-text`);
              break;
            }

            case SplitText.NODES.LINE: {
              element.classList.add(`split-text__line`);
              break;
            }

            case SplitText.NODES.WORD: {
              element.classList.add(`split-text__word`);
              break;
            }

            case SplitText.NODES.LETTER: {
              const globalIndex = data.letterTotalIndex;
              const indexMap = {
                0: 0,
                1: 2,
                2: 1,
                3: 3,
                4: 5,
                5: 4,
              };
              const localIndex = indexMap[globalIndex % 5];
              element.classList.add(`split-text__letter`);
              element.style.setProperty(`--letter-index`, localIndex);
              break;
            }

            case SplitText.NODES.SPACE: {
              element.classList.add(`split-text__space`);
              break;
            }
          }
        })
        .prepare();
    });
}

export default initSplitTitle;
