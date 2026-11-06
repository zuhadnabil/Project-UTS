document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("home-search-form");
  const typeFilter = document.getElementById("home-type");
  const areaFilter = document.getElementById("home-area");
  const resetButton = document.getElementById("home-search-reset");
  const statusMessage = document.getElementById("home-search-status");
  const homes = document.querySelectorAll(".home-listing-item");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let visibleHomes = 0;

    homes.forEach(function (home) {
      const matchesType = typeFilter.value === "all" || home.dataset.type === typeFilter.value;
      const matchesArea = areaFilter.value === "all" || home.dataset.area === areaFilter.value;
      const matchesSearch = matchesType && matchesArea;

      home.classList.toggle("d-none", !matchesSearch);
      if (matchesSearch) visibleHomes++;
    });

    statusMessage.textContent = visibleHomes === 0
      ? "Belum ada hunian yang cocok. Coba pilihan lain."
      : "Menampilkan " + visibleHomes + " pilihan hunian.";

    document.getElementById("pilihan-hunian").scrollIntoView({ behavior: "smooth" });
  });

  resetButton.addEventListener("click", function () {
    typeFilter.value = "all";
    areaFilter.value = "all";

    homes.forEach(function (home) {
      home.classList.remove("d-none");
    });

    statusMessage.textContent = "Semua pilihan hunian ditampilkan.";
  });
});
