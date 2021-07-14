import gsap, { Power2 } from 'gsap';

import throttle from './utils/throttle';

class Slider {
  constructor(projectId) {
    this.slider = document.querySelectorAll('.slider')[projectId];
    this.slides = [...this.slider.querySelectorAll('.slide')];
    this.nextBtn = this.slider.querySelector('[data-slider="next"]');
    this.prevBtn = this.slider.querySelector('[data-slider="prev"]');

    this.setInitialSliderPosition(300);

    const throttleClickNext = throttle(() => this.goToNextSlide(), 300);
    const throttleClickPrev = throttle(() => this.goToPrevSlide(), 300);

    this.nextBtn?.addEventListener('click', throttleClickNext);
    this.prevBtn?.addEventListener('click', throttleClickPrev);

    window.addEventListener('keydown', e => {
      if(e.key === 'ArrowLeft') throttleClickPrev();
      if(e.key === 'ArrowRight') throttleClickNext();
    });

    this.slides.forEach((s, i ) => {
      s.addEventListener('click', () => this.onSlideClick(s, i));
    });
  }

  getNextPrev () {
    const activeSlide = this.slider.querySelector('.active');
    const activeIdx = this.slides.indexOf(activeSlide);
    let next, prev, nextAfterNext;

    if (activeIdx === this.slides.length - 1) {
      next = this.slides[0];
    } else {
      next = this.slides[activeIdx + 1];
    }
    if(activeIdx === this.slides.length - 2){
      nextAfterNext = this.slides[0];
    } else {
      if(activeIdx === this.slides.length - 1){
        nextAfterNext = this.slides[1];
      } else {
        nextAfterNext = this.slides[activeIdx + 2];
      }
    }

    if (activeIdx === 0) {
      prev = this.slides[this.slides.length - 1];
    } else {
      prev = this.slides[activeIdx - 1];
    }
    return [next, prev, nextAfterNext];
  };

  setInitialSliderPosition (time) {
    setTimeout(() => {
      const activeSlide = this.slider.querySelector('.active');
      const activeIdx = this.slides.indexOf(activeSlide);
      const [next, prev] = this.getNextPrev();

      this.slides.forEach((s, i) => {
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
    }, time);
  };

  goToNextSlide() {
    const activeSlide = this.slider.querySelector('.active');
    const activeIdx = this.slides.indexOf(activeSlide);
    const [next, prev, nextAfterNext] = this.getNextPrev();

    this.slides.forEach((s, i ) => {
      if (i === activeIdx) {
        gsap.fromTo(s,  {xPercent: 0}, {xPercent: -100, duration: 0.8, ease: 'ease' });
      } else {
        if (s === next) {
          gsap.fromTo(s, {xPercent: 95},{ xPercent: 0, duration: 0.8, ease: Power2.easeOut });
          gsap.fromTo(s.children[0], {xPercent: 0}, { xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100  });
        } else {
          if(s === nextAfterNext) {
            gsap.fromTo(s,  {xPercent: 100},{ xPercent: 95, duration: 0.65, ease: 'ease', delay: 0.45 });
          } else {
            gsap.set(s, { xPercent: 100 });
            gsap.set(s.children[0], { xPercent: 0});
          }
        }
      }
    });
    activeSlide.classList.remove('active');
    next.classList.add('active');
  }

  goToPrevSlide() {
    const activeSlide = this.slider.querySelector('.active');
    const activeIdx = this.slides.indexOf(activeSlide);
    const [next, prev, nextAfterNext] = this.getNextPrev();

    this.slides.forEach((s, i) => {
      if (i === activeIdx) {
        gsap.to(s,  {xPercent: 95, duration: 0.7, ease: Power2.easeOut});
        gsap.to(s.children[0], {xPercent: 0});
      } else {
        if(s === prev) {
          gsap.fromTo(s,  {xPercent: -100 }, { xPercent: 0, duration: 0.7, ease: Power2.easeOut });
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
  }

  onSlideClick (s, i) {
    const [next, prev, nextAfterNext] = this.getNextPrev();
    if (next === s || i ===  this.slides.length - 1) {
      this.goToNextSlide();
    }
  };
}


export default Slider;

