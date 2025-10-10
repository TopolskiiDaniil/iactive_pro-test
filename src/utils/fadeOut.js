export function fadeOut(el, duration = 500) {
  if (!el) return;

  el.style.transition = `opacity ${duration}ms ease-in, transform ${duration}ms ease-in`;
  el.style.opacity = "1";
  el.style.transform = "scale(1)";

  requestAnimationFrame(() => {
    el.style.opacity = "0";
    el.style.transform = "scale(0.95)";
  });

  return new Promise((resolve) => {
    const handler = () => {
      el.removeEventListener("transitionend", handler);
      resolve();
    };
    el.addEventListener("transitionend", handler);
  });
}
