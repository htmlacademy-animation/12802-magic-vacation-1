import {delay} from '../libs/delay';
import {promiseSeries} from '../libs/promise-series';
import {loadImage} from '../libs/load-image';

const sectionSelector = `.screen--prizes`;
const itemSelector = `.prizes__item`;
const imageSelector = `img`;
const imageTemplateSelector = `template`;
const placeSelector = `.prizes__icon`;
const itemInitedClass = `prizes__item_is-inited`;

function createFragment(node) {
  return document.importNode(node.content, true);
}

function waitForItem(item) {
  const imageTemplate = item.querySelector(imageTemplateSelector);
  const imageDuration = (parseFloat(item.style.getPropertyValue(`--prize-item-duration`)) || 0) * 1000;
  const imageFragment = createFragment(imageTemplate);

  item.querySelector(placeSelector).appendChild(imageFragment);

  return loadImage(item.querySelector(imageSelector))
    .then(() => item.classList.add(itemInitedClass))
    .then(() => delay(imageDuration));
}

export default function initPrizes() {
  const prizesSection = document.querySelector(sectionSelector);
  const initialDelay = parseFloat(getComputedStyle(prizesSection, `before`).transitionDuration) * 1000 + 200;

  document.body.addEventListener(`screenChanged`, function onInit(event) {
    const {detail: {screenName}} = event;

    if (screenName !== `prizes`) {
      return;
    }

    document.body.removeEventListener(`screenChanged`, onInit);

    const animationItemsPromises = Array.from(document.querySelectorAll(itemSelector))
      .map((item) => () => waitForItem(item));

    delay(initialDelay)
      .then(promiseSeries(animationItemsPromises));
  });
}
