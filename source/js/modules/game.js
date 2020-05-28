import {Timer} from '../libs/timer';
import {formatTime, numberToPadString} from '../libs/format-time';

export default function initGame() {
  const counterElement = document.querySelector(`.game__counter`);
  const GAME_DURATION = 1000 * 60 * 5;

  if (!counterElement) {
    return;
  }

  function renderCounter(time) {
    counterElement.textContent = formatTime(time / 1000, (timeData) => {
      return `${timeData.min}:${numberToPadString(timeData.sec)}`;
    });
  }

  const timer = new Timer({
    fps: 1
  });

  document.body.addEventListener(`screenChanged`, (event) => {
    const {detail: {screenName}} = event;

    timer.stop();
    let gameTime = GAME_DURATION;
    renderCounter(gameTime);

    if (screenName === `game`) {
      timer
        .on(`update`, () => {
          gameTime -= 1000;

          if (gameTime <= 0) {
            timer.stop();
            renderCounter(0);
          } else {
            renderCounter(gameTime);
          }
        })
        .run();
    } else {
      timer.stop();
    }
  });
}
