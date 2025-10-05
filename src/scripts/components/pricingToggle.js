export function pricingToggle() {
  const monthly = document.querySelector(".section_6 .div_button .monthly");
  const yearly = document.querySelector(".section_6 .div_button .yearly");

  function buttonActiveSeletor() {
    const monthlyActive = monthly.classList.contains("active");

    if (monthlyActive) {
      monthly.classList.remove("active");
      yearly.classList.add("active");
    } else {
      monthly.classList.add("active");
      yearly.classList.remove("active");
    }
  }

  monthly.addEventListener("click", () => {
    buttonActiveSeletor();
  });

  yearly.addEventListener("click", () => {
    buttonActiveSeletor();
  });
}
