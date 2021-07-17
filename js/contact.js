import gsap, { Power2 } from 'gsap';

const contact = document.querySelector('[data-animate="contact"]');
const contactWrapper = document.querySelector('[data-animate="contact-wrapper"]');
let isContactOpen = false;
const tl = gsap.timeline({ paused: true });

export const openContacts = onOpen => {
  console.log(1);
  isContactOpen = true;
  tl.restart();
  tl.play();
  onOpen();
};

export const closeContacts = onClose => {
  isContactOpen = false;
  gsap.to(contact, {yPercent: 100, duration: 0.8, ease: Power2.easeIn});
  onClose();
};

tl.from(contact, {yPercent: 100, duration: 0.8, ease: Power2.easeOut})
  .from(contactWrapper, {opacity: 0, duration: 0.8});
