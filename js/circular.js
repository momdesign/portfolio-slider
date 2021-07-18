import VirtualScroll from 'virtual-scroll';

import { isIos } from './utils/breakpoints';

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function floor(num) {
  return Math.floor(num * 100) / 100;
}

class CircularScroll {
  constructor() {
    this.scroller = new VirtualScroll();
    this.projects = [...document.querySelectorAll('.project')];
    this.projectWrappers = document.querySelectorAll('.project-wrapper');
    this.radius = 0;
    this.radians = 2 * Math.PI / this.projects.length;
    this.y = 0;
    this.easedY = this.y;
    this.position = this.y;
    this.name = document.querySelector('[data-more="name"]');
    this.info = document.querySelector('[data-more="info"]');
    this.year = document.querySelector('[data-more="year"]');
    this.service = document.querySelector('[data-more="service"]');
    this.activeProject = this.getProjects()[0];
    this.distanceBetweenPosAndCurrProject = 0;
    this.scrollEndPromiseResolve = null;
    this.easing = 0.06;
    this.speed = isIos() ? 0.7 : 10;
    this.totalScroll = 2262.07 * this.speed;
    this.singleProjectYDuration = this.totalScroll / this.projects.length;
    this.scrollingHandlerBound = this.scrollingHandler.bind(this);
    this.isCentered = true;

    this.setRadius();
    this.positionWrappers();
    window.addEventListener('resize', () => this.handleResize());
  }

  setRadius() {
    this.radius = document.querySelector('.circular-wrapper').offsetHeight / 2;
  }

  handleResize() {
    this.setRadius();
    this.positionWrappers();
  }

  toggleScrollingHandler(isOpen) {
    isOpen? this.scroller.off(this.scrollingHandlerBound) : this.scroller.on(this.scrollingHandlerBound);
  }

  scrollingHandler(e) {
    this.isCentered = false;
    this.y += e.deltaY / this.speed;

    const y = this.y * this.speed;
    this.position = y % this.totalScroll < 0 ?
      (-1 * ((y - this.singleProjectYDuration / 2) % this.totalScroll)) :
      (-1 * ((y - this.singleProjectYDuration / 2) % this.totalScroll - this.totalScroll) % this.totalScroll);

    const activeProject = this.getProjects().find(pr => pr.startPos < this.position && this.position < pr.endPos);

    this.distanceBetweenPosAndCurrProject = (this.position - this.activeProject?.pos) / this.speed;

    if (this.activeProject.index !== activeProject.index) {
      this.activeProject = activeProject;
      this.setProjectInfo();
    } else {
      this.activeProject = activeProject;
    }
  }

  setProjectInfo() {
    this.name.innerHTML = this.activeProject?.name;
    this.info.innerHTML = this.activeProject?.info;
    this.service.innerHTML = this.activeProject?.service;
    this.year.innerHTML = this.activeProject?.year;
    this.description = this.activeProject?.description;
    this.copyLink = this.activeProject?.copyLink;
  }

  setIsScrolling(isScrolling) {
    this.isScrolling = isScrolling;
  }

  scrollToProject(i) {
    if (this.isCentered) return;

    this.isCentered = true;

    this.activeProject = i === 0 || i ? this.getProjects()[i] : this.activeProject;

    if (i || i === 0) {
      if (this.activeProject.index === this.projects.length - 1 && i === 0) {
        this.y = this.y - (this.totalScroll + + this.singleProjectYDuration / 2 - this.position) / this.speed;
      } else {
        const distance = (this.position - this.activeProject.pos) / this.speed;
        this.y = this.y + distance;
      }
    } else {
      this.y = this.y + this.distanceBetweenPosAndCurrProject;
      this.distanceBetweenPosAndCurrProject = 0;
    }
  }

  getProjects() {
    return this.projects.map((el, i) => ({
      name: el.getAttribute('data-project-name'),
      info: el.getAttribute('data-project-info'),
      year: el.getAttribute('data-project-year'),
      service: el.getAttribute('data-project-service'),
      description: el.getAttribute('data-project-description'),
      copyLink: el.getAttribute('data-project-copy'),
      startPos: i * this.singleProjectYDuration,
      endPos: i * this.singleProjectYDuration + this.singleProjectYDuration,
      pos: i * this.singleProjectYDuration + this.singleProjectYDuration / 2,
      index: i
    }));
  }

  positionWrappers() {
    this.projectWrappers.forEach((wr, i) => {
      const alpha = Math.PI - (i * this.radians);

      wr.style.width = `${window.innerWidth}px`;
      wr.style.height = `${window.innerHeight}px`;
      wr.style.left = `${floor(this.radius * Math.sin(alpha))}px`;
      wr.style.top = `${floor(this.radius * Math.cos(alpha) - (window.innerHeight / 2))}px`;
    });
  };

  positionProjects() {
    const top = this.radius * Math.sin(this.easedY / 360);
    const left = this.radius * Math.cos(this.easedY / 360) - this.radius;

    this.projects.forEach(pr => {
      pr.style.transform =
        `translate3d(${floor(top)}px, ${floor(left)}px, 0px)`;
    });
  }

  startScrolling() {
    this.scroller.on(this.scrollingHandlerBound);

    this.render();
  }

  render() {
    this.easedY = lerp(floor(this.easedY), this.y, this.easing);
    this.positionProjects();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

export default CircularScroll;
