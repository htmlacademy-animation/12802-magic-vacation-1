export default () => {
  const keys = {
    'space': 32
  };

  let socialBlock = document.querySelector(`.js-social-block`);
  const toggler = document.querySelector(`.social-block__toggler`);

  socialBlock.addEventListener(`mouseover`, function () {
    socialBlock.classList.add(`social-block--active`);
  });

  socialBlock.addEventListener(`mouseleave`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  socialBlock.addEventListener(`focusin`, function () {
    socialBlock.classList.add(`social-block--active`);
  });

  socialBlock.addEventListener(`focusout`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  // Firefox не поддерживает на данный момент псевдокласс `:active` при нажатии пробела
  // https://bugzilla.mozilla.org/show_bug.cgi?id=68851
  toggler.addEventListener(`keydown`, function (keydownEvent) {
    if (keydownEvent.keyCode !== keys.space) {
      return;
    }

    toggler.classList.add(`active`);

    toggler.addEventListener(`keyup`, function onKeyUp(keyupEvent) {
      if (keyupEvent.keyCode !== keys.space) {
        return;
      }

      toggler.classList.remove(`active`);
      toggler.removeEventListener(`keyup`, onKeyUp);
    });
  });
};
