export function initCarousel() {
  const viewport = document.querySelector(".section_5 .carousel-viewport");
  const slider = document.querySelector(".section_5 ul");

  if (!viewport || !slider) return;

  const slides = Array.from(slider.children);
  if (slides.length <= 1) return;

  // --- CONFIGURAÇÃO ---
  const TRANSITION_DURATION = 500;
  let currentIndex = 0;
  let isInteracting = false;
  let autoplayInterval;

  // --- FUNÇÃO PRINCIPAL DE MOVIMENTO ---
  const goToSlide = (index) => {
    isInteracting = true;

    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    currentIndex = index;

    const targetSlide = slides[currentIndex];
    const viewportCenter = viewport.offsetWidth / 2;
    const slideCenter = targetSlide.offsetWidth / 2;
    const slideLeft = targetSlide.offsetLeft;
    const offset = viewportCenter - slideLeft - slideCenter;

    slider.style.transform = `translateX(${offset}px)`;

    slides.forEach((slide, i) => {
      slide
        .querySelector(".card")
        .classList.toggle("is-active", i === currentIndex);
    });

    setTimeout(() => {
      isInteracting = false;
    }, TRANSITION_DURATION);
  };

  // --- AUTOPLAY ---
  const startAutoplay = () => {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      if (!isInteracting) {
        goToSlide(currentIndex + 1);
      }
    }, 4000);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // =============================================================
  // --- INTERAÇÕES DO USUÁRIO (MODIFICADO PARA MOUSE E TOQUE) ---
  // =============================================================
  let isDown = false;
  let startX;
  let initialTranslate;

  // --- FUNÇÕES GENÉRICAS DE DRAG ---
  function dragStart(e) {
    isDown = true;
    stopAutoplay();
    viewport.classList.add("is-dragging");
    // Verifica se é um evento de toque ou de mouse para pegar a coordenada X
    startX = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;

    const transformMatrix = window
      .getComputedStyle(slider)
      .getPropertyValue("transform");
    initialTranslate =
      transformMatrix === "none"
        ? 0
        : Number(transformMatrix.split(",")[4].trim());
    slider.classList.add("no-transition");
    e.preventDefault();
  }

  function dragging(e) {
    if (!isDown) return;
    // Previne o scroll vertical da página enquanto arrasta horizontalmente no mobile
    if (e.type.includes("touch")) {
      e.preventDefault();
    }
    const currentX = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;
    const walk = currentX - startX;
    slider.style.transform = `translateX(${initialTranslate + walk}px)`;
  }

  function dragEnd(e) {
    if (!isDown) return;
    isDown = false;
    viewport.classList.remove("is-dragging");
    slider.classList.remove("no-transition");

    // Para o touchend, a coordenada está em 'changedTouches'
    const endX = e.type.includes("touch") ? e.changedTouches[0].pageX : e.pageX;
    const walk = endX - startX;
    const slideWidth = slides[0].offsetWidth;

    if (Math.abs(walk) > slideWidth / 4) {
      goToSlide(currentIndex + (walk < 0 ? 1 : -1));
    } else {
      goToSlide(currentIndex);
    }

    startAutoplay();
  }

  // --- ADICIONA OS EVENT LISTENERS ---

  // Para Desktop (Mouse)
  viewport.addEventListener("mousedown", dragStart);
  window.addEventListener("mousemove", dragging);
  window.addEventListener("mouseup", dragEnd);

  // Para Mobile (Toque)
  viewport.addEventListener("touchstart", dragStart);
  window.addEventListener("touchmove", dragging);
  window.addEventListener("touchend", dragEnd);

  // --- OUTRAS INTERAÇÕES (TECLADO, MOUSE HOVER) ---

  // Navegação por Teclado
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (isInteracting) return;
      stopAutoplay();
      goToSlide(currentIndex + (e.key === "ArrowRight" ? 1 : -1));
      setTimeout(startAutoplay, 3000);
    }
  });

  // Pausar com o mouse
  viewport.addEventListener("mouseenter", stopAutoplay);
  viewport.addEventListener("mouseleave", startAutoplay);

  // --- INICIALIZAÇÃO ---
  goToSlide(0);
  startAutoplay();
}
