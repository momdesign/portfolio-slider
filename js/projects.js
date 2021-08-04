import IntroAnimation from "./introAnimation";

const introAnimation = new IntroAnimation();

introAnimation.init(() => goToNextProject);

const projectsBlock = document.querySelector('.projects');
const projectItems = document.querySelectorAll('.projects__item');
let index = 0;
let hasScrolled = false;


const projects =  [...document.querySelectorAll('[data-project]')].map(el => ({
   name: el.getAttribute('data-project-name'),
   info: el.getAttribute('data-project-info'),
   year: el.getAttribute('data-project-year'),
   service: el.getAttribute('data-project-service'),
   description: el.getAttribute('data-project-description'),
   color: el.getAttribute('data-project-color'),
 }));

const setProjectInfo = () => {
  const name = document.querySelector('[data-more="name"]');
  const info = document.querySelector('[data-more="info"]');
  const service = document.querySelector('[data-more="service"]');
  const year = document.querySelector('[data-more="year"]');

    projectsBlock.style.backgroundColor = projects[index].color;

  name.innerHTML = projects[index].name
  info.innerHTML = projects[index].info
  service.innerHTML = projects[index].service
  year.innerHTML = projects[index].year
};

const goToNextProject = () => {
  if(index < projects.length){
    setProjectInfo();

    projectItems.forEach(el => {
      const currProjectItem = el.querySelector(`[data-project-index="${index}"]`);
      const prevProjectItem = el.querySelector(`[data-project-index="${index - 1}"]`);

      if(prevProjectItem) {
        setTimeout(() => {
          prevProjectItem.style.transform = 'translateY(-200%)';
        },   1000 * Math.random());
      }
      if(currProjectItem) {
        setTimeout(() => {
          currProjectItem.style.transform = 'translateY(-100%)';
        }, (index ? 1500 : 1000) + 1000 * Math.random());
      }
    });
    index++;
  }
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

window.addEventListener('wheel', () => {
  goToNextProjectThrottle();
});
