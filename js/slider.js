import gsap, { Power2 } from 'gsap';

import throttle from './utils/throttle';

class Slider {
  constructor(projectId) {
    this.slider = document.querySelectorAll('.slider')[projectId];
    this.slides = [...this.slider.querySelectorAll('.slide')];
    this.nextBtns = this.slider.querySelectorAll('[data-slider="next"]');
    this.prevBtns = this.slider.querySelectorAll('[data-slider="prev"]');
    this.isSliderOpen = false;

    this.setInitialSliderPosition(400);

    const throttleClickNext = throttle(() => this.goToNextSlide(), 400);
    const throttleClickPrev = throttle(() => this.goToPrevSlide(), 400);

    window.addEventListener('keydown', e => {
      if(e.key === 'ArrowLeft') throttleClickPrev();
      if(e.key === 'ArrowRight') throttleClickNext();
    });
    window.addEventListener('resize', () => this.setInitialSliderPosition(400));

    this.nextBtns.forEach(el => el?.addEventListener('click', throttleClickNext));
    this.prevBtns.forEach(el => el?.addEventListener('click', throttleClickPrev));
  }

  getNextPrev() {
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

  setInitialSliderPosition(time) {
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
              gsap.set(s, { xPercent: 110 });
            } else {
              gsap.set(s, { xPercent: 110 });
              gsap.set(s.children[0], { xPercent: 0});
            }
          }
        }
      });
    }, time);
  };

  onSliderToggle(time, isOpen) {
    const [next] = this.getNextPrev();
    isOpen ? gsap.to(next, {xPercent: 95, delay: time , duration: 0.8}) : gsap.to(next, {xPercent: 105, delay: time, duration: 0.5});
  }

  goToNextSlide() {
    if(this.isSliderOpen){
      const activeSlide = this.slider.querySelector('.active');
      const activeIdx = this.slides.indexOf(activeSlide);
      const [next, , nextAfterNext] = this.getNextPrev();

      this.slides.forEach((s, i ) => {
        if (i === activeIdx) {
          gsap.fromTo(s,  { xPercent: 0 }, { xPercent: -100, duration: 0.8 });
        } else {
          if (s === next) {
            gsap.fromTo(s, { xPercent: 95, opacity: 1 },{ xPercent: 0 });
            gsap.fromTo(s.children[0], { xPercent: 0 }, { xPercent: ((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100 });
          } else {
            if(s === nextAfterNext) {
              gsap.fromTo(s,  { xPercent: 110 },{ xPercent: 95 });
            } else {
              gsap.set(s, { xPercent: 110 });
              gsap.set(s.children[0], { xPercent: 0 });
            }
          }
        }
      });
      activeSlide.classList.remove('active');
      next.classList.add('active');
    }
  }

  goToPrevSlide() {
    if(this.isSliderOpen) {
      const activeSlide = this.slider.querySelector('.active');
      const activeIdx = this.slides.indexOf(activeSlide);
      const [next, prev] = this.getNextPrev();

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
              gsap.to(s,  { xPercent: 110, duration: 0.3, ease: 'ease' });
            } else {
              gsap.set(s, { xPercent: 110 });
              gsap.set(s.children[0], { xPercent: 0});
            }
          }
        }
      });
      activeSlide.classList.remove('active');
      prev.classList.add('active');
    }
  }
}

export default Slider;
