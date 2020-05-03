export default () => {
  window.addEventListener(`load`, function () {
    document.documentElement.classList.add(`page--loaded`);
  });
};
