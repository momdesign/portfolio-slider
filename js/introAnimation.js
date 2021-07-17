import gsap, {Power2} from "gsap";

const dqs = document.querySelector.bind(document);
const dqsa = document.querySelectorAll.bind(document);

const sliders = dqsa('.slider');
const logo = dqs('[data-animate="logo"]');
const introLogo = dqs('[data-animate="intro-logo"]');
let isIntroPlayed = false;

export const initIntroAnimation = onInit => {
  const tl = gsap.timeline({ paused: true })
    .from(sliders[0], { yPercent: 70, duration: 1.5, delay: 0.2, ease:Power2.easeInOut })
    .from(logo, {opacity: 0})
    .to(logo, {opacity: 1, delay: -0.3});
  const  tlLogo = gsap.timeline({paused: true})
    .from(introLogo, {
      y: window.innerHeight / 2 - window.innerWidth / 10,
      height: '10vw',
      duration: 1.5,
      ease:Power2.easeInOut})
    .to(introLogo, {opacity: 0, delay: -0.2});

  window.addEventListener('wheel', e => {
    if (isIntroPlayed || e.deltaY < 0) return;

    isIntroPlayed = true;
    tlLogo.play();
    tl.play().then( () => {
      onInit();
    });
  });
};
