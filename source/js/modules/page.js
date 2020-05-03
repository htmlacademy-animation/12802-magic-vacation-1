export default () => {
  const root = document.documentElement;

  window.addEventListener(`load`, function () {
    root.classList.add(`page--loaded`);
  });

  document.body.addEventListener(`screenChanged`, function (event) {
    const {detail: {screenName}} = event;
    root.classList.toggle(`page--delayed`, screenName === `prizes`);
  });
};
