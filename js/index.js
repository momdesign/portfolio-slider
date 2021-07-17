import gsap from 'gsap';

import CircularScroll from './circular';
import Slider from './slider';
import { closeContacts, openContacts } from './contact';

export const circularScroll = new CircularScroll();

const dqs = document.querySelector.bind(document);
const dqsa = document.querySelectorAll.bind(document);

const details = dqs('#more');
const moreDetailsBtn = dqs('[data-animate="info"]');
const closeBtn = dqs('[data-animate="close"]');
const sliders = dqsa('.slider');
const copyBtn = dqs('[data-animate="copy"]');
const header = dqs('[data-animate="header"]');
let isDetailsClose = true;
let slidersArr = [];
let isIntroPlayed = false;


document.querySelector('[data-contact="open-button"]')?.addEventListener('click', () => {
  closeContacts(() => circularScroll.toggleScrollingHandler(true));
});
document.querySelector('[data-contact="close-button"]')?.addEventListener('click', () => {
  openContacts(() => circularScroll.toggleScrollingHandler(false));
});

// comment this for intro
circularScroll.startScrolling();
// window.addEventListener('wheel', e => {
//   if (isIntroPlayed || e.deltaY < 0) return;
//
//   isIntroPlayed = true;
//   gsap.fromTo(sliders[0], { y: -250 }, { y: 0 }).then( () => {
//     circularScroll.startScrolling();
//   });
// });

sliders.forEach((_, i) => slidersArr.push(new Slider(i)));

const toggleSliderAndNavigation = (currentSlider, time) => {
  const slides = currentSlider.querySelectorAll('.slide');
  const sliderNavigation = dqsa('[data-navigation]');
  const arrows = dqsa('[data-animate="arrows"]');

  circularScroll.scrollToProject();
  setTimeout(() => {
    slides.forEach(sl => {
      if (!sl.classList.contains('active')) {
        sl.classList.toggle('slide-hidden');
      }
    });

    arrows.forEach(el => el.classList.toggle('slider__arrows-visible'));
  },  time);

  sliderNavigation.forEach(el => el.classList.toggle('slider-clicker-left-active'));
  slidersArr[circularScroll.activeProject.index].onSliderToggle((time + 100) / 1000  , isDetailsClose);
  slidersArr[circularScroll.activeProject.index].isSliderOpen = !slidersArr[circularScroll.activeProject.index].isSliderOpen;
}

const toggleDescriptionClasses = (time) => {
  const logo = dqs('[data-animate="logo"]');
  const name = dqs('[data-more="name"]');

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

const onEscapePress = (e) => {
  if(e.key === 'Escape') handleDetails();
}

const escapeEventHandler = () => {
  isDetailsClose
    ? window.addEventListener('keydown', onEscapePress)
    : window.removeEventListener('keydown', onEscapePress)
};

const handleDetails = () => {
  const info = dqs('[data-more="info"]');
  const currentSlider = dqsa('.slider')[circularScroll.activeProject.index];
  const delayTime =  Math.abs(circularScroll.distanceBetweenPosAndCurrProject * 6 + 200);

  escapeEventHandler();
  toggleSliderAndNavigation(currentSlider, delayTime);
  isDetailsClose = !isDetailsClose;
  circularScroll.setIsScrolling(isDetailsClose);
  toggleDescriptionClasses(delayTime);
  circularScroll.toggleScrollingHandler(!isDetailsClose);

  header.innerHTML = circularScroll.activeProject.name;

  setTimeout(() => {
    info.innerHTML = !isDetailsClose ? circularScroll.activeProject.description : circularScroll.activeProject.info;
  }, 200);

  copyBtn.setAttribute('data-copy', circularScroll.copyLink);
};

setTimeout(() => {
  document.querySelector('[data-slider="first"]').classList.remove('slide-invisible');
}, 300);

details.addEventListener('click', handleDetails);
