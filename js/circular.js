import VirtualScroll from 'virtual-scroll';

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

class CircularScroll {
  constructor() {
    this.scroller = new VirtualScroll();
    this.projects = document.querySelectorAll('.project');
    this.projectWrappers = document.querySelectorAll('.project-wrapper');
    this.radius = document.querySelector('.circular-wrapper').offsetHeight / 2;
    this.radians = 2 * Math.PI / this.projects.length;
    this.y = 0;
    this.easedY = 0;

    this.scroller.on(e => {
      this.y = e.y / 8;
    });
  }

  positionWrappers() {
    this.projectWrappers.forEach((wr, i) => {
      const alpha = Math.PI - (i * this.radians);

      wr.style.left = `${this.radius * Math.sin(alpha)}px`;
      wr.style.top = `${this.radius * Math.cos(alpha) - (window.innerHeight / 2)}px`;
    });
  };

  render() {
    this.easedY = lerp(this.easedY, this.y, 0.05);
    const top = this.radius * Math.sin(this.easedY / 360);
    const left = this.radius * Math.cos(this.easedY / 360) - this.radius;

    this.positionWrappers();

    this.projects.forEach(pr => {
      pr.style.transform =
        `translate3d(${top}px, ${left}px, 0px)`;
    });

    window.requestAnimationFrame(this.render.bind(this));
  }
}

export default CircularScroll;
