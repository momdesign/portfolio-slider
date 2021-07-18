const dqs = document.querySelector.bind(document);

export const toggleDescriptionClasses = (time, isDetailsClose) => {
  const name = dqs('[data-more="name"]');
  const copyBtn = dqs('[data-animate="copy"]');
  const moreDetailsBtn = dqs('[data-animate="info"]');
  const closeBtn = dqs('[data-animate="close"]');
  const header = dqs('[data-animate="header"]');
  const logo = dqs('[data-animate="logo"]');

  copyBtn.classList.toggle('more__copy-visible');
  moreDetailsBtn.classList.toggle('more__icon-info-visible');
  closeBtn.classList.toggle('more__icon-close--visible');

  setTimeout(() => {
    header.classList.toggle('more__header-visible');
    logo.classList.toggle('logo-hidden');
  }, time + 200);

  !isDetailsClose
    ? name.classList.toggle('more__name-hidden')
    : setTimeout(() => name.classList.toggle('more__name-hidden'), 250);
}
