import {delay} from '../libs/delay';
import {promiseSeries} from '../libs/promise-series';
import {loadImage} from '../libs/load-image';
import {Timer} from '../libs/timer';

const sectionSelector = `.screen--prizes`;
const itemSelector = `.prizes__item`;
const imageSelector = `img`;
const imageTemplateSelector = `template`;
const placeSelector = `.prizes__icon`;
const itemInitedClass = `prizes__item_is-inited`;
const counterSelector = `.prizes__desc b`;

function createFragment(node) {
  return document.importNode(node.content, true);
}

function animatePrizeCounter({values, element}) {
  return new Promise((resolve) => {
    const timer = new Timer({
      fps: 12,
      render: () => {
        const value = values.shift();
        if (typeof value !== `number`) {
          timer.stop();
          resolve();
          return;
        }
        element.dataset.value = value;
      }
    });

    timer.start();
  });
}

function waitForItem(item) {
  const imageTemplate = item.querySelector(imageTemplateSelector);
  const imageDuration = (parseFloat(getComputedStyle(item).getPropertyValue(`--prize-item-duration`)) || 0) * 1000;
  const imageFragment = createFragment(imageTemplate);

  item.querySelector(placeSelector).appendChild(imageFragment);

  return loadImage(item.querySelector(imageSelector))
    .then(() => item.classList.add(itemInitedClass))
    .then(() => Promise.all([
      delay(imageDuration),
      delay(imageDuration - 1000)
        .then(() => {
          const counterElement = item.querySelector(counterSelector);
          return animatePrizeCounter({
            values: counterElement.dataset.values.split(`,`).map((v) => parseFloat(v)),
            element: counterElement
          });
        })
    ]));
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
