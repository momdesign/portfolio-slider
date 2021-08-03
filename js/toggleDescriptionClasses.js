import gsap, {Power2} from 'gsap';

const dqs = document.querySelector.bind(document);

export const toggleDescriptionClasses = (time, isDetailsClose) => {
  const name = dqs('[data-more="name"]');
  const moreDetailsBtn = dqs('[data-animate="info"]');
  const header = dqs('[data-animate="header"]');
  const logo = dqs('[data-animate="intro-logo"]');

  const nameTimeline = gsap.timeline()
    .set(name, {maxWidth: "100vw"}, 0)
    .to(name, {x: "-200", duration:0.3}, 0)
    .set(name, {x: window.innerWidth * 0.37, y: - window.innerHeight - name.clientHeight}, ">")
    .to(name, {y: - window.innerHeight * 0.89 + name.clientHeight, duration: 1}, ">")
    .to(name, {opacity:1, duration: 0.1}, "<")
    .to(logo, {y: - window.innerHeight - name.clientHeight, duration: 0.3}, 0.1)
    .set(moreDetailsBtn, {opacity: 1})

  const hideName = gsap.to(name, {opacity:0, duration: 0.1, paused: true})

  !isDetailsClose
    ? (hideName.play())
    : (hideName.delay(0.25), hideName.play())
}
