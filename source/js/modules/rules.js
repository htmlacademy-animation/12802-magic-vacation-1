function initRules() {
  const lastRuleItem = document.querySelector(`.rules__item:last-child`);
  const startButton = document.querySelector(`.rules__link`);

  const activeButtonClass = `rules__link_active`;
  const animationName = `showListMarker`;

  if (!lastRuleItem && !startButton) {
    return;
  }

  lastRuleItem.addEventListener(`animationend`, function (event) {
    if (event.animationName !== animationName) {
      return;
    }

    startButton.classList.add(activeButtonClass);
  });

  document.body.addEventListener(`screenChanged`, function (event) {
    const {detail: {screenName}} = event;

    if (screenName !== `rules`) {
      startButton.classList.remove(activeButtonClass);
    }
  });
}

export default initRules;
