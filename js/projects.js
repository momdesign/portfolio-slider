import IntroAnimation from "./introAnimation";
import throttle from './utils/throttle';

const introAnimation = new IntroAnimation();

introAnimation.init(() => goToNextProject);

const projectsData = [
  {
    background: '#1f285f',
    name: 'SIMON OSTROVSKY',
    info: 'portfolio website',
    service: 'design / web',
    year: '2021'
  },
  {
    background: '#ffffff',
    name: 'Liminal',
    info: '',
    service: 'Design / Development',
    year: 'WIP'
  }
]

const projectsBlock = document.querySelector('.projects');
const projectItems = document.querySelectorAll('.projects__img--mask');
let index = 0;

const goToNextProject = () => {
  projectsBlock.style.backgroundColor = projectsData[index]?.background;
  projectItems.forEach(el => {
    setTimeout(() => {
      el.style.transform = `translateY(${100 - index * 100}%)`;
    },  1000 + 1000 * Math.random())
  });
  index++;
};

const throttleGoToNextProject = throttle( () => goToNextProject() ,  4000 );

window.addEventListener('wheel', () => {

  if(index){
    throttleGoToNextProject();
  }else {
    goToNextProject()
  }
});
