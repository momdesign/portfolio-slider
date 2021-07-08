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

const setInitialSliderPosition = () => {
  const activeSlide = document.querySelector('.slide.active');
  const activeIdx = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();
  slides.forEach((s, i) => {
    if (i === activeIdx) {
      gsap.set(s, { xPercent: 0 });
      gsap.set(s.children[0], { xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100  });

    } else {
      if (s === prev) {
        gsap.set(s, { xPercent: -100 });
      } else {
        if (s === next) {
          gsap.set(s, { xPercent: 95 });
        } else {
          gsap.set(s, { xPercent: 100 });
          gsap.set(s.children[0], { xPercent: 0});
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


setTimeout( setInitialSliderPosition, 0);

const goToNextSlide = () => {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  const activeIdx = slides.indexOf(activeSlide);

  activeSlide.classList.remove('active');
  next.classList.add('active');

  slides.forEach((s, i) => {
    if (i === activeIdx) {
      gsap.fromTo(s, { xPercent: 95 }, {xPercent: 0});
      gsap.fromTo(s.children[0], {xPercent: 0},{ xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100  });
    } else {
      if (s === prev) {
        gsap.fromTo(s, { xPercent: 0 }, { xPercent: -100 });
      } else {
        if (s === next) {
          gsap.fromTo(s, {xPercent: 100}, { xPercent: 95 });
        } else {
          gsap.set(s, { xPercent: 100 });
          gsap.set(s.children[0], { xPercent: 0});
        }
      }
    }
  });
};

const goToPrevSlide = () => {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  const activeIdx = slides.indexOf(activeSlide);

  activeSlide.classList.remove('active');
  prev.classList.add('active');

  slides.forEach((s, i) => {
    if (i === activeIdx) {
      gsap.fromTo(s, { xPercent: -100 }, {xPercent: 0});
      gsap.fromTo(s.children[0], {xPercent: 0},{ xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100  });
    } else {
      if (s === prev) {
        gsap.fromTo(s, { xPercent: -100 }, { xPercent: -100 });
      } else {
        if (s === next) {
          gsap.fromTo(s, {xPercent: 0}, { xPercent: 95 });
          gsap.fromTo(s.children[0], { xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100  }, {xPercent: 0});
        } else {
          gsap.set(s, { xPercent: 100 });
          gsap.set(s.children[0], { xPercent: 0});
        }
      }
    }
  });
};


const throttleClickNext = throttle(() => {
  goToNextSlide();
}, 200);

const throttleClickPrev = throttle(() => {
  goToPrevSlide();

}, 200);

const nextBtn = document.querySelector('[data-slider="next"]');
const prevBtn = document.querySelector('[data-slider="prev"]');

nextBtn.addEventListener('click', () => {
  throttleClickNext();
});

prevBtn.addEventListener('click', () => {
  throttleClickPrev();
});
