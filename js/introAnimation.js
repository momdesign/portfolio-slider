import gsap, {Power2} from "gsap";

const dqs = document.querySelector.bind(document);
const dqsa = document.querySelectorAll.bind(document);

const sliders = dqsa('.slider');
const logo = dqs('[data-animate="logo"]');
const introLogo = dqs('[data-animate="intro-logo"]');
let isIntroPlayed = false;

export const initIntroAnimation = onInit => {
  const tl = gsap.timeline({ paused: true })
    .from(sliders[0], { yPercent: 70, duration: 1.2, delay: 0.15, ease:Power2.easeInOut })
  const  bigLogoAnimation = gsap.from(introLogo, {
      y: window.innerHeight / 2 + window.innerWidth / 20,
      height: '10vw',
      duration: 1.2,
      ease:Power2.easeInOut}).paused(true);
  const smallLogoAnimation = gsap.from(logo, {y: - window.innerWidth / 10, opacity: 0, delay: 0.4}).paused(true);

  window.addEventListener('wheel', e => {
    if (isIntroPlayed || e.deltaY < 0) return;
    isIntroPlayed = true;
    bigLogoAnimation.play();
    smallLogoAnimation.play();

    tl.play().then( () => {
      onInit();
    });
  });
};
