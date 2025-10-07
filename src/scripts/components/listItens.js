export function listItens() {
  const featureListContainers = document.querySelectorAll(
    ".feature-list-container"
  );

  // Itera sobre cada um, caso você tenha vários na mesma página
  featureListContainers.forEach((container) => {
    const showMoreBtn = container.querySelector(".btn-show-more");
    const showLessBtn = container.querySelector(".btn-show-less");

    // Verifica se os botões existem dentro do container
    if (showMoreBtn && showLessBtn) {
      showMoreBtn.addEventListener("click", () => {
        container.classList.add("is-expanded");
      });

      showLessBtn.addEventListener("click", () => {
        container.classList.remove("is-expanded");
      });
    }
  });
}
