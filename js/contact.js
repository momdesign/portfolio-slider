import gsap, {Power2} from 'gsap';

import { circularScroll } from "./index";

const contact = document.querySelector('[data-animate="contact"]');
const contactWrapper = document.querySelector('[data-animate="contact-wrapper"]');
let isContactOpen = false;
const tl = gsap.timeline({ paused: true });

const onOpen = () => {
  isContactOpen = true;
  tl.restart();
  tl.play()
  circularScroll.stopScrollingHandler(isContactOpen);
};

const onClose = () => {
  isContactOpen = false;
  gsap.to(contact, {yPercent: 100, duration: 0.8, ease: Power2.easeIn});
  circularScroll.stopScrollingHandler(isContactOpen);
};

tl.from(contact, {yPercent: 100, duration: 0.8, ease: Power2.easeOut})
  .from(contactWrapper, {opacity: 0, duration: 0.8});

document.querySelector('[data-contact="open-button"]').addEventListener('click', onOpen);
document.querySelector('[data-contact="close-button"]').addEventListener('click', onClose);

export default {};
