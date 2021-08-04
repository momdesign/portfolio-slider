import gsap, {Power2} from 'gsap';

const dqs = document.querySelector.bind(document);

class IntroAnimation {
  constructor() {
    this.introLogo = dqs('[data-animate="intro-logo"]');
    this.xDown = 0;
    this.yDown = 0;
    this.xDiff = 0;
    this.yDiff = 0;
    this.isIntroStarted = false;
    this.tlNyc = gsap.timeline({defaults:{ease:Power2.easeInOut}, paused: true})
      .to('[data-logo-nyc]', {
        duration: 1,
        y: - window.innerHeight * 0.45,

      }, 0)
      .to('[data-logo-nyc]', {
        opacity: 0,
        duration: 0.4,
        delay: -0.8
      });
    this.tlLogo = gsap.timeline({defaults:{ease:Power2.easeInOut}, paused: true})
      .to('svg', {
        scale: 0.3,
        duration: 0.3,
        y: - window.innerHeight * 0.45,
      }, 0)
      .fromTo('svg [id="M2"], svg [id="O"], svg [id="E"], svg [id="S"], svg [id="I"], svg [id="G"], svg [id="N"]', {
        opacity: 1}, {opacity: 0, duration: 0.1}, 0.13)
      .fromTo('svg [id="N-small"], svg [id="Y"], svg [id="C"]', {
        opacity: 0}, {opacity: 1, duration: 0.15}, 0.12)
      .to('svg [id="M"]', {xPercent: "+165", duration: 0.15}, 0.12)
      .to('svg [id="D"]', {xPercent: "-40", duration: 0.15}, 0.12);
    this.projectInfoAnimation = gsap.fromTo('[data-more="more"]', {opacity: 0}, {opacity: 1, duration: 1, delay: 0.8}).paused(true);
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

    this.tlLogo.timeScale(0.3)
    this.tlLogo.play();
    this.tlNyc.play();
    this.projectInfoAnimation.play();
  }

  init(cb) {
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
