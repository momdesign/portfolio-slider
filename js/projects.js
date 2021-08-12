import gsap, {Power2} from 'gsap'

import IntroAnimation from "./introAnimation";

const introAnimation = new IntroAnimation();

introAnimation.init();

const projectsBlock = document.querySelector('.projects');
const projectItems = document.querySelectorAll('.projects__item');
let index = -1;
let hasScrolled = false;
let isFistsProjectShown = false;

const projects =  [...document.querySelectorAll('[data-project]')].map(el => ({
   name: el.getAttribute('data-project-name'),
   info: el.getAttribute('data-project-info'),
   year: el.getAttribute('data-project-year'),
   service: el.getAttribute('data-project-service'),
   description: el.getAttribute('data-project-description'),
   color: el.getAttribute('data-project-color'),
 }));

const setProjectInfo = (i) => {
  const name = document.querySelector('[data-more="name"]');
  const info = document.querySelector('[data-more="info"]');
  const service = document.querySelector('[data-more="service"]');
  const year = document.querySelector('[data-more="year"]');
  const color = projects[i]?.color;

  setTimeout(() => {
    projectsBlock.style.backgroundColor = color;
  }, isFistsProjectShown ? 1000 : 0);

  name.innerHTML = projects[i].name;
  info.innerHTML = projects[i].info;
  service.innerHTML = projects[i].service;
  year.innerHTML = projects[i].year;
  isFistsProjectShown = true
};

const goToNextProject = () => {
  projectItems.forEach((el , i) => {
      const nextProjectItem = el.querySelector(`[data-project-index="${index + 1}"]`);
      const currProjectItem = el.querySelector(`[data-project-index="${index}"]`);
    if(nextProjectItem) {
        gsap.to(nextProjectItem, {yPercent: -100, duration: 1, ease: Power2.easeInOut,  delay : index < 0 ? (i % 3 * 0.4 + 0.7) : i % 3 * 0.4 + 1.2});
      }
      if(currProjectItem) {
        gsap.to(currProjectItem, {yPercent: -200, duration: 0.5, ease: Power2.easeInOut,  delay : i % 3 * 0.4 + 0.3});
      }
    });
    index++;
    setProjectInfo(index);
};

const goToPrevProject = () => {
    projectItems.forEach((el, i) => {
      const currProjectItem = el.querySelector(`[data-project-index="${index}"]`);
      const prevProjectItem = el.querySelector(`[data-project-index="${index - 1}"]`);

      if(currProjectItem) {
        gsap.to(currProjectItem, {yPercent: 0, duration: 0.5, ease: Power2.easeInOut,  delay : i % 3 * 0.4 + 0.3});
      }
      if(prevProjectItem) {
        gsap.to(prevProjectItem, {yPercent: -100, duration: 1, ease: Power2.easeInOut,  delay : i % 3 * 0.4 + 1.2});
      }
    });
    index--;
    setProjectInfo(index);
};

function throttle(cb, interval) {
  let now = Date.now();
  return function() {
    if (!hasScrolled ||(now + interval - Date.now() < 0)) {
      hasScrolled = true;
      cb();
      now = Date.now();
    }
  }
}

const goToNextProjectThrottle = throttle( () => goToNextProject() ,  3000);
const goToPrevProjectThrottle = throttle( () => goToPrevProject() ,  3000);

window.addEventListener('wheel', (e) => {
  if ( e.deltaY > 0 && index < projects.length - 1) {
    goToNextProjectThrottle();
  }
  if( e.deltaY < 0 && index > 0) {
    goToPrevProjectThrottle();
  }
});
