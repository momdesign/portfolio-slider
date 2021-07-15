import CircularScroll from './circular';
import Slider from './slider';

const circularScroll = new CircularScroll();

const dqs = document.querySelector.bind(document);
const dqsa = document.querySelectorAll.bind(document);

const details = dqs('#more');
const moreDetailsBtn = dqs('[data-animate="info"]');
const closeBtn = dqs('[data-animate="close"]');
const copyBtn = dqs('[data-animate="copy"]');
const sliders = dqsa('.slider');
let isDetailsClose = true;

circularScroll.render();

sliders.forEach((_, i) => new Slider(i));

const handleDetails = () => {
  const copyBtn = dqs('[data-animate="copy"]');
  const arrows = dqsa('[data-animate="arrows"]');
  const info = dqs('[data-more="info"]');
  const name = dqs('[data-more="name"]');
  const logo = dqs('[data-animate="logo"]');
  const header = dqs('[data-animate="header"]');
  const currentSlider = dqsa('.slider')[circularScroll.activeProject.index];
  const slides = currentSlider.querySelectorAll('.slide');

  isDetailsClose = !isDetailsClose;
  circularScroll.setIsScrolling(isDetailsClose);
  copyBtn.classList.toggle('more__copy-visible');
  moreDetailsBtn.classList.toggle('more__icon-info-visible');
  closeBtn.classList.toggle('more__icon-close--visible');
  header.classList.toggle('more__header-visible');
  logo.classList.toggle('logo-hidden');

  circularScroll.scrollToProject();
  circularScroll.descriptionHandler(isDetailsClose);
  header.innerHTML = circularScroll.activeProject.name;

  !isDetailsClose
    ? name.classList.toggle('more__name-hidden')
    : setTimeout(() => name.classList.toggle('more__name-hidden'), 250);

  setTimeout(() => {
    info.innerHTML = !isDetailsClose ? circularScroll.activeProject.description : circularScroll.activeProject.info;
  }, 200);

  copyBtn.setAttribute('data-copy', circularScroll.copyLink);

  slides.forEach(sl => {
    if(!sl.classList.contains('active')){
      sl.classList.toggle('slide-hidden');
    }
  });

  arrows.forEach(el => el.classList.toggle('slider__arrows-visible'));
};

setTimeout(() => {
  document.querySelector('[data-slider="first"]').classList.remove('slide-invisible');
}, 300);

details.addEventListener('click', handleDetails);
