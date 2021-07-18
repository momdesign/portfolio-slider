import gsap, {Power2} from 'gsap';

const dqs = document.querySelector.bind(document);
const dqsa = document.querySelectorAll.bind(document);

class IntroAnimation {
  constructor(onAfterPlayed) {
    this.onAfterPlayed = onAfterPlayed;
    this.sliders = dqsa('.slider');
    this.introLogo = dqs('[data-animate="intro-logo"]');
    this.xDown = 0;
    this.yDown = 0;
    this.xDiff = 0;
    this.yDiff = 0;
    this.isIntroStarted = false;
    this.tl = gsap.timeline({ paused: true })
      .from(this.sliders[0], { yPercent: 70, duration: 1.5, delay: 0.2, ease:Power2.easeInOut });
    this.tlLogo = gsap.timeline({paused: true})
      .to(this.introLogo, {
        scale: 0.25,
        y: - window.innerHeight / 2 + this.introLogo.clientHeight * 0.25 / 2 + window.innerWidth * 0.027,
        duration: 1.5,
        ease: Power2.easeInOut
      });
  }

  static getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  onTouchStart(evt) {
    const firstTouch = IntroAnimation.getTouches(evt)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  onTouchEnd(cb) {
    return () => {
      if (Math.abs(this.xDiff) < Math.abs(this.yDiff) && this.yDiff > 80 && !this.isIntroStarted) {
        cb();
      }

      this.xDown = null;
      this.yDown = null;
      this.xDiff = null;
      this.yDiff = null;
    };
  }

  onTouchMove(evt) {
    if ( !this.xDown || !this.yDown ) {
      return;
    }

    this.xDiff = this.xDown - evt.touches[0].clientX;
    this.yDiff = this.yDown - evt.touches[0].clientY;
  }

  start() {
    this.isIntroStarted = true;

    this.introLogo.classList.add('intro__letters--short');
    this.tlLogo.play();
    return this.tl.play().then( () => {
      this.onAfterPlayed();
    });
  }

  init() {
    window.addEventListener('wheel', e => {
      if (this.isIntroStarted || e.deltaY < 0) return;
      this.start();
    });
    window.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd(this.start));
  }
}

export default IntroAnimation;
