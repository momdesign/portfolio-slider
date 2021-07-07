import VirtualScroll from 'virtual-scroll';
const scroller = new VirtualScroll();

const items = document.querySelectorAll('.item');
const radius = document.querySelector('.circle-mock').offsetHeight / 2;
const radians = 2 * Math.PI / items.length;

let prevY;

const positionItems = (x, y) => {
  const easedY = lerp(prevY / 6, y / 6, 0.001);

  items.forEach((item, i) => {
    const realY = i % 2 === 0 ? easedY : y / 6;
    const alpha = Math.PI - (i * radians);

    item.style.color = i % 2 ? 'red' : 'green';

    item.style.transform = `translate(${radius * Math.sin(-realY / 360 + alpha)}px, ${radius * Math.cos(-realY / 360 + alpha)}px)`;
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
  positionLinearEls(e.y);
});

positionItems(0, 0);

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}
