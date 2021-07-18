import gsap, {Power2} from "gsap";

const dqs = document.querySelector.bind(document);
const dqsa = document.querySelectorAll.bind(document);

const sliders = dqsa('.slider');
const introLogo = dqs('[data-animate="intro-logo"]');
let xDown, yDown, xDiff, yDiff, isIntroStarted = false;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function onTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function onTouchMove(evt) {
  if ( !xDown || !yDown ) {
    return;
  }

  console.log(xDiff, yDiff);

  xDiff = xDown - evt.touches[0].clientX;
  yDiff = yDown - evt.touches[0].clientY;
}

function onTouchEnd(cb) {
  return () => {
    if (Math.abs(xDiff) < Math.abs(yDiff) && yDiff > 80 && !isIntroStarted) {
      cb();
    }

    xDown = null;
    yDown = null;
    xDiff = null;
    yDiff = null;
  };
}

export const initIntroAnimation = onAfterPlayed => {
  const scale = 0.25;
  const marginTop = window.innerWidth * 0.027;
  const tl = gsap.timeline({ paused: true })
    .from(sliders[0], { yPercent: 70, duration: 1.5, delay: 0.2, ease:Power2.easeInOut });
  const  tlLogo = gsap.timeline({paused: true})
    .to(introLogo, {
      scale: 0.25,
      y: - window.innerHeight / 2 + introLogo.clientHeight * scale / 2 + marginTop,
      duration: 1.5,
      ease: Power2.easeInOut
    });

  const onStart = () => {
    isIntroStarted = true;

    introLogo.classList.add('intro__letters--short');
    tlLogo.play();
    tl.play().then( () => {
      onAfterPlayed();
    });
  };

  window.addEventListener('wheel', e => {
    if (isIntroStarted || e.deltaY < 0) return;
    onStart();
  });
  window.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('touchend', onTouchEnd(onStart));
};
