import VirtualScroll from 'virtual-scroll';
const scroller = new VirtualScroll();

const items = document.querySelectorAll('.item');
const itemWrappers = document.querySelectorAll('.item-wrapper');
const radius = document.querySelector('.circle-mock').offsetHeight / 2;
const radians = 2 * Math.PI / items.length;

let prevY;

const positionWrappers = () => {
  itemWrappers.forEach((wr, i) => {
    const alpha = Math.PI - (i * radians);

    wr.style.top = `${radius * Math.sin(0 / 360 + alpha)}px`;
    wr.style.left = `${radius * Math.cos(0 / 360 + alpha)}px`;
  });
};

const positionItems = (x, y) => {
  items.forEach((wr, i) => {
    const alpha = Math.PI - (i * radians);

    wr.style.transform = `translate(${radius * Math.sin(-y / 360)}px, ${radius * Math.cos(-y / 360)}px)`;
  });
};

const positionLinearEls = y => {
  const linear = document.querySelector('.rect-linear');
  const eased = document.querySelector('.rect-eased');

  console.log(prevY, y);
  linear.style.transform = `translateX(${y / 8}px)`;
  eased.style.transform = `translateX(${lerp(prevY / 8, y / 8, 0.0005)}px)`;

  prevY = y;
}

scroller.on(e => {
  positionItems(e.x, e.y);
  // positionLinearEls(e.y);
});

positionItems(0, 0);
positionWrappers();

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}
