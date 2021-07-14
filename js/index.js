import CircularScroll from './circular';

const circularScroll = new CircularScroll();

const details = document.querySelector('#more');
const moreDetailsBtn = document.querySelector('[data-animate="info"]');
const closeBtn = document.querySelector('[data-animate="close"]');
let isDetailsClose = true;

circularScroll.render();

const handleDetails = () => {
  const copyBtn = document.querySelector('[data-animate="copy"]');
  const arrows = document.querySelector('[data-animate="arrows"]');
  const info = document.querySelector('[data-about="info"]');
  const name = document.querySelector('[data-about="name"]');
  const logo = document.querySelector('[data-animate="logo"]');
  const header = document.querySelector('[data-animate="header"]');

  isDetailsClose = !isDetailsClose;
  circularScroll.setIsScrolling(isDetailsClose);
  copyBtn.classList.toggle('about__copy-visible');
  arrows.classList.toggle('about__arrows-visible');
  moreDetailsBtn.classList.toggle('about__icon-info-visible');
  closeBtn.classList.toggle('about__icon-close--visible');
  header.classList.toggle('about__header-visible');
  logo.classList.toggle('logo-hidden');

  circularScroll.scrollToProject();
  circularScroll.descriptionHandler(isDetailsClose);
  header.innerHTML = circularScroll.activeProject.name;

  !isDetailsClose?
  name.classList.toggle('about__name-hidden') :
  setTimeout(() => name.classList.toggle('about__name-hidden'), 250);

  setTimeout(() => {
    info.innerHTML = !isDetailsClose ? circularScroll.activeProject.description : circularScroll.activeProject.info;
  }, 200)

};

details.addEventListener('click', handleDetails);
