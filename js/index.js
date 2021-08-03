import CircularScroll from './circular';
import Slider from './slider';
import { closeContacts, openContacts } from './contact';
import IntroAnimation from './introAnimation'
import { toggleDescriptionClasses } from './toggleDescriptionClasses'

export const circularScroll = new CircularScroll();
const intro = new IntroAnimation(() => circularScroll.startScrolling());

const dqs = document.querySelector.bind(document);
const dqsa = document.querySelectorAll.bind(document);

const details = dqs('#more');
const sliders = dqsa('.slider');
const copyBtn = dqs('[data-animate="copy"]');
const header = dqs('[data-animate="header"]');
let isDetailsClose = true;
let slidersArr = [];

intro.init();

const toggleSliderAndNavigation = (currentSlider, time) => {
  const slides = currentSlider.querySelectorAll('.slide');
  const sliderNavigation = dqsa('[data-navigation]');

  circularScroll.scrollToProject();
  setTimeout(() => {
    slides.forEach(sl => {
      if (!sl.classList.contains('active')) {
        sl.classList.toggle('slide-hidden');
      }
    });
  },  time);

  sliderNavigation.forEach(el => el.classList.toggle('slider-clicker-left-active'));
  slidersArr[circularScroll.activeProject.index].onSliderToggle((time + 100) / 1000  , isDetailsClose);
  slidersArr[circularScroll.activeProject.index].isSliderOpen = !slidersArr[circularScroll.activeProject.index].isSliderOpen;
}

const handleDetails = () => {
  const info = dqs('[data-more="info"]');
  const currentSlider = dqsa('.slider')[circularScroll.activeProject.index];
  const delayTime =  Math.abs(circularScroll.distanceBetweenPosAndCurrProject * 6 + 200);

  escapeEventHandler();
  toggleSliderAndNavigation(currentSlider, delayTime);
  isDetailsClose = !isDetailsClose;
  circularScroll.setIsScrolling(isDetailsClose);
  toggleDescriptionClasses(delayTime, isDetailsClose);
  circularScroll.toggleScrollingHandler(!isDetailsClose);

  setTimeout(() => {
    info.innerHTML = !isDetailsClose ? circularScroll.activeProject.description : circularScroll.activeProject.info;
  }, 200);

  // copyBtn.setAttribute('data-copy', circularScroll.copyLink);
};

const onEscapePress = (e) => {
  if(e.key === 'Escape') handleDetails();
}

const escapeEventHandler = () => {
  isDetailsClose
    ? window.addEventListener('keydown', onEscapePress)
    : window.removeEventListener('keydown', onEscapePress)
};

sliders.forEach((s, i) => {
  s.addEventListener('click', e => {
    if (!intro.isIntroStarted) {
      intro.start().then(() => {
        handleDetails();
      });
    } else {
      if (isDetailsClose && !!e.target.closest('.slide.active')) {
        circularScroll.scrollToProject(i);
        handleDetails();
      }
    }
  });
  slidersArr.push(new Slider(i));
});

details.addEventListener('click', handleDetails);

document.querySelector('[data-contact="open-button"]')?.addEventListener('click', () => {
  openContacts(() => circularScroll.toggleScrollingHandler(true));
});
document.querySelector('[data-contact="close-button"]')?.addEventListener('click', () => {
  closeContacts(() => circularScroll.toggleScrollingHandler(false));
});
