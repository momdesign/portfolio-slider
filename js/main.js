import gsap from 'gsap';

import throttle from './throttle';

const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const getNextPrev = () => {
  const activeSlide = document.querySelector('.slide.active');
  const activeIdx = slides.indexOf(activeSlide);
  let next, prev, nextAfterNext;

  if (activeIdx === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeIdx + 1];
  }
  if(activeIdx === slides.length - 2){
    nextAfterNext = slides[0];
  } else {
    if(activeIdx === slides.length - 1){
      nextAfterNext = slides[1];
    } else {
      nextAfterNext = slides[activeIdx + 2];
    }
  }

  if (activeIdx === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIdx - 1];
  }
  return [next, prev, nextAfterNext];
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
  });
};

setTimeout( setInitialSliderPosition, 0);

function goToNextSlide() {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev, nextAfterNext] = getNextPrev();
  const activeIdx = slides.indexOf(activeSlide);

  slides.forEach((s, i ) => {
    if (i === activeIdx) {
          gsap.to(s,  {xPercent: -100, duration: 0.7, ease: 'ease'});
      } else {
      if (s === next) {
        gsap.to(s, { xPercent: 0, duration: 0.7, ease: 'ease' });
        gsap.to(s.children[0],  { xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100  });
      } else {
       if(s === nextAfterNext) {
         gsap.to(s,  { xPercent: 95, duration: 0.7, ease: 'ease', delay: 0.2 });
       } else {
         gsap.set(s, { xPercent: 100 });
         gsap.set(s.children[0], { xPercent: 0});
       }
      }
    }
  });
  activeSlide.classList.remove('active');
  next.classList.add('active');
};

slides.forEach((s, i ) => {
  s.addEventListener('click', () => onSlideClick(s, i));
});

const onSlideClick = (s, i) => {
  const activeSlide = document.querySelector('.slide.active');
  const activeIdx = slides.indexOf(activeSlide);

  const [next, prev, nextAfterNext] = getNextPrev();
  if (next === s || i ===  slides.length - 1) {
    goToNextSlide();
  }
};

function goToPrevSlide() {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  const activeIdx = slides.indexOf(activeSlide);

 slides.forEach((s, i) => {
   if (i === activeIdx) {
     gsap.to(s,  {xPercent: 95, duration: 0.7, ease: 'ease'});
     gsap.to(s.children[0], {xPercent: 0});
   } else {
     if(s === prev) {
       gsap.fromTo(s,  {xPercent: -100 }, { xPercent: 0, duration: 0.7, ease: 'ease' });
       gsap.to(s.children[0], { xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100  });
     } else {
       if (s === next) {
         gsap.to(s,  { xPercent: 100, duration: 0.3, ease: 'ease' });
       } else {
         gsap.set(s, { xPercent: 100 });
         gsap.set(s.children[0], { xPercent: 0});
       }
     }
   }
 });
  activeSlide.classList.remove('active');
  prev.classList.add('active');
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

window.addEventListener('keydown', e => {
 if(e.key === 'ArrowLeft') throttleClickPrev();
 if(e.key === 'ArrowRight') throttleClickNext();
})
