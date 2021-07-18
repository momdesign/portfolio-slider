const dqs = document.querySelector.bind(document);

export const toggleDescriptionClasses = (time, isDetailsClose) => {
  const name = dqs('[data-more="name"]');
  // const copyBtn = dqs('[data-animate="copy"]');
  const moreDetailsBtn = dqs('[data-animate="info"]');
  const header = dqs('[data-animate="header"]');
  const logo = dqs('[data-animate="intro-logo"]');

  // copyBtn.classList.toggle('more__copy-visible');
  logo.classList.toggle('intro__letters--top');
  moreDetailsBtn.classList.toggle('more__icon-info-visible');

  setTimeout(() => {
    header.classList.toggle('more__header-visible');
  }, time + 200);

  !isDetailsClose
    ? name.classList.toggle('more__name-hidden')
    : setTimeout(() => name.classList.toggle('more__name-hidden'), 250);
}
