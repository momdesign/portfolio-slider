function throttle(cb, interval) {
  let now = Date.now();
  return function() {
    if ((now + interval - Date.now()) < 0) {
      cb();
      now = Date.now();
    }
  }
}
export default throttle;
