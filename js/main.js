
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

const getPosition = () => {
  const activeSlide = document.querySelector('.slide.active');
  const activeIdx = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();
  slides.forEach((s, i) => {
    s.style.transform =
      `translateX(${i === activeIdx ? 0 :  s === prev ? '-100%' :  s === next? `95%`: `100%`})`;
    i === activeIdx || s === next ? s.classList.add('top') : s.classList.remove('top');
      s.style.zIndex = `${i === activeIdx? 5 : s === prev ? 3 : s === next? 10 : 0}`;

    setTimeout(() => {
      s.children[0].style.transform = `translateX(${i === activeIdx ?
        `${((window.innerWidth - s.children[0]?.clientWidth) / (2 * s.children[0]?.clientWidth)) * 100}%` :
        s === prev ? '0' :
          s === next? `0`: `0`})`;
    }, 0);
  });
};

getPosition();
const goToNextSlide = () => {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  activeSlide.classList.remove('active');
  next.classList.add('active');
  getPosition();
};
const goToPrevSlide = () => {
  const activeSlide = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  activeSlide.classList.remove('active');
  prev.classList.add('active');
  getPosition();
};

nextBtn = document.querySelector('[data-slider="next"]');
prevBtn = document.querySelector('[data-slider="prev"]');
nextBtn.addEventListener('click', () => {
  goToNextSlide();
});

prevBtn.addEventListener('click', () => {
  console.log('prev');
  goToPrevSlide();
});
