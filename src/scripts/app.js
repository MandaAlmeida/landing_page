// Importa a função do carrossel do outro arquivo
import { initCarousel } from "./components/carousel.js";
import { header } from "./components/header.js";
import { listItens } from "./components/listItens.js";
import { pricingToggle } from "./components/pricingToggle.js";

// Executa a função quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  console.log("App started!");

  // Inicia a lógica do carrossel
  initCarousel();
  pricingToggle();
  listItens();
  header();
});
