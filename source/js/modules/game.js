import {Timer} from '../libs/timer';
import {formatTime, numberToPadString} from '../libs/format-time';

export default function initGame() {
  const counterElement = document.querySelector(`.game__counter`);
  const GAME_DURATION = 1000 * 60 * 5;
  let gameTime;

  if (!counterElement) {
    return;
  }

  function renderCounter(time) {
    counterElement.textContent = formatTime(time / 1000, (timeData) => {
      return `${numberToPadString(timeData.min)}:${numberToPadString(timeData.sec)}`;
    });
  }

  const timer = new Timer({
    fps: 1,
    render: () => {
      gameTime -= 1000;

      if (gameTime <= 0) {
        timer.stop();
        renderCounter(0);
      } else {
        renderCounter(gameTime);
      }
    }
  });

  document.body.addEventListener(`screenChanged`, (event) => {
    const {detail: {screenName}} = event;

    timer.stop();

    if (screenName === `game`) {
      gameTime = GAME_DURATION;
      renderCounter(gameTime);
      timer.start();
    } else {
      timer.stop();
    }
  });
}
