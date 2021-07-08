import throttle from './throttle';
import gsap from 'gsap';

const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const getNextPrev = () => {
  const activeSlide = document.querySelector('.slide.active');
  const activeIdx = slides.indexOf(activeSlide);
  let next, prev;

  if (activeIdx === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeIdx + 1];
  }
  if (activeIdx === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIdx - 1];
  }
  return [next, prev];
};

// setTimeout(() => {
//   const activeSlide = document.querySelector('.slide.active');
//   const activeIdx = slides.indexOf(activeSlide);
//   const [next, prev] = getNextPrev();
//   slides.forEach((s, i) => {
//     if(i!== activeIdx && s !== next & s !== prev) {
//       gsap.set(s.children[0], { xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100 });
//     }
//   });
// },0);

const getPosition = () => {
  const activeSlide = document.querySelector('.slide.active');
  const activeIdx = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();
  slides.forEach((s, i) => {
    if (i === activeIdx) {
      gsap.set(s, { xPercent: 100 });

    } else {
      if (s === prev) {
        // gsap.set(s, { xPercent: -100 });
      } else {
        if (s === next) {
          gsap.set(s, { xPercent: 95 });
        } else {
          gsap.set(s, { xPercent: 100 });
        }
      }
    }


    // s.style.transform =
    //   `translateX(${i === activeIdx ? 0 :  s === prev ? '-100%' :  s === next? `95%`: `100%`})`;
    // i === activeIdx || s === next ? s.classList.add('top') : s.classList.remove('top');
    //   s.style.zIndex = `${i === activeIdx? 5 : s === prev ? 3 : s === next? 10 : 0}`;

    // setTimeout(() => {
    //   s.children[0].style.transform = `translateX(${i === activeIdx ?
    //     `${((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100}%` :
    //     s === prev ? '0' :
    //       s === next? `0`: `0`})`;
    // }, 0);
  });
};



getPosition();
const goToNextSlide = () => {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();

  getPosition();
  activeSlide.classList.remove('active');
  next.classList.add('active');

  gsap.to(activeSlide, { xPercent: 0 });
  gsap.to(activeSlide.children[0], { xPercent: ((window.innerWidth - activeSlide.children[0]?.clientWidth) / (2 * activeSlide.children[0]?.clientWidth)) * 100 });
  // gsap.to(next, { xPercent: 95 });
  gsap.to(prev, { xPercent: -100 })
  gsap.to(prev.children[0], { xPercent: 0 })
};

const goToPrevSlide = () => {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  activeSlide.classList.remove('active');
  prev.classList.add('active');
  getPosition();
};

let counter = 0;

const throttleClickNext = throttle(() => {
  goToNextSlide();

  counter = 0;
}, 550);

const throttleClickPrev = throttle(() => {
  goToPrevSlide();

  counter = 0;
}, 550);

const nextBtn = document.querySelector('[data-slider="next"]');
const prevBtn = document.querySelector('[data-slider="prev"]');

nextBtn.addEventListener('click', () => {
  counter++;
  goToNextSlide();
});

prevBtn.addEventListener('click', () => {
  counter++;
  goToPrevSlide();
});
