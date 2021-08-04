import gsap from 'gsap'

import IntroAnimation from "./introAnimation";

const introAnimation = new IntroAnimation();

introAnimation.init();

const projectsBlock = document.querySelector('.projects');
const projectItems = document.querySelectorAll('.projects__item');
const btn = document.querySelector('#btn');
let index = -1;
let hasScrolled = false;

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
  }, i ? 1000 : 0);

  name.innerHTML = projects[i].name;
  info.innerHTML = projects[i].info;
  service.innerHTML = projects[i].service;
  year.innerHTML = projects[i].year;
};

const goToNextProject = () => {
  projectItems.forEach(el => {
      const nextProjectItem = el.querySelector(`[data-project-index="${index + 1}"]`);
      const prevProjectItem = el.querySelector(`[data-project-index="${index}"]`);

      if(nextProjectItem) {
        gsap.to(nextProjectItem, {yPercent: -100, delay : index >= 0 ? 1.5 : 0.7});
      }
      if(prevProjectItem) {
          gsap.to(prevProjectItem, {yPercent: -200});
      }
    });
    index++;
    setProjectInfo(index);
};

const goToPrevProject = () => {
    projectItems.forEach(el => {
      const currProjectItem = el.querySelector(`[data-project-index="${index}"]`);
      const prevProjectItem = el.querySelector(`[data-project-index="${index - 1}"]`);

      if(currProjectItem) {
        gsap.to(currProjectItem, {yPercent: 0});
      }
      if(prevProjectItem) {
        gsap.to(prevProjectItem, {yPercent: -100, delay: 1.5});
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
