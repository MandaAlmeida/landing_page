export function header() {
  const header = document.querySelector("#header");
  const stickyThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > stickyThreshold) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  };

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  function scrollToSection(event) {
    event.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  internalLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });
  window.addEventListener("scroll", handleScroll);
}
