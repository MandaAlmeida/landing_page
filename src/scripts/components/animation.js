export function animation() {
  const elementsToReveal = document.querySelectorAll(".reveal-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );

  elementsToReveal.forEach((element) => {
    observer.observe(element);
  });
}
