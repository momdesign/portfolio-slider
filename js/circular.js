import VirtualScroll from 'virtual-scroll';

import { isIos } from './utils/breakpoints';

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}
class CircularScroll {
  constructor() {
    this.scroller = new VirtualScroll();
    this.projects = [...document.querySelectorAll('.project')];
    this.projectWrappers = document.querySelectorAll('.project-wrapper');
    this.radius = document.querySelector('.circular-wrapper').offsetHeight / 2;
    this.radians = 2 * Math.PI / this.projects.length;
    this.y = 0;
    this.easedY = this.y;
    this.name = document.querySelector('[data-about="name"]');
    this.info = document.querySelector('[data-about="info"]');
    this.year = document.querySelector('[data-about="year"]');
    this.service = document.querySelector('[data-about="service"]');
    this.activeProject = this.getProjects()[0];

    this.positionWrappers();
    // це індекс ізінга, від 1 до 0.0000n ... - чим менший, тим довшим буде
    // інерційний рух (тобто рух вже після того як скрол відбувся), і повільнішою
    // сама анімація
    this.easing = 0.05;

    // це швидкість - чим більше число, тим повільніше скролиться
    // перше значення для iOS devices, друге для десктопу
    this.speed = isIos() ? 1 : 10;
    this.totalScroll = 2260 * this.speed;
    this.singleProjectYDuration = this.totalScroll / this.projects.length;
    this.isScrolling = true;


    this.scroller.on(e => {
      if (!this.isScrolling) return;

      const position = e.y % this.totalScroll < 0 ?
        (-1 * ((e.y - this.singleProjectYDuration / 2) % this.totalScroll)) :
        (-1 * ((e.y - this.singleProjectYDuration / 2) % this.totalScroll - this.totalScroll) % this.totalScroll);

      this.activeProject = this.getProjects().find(pr => pr.startPos < position && position < pr.endPos);

      this.name.innerHTML = this.activeProject?.name;
      this.info.innerHTML = this.activeProject?.info;
      this.service.innerHTML = this.activeProject?.service;
      this.year.innerHTML = this.activeProject?.year;
      this.description = this.activeProject?.description;

      this.y = e.y / this.speed;
    });
  }

  setScrolling(isScrolling) {
    this.isScrolling = isScrolling;
  }

  getProjects() {
    return this.projects.map((el, i) => ({
      name: el.getAttribute('data-project-name'),
      info: el.getAttribute('data-project-info'),
      year: el.getAttribute('data-project-year'),
      service: el.getAttribute('data-project-service'),
      description: el.getAttribute('data-project-description'),
      startPos: i * this.singleProjectYDuration,
      endPos: i * this.singleProjectYDuration + this.singleProjectYDuration
    }));
  }

  positionWrappers() {
    this.projectWrappers.forEach((wr, i) => {
      const alpha = Math.PI - (i * this.radians);

      wr.style.left = `${this.radius * Math.sin(alpha)}px`;
      wr.style.top = `${this.radius * Math.cos(alpha) - (window.innerHeight / 2)}px`;
    });
  };

  render() {
    this.easedY = Math.floor(this.easedY * 100) / 100;
    this.easedY = lerp(this.easedY, this.y, this.easing);

    const top = this.radius * Math.sin(this.easedY / 360);
    const left = this.radius * Math.cos(this.easedY / 360) - this.radius;

    this.projects.forEach(pr => {
      pr.style.transform =
        `translate3d(${top}px, ${left}px, 0px)`;
    });

    window.requestAnimationFrame(this.render.bind(this));
  }
}

export default CircularScroll;
