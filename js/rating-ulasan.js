// Script untuk menangani ulasan dan peringkat hunian
const reviewForm = document.getElementById("review-form");
const reviewTemplate = document.getElementById("review-template");
const reviewList = document.getElementById("reviews-list");

// Fungsi untuk menambahkan ulasan baru ke daftar ulasan
reviewForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  // Mengambil nilai input dari form
  const name = document.getElementById("review-name").value.trim();
  const property = document.getElementById("review-property").value;
  const rating = Number(document.getElementById("review-rating").value);
  const comment = document.getElementById("review-comment").value.trim();
  const ratingLabels = ["", "Sangat Kurang", "Kurang", "Cukup", "Baik", "Sangat Baik"];

  // Membuat elemen ulasan baru dari template dan menambahkan ke daftar ulasan
  const newReview = reviewTemplate.content.cloneNode(true);
  newReview.querySelector("article").dataset.rating = rating;
  newReview.querySelector("[data-review-name]").textContent = name;
  newReview.querySelector("[data-review-property]").textContent = property;
  newReview.querySelector("[data-review-stars]").textContent = "★".repeat(rating) + "☆".repeat(5 - rating);
  newReview.querySelector("[data-review-rating]").textContent = rating + "/5 - " + ratingLabels[rating];
  newReview.querySelector("[data-review-comment]").textContent = comment;

  // review hasil form dan mereset form
  reviewList.prepend(newReview);
  updateRatingSummary();
  reviewForm.reset();
});

// 
function updateRatingSummary() {
  const reviews = reviewList.querySelectorAll("[data-rating]");
  let ratingTotal = 0;

  //
  reviews.forEach(function (review) {
    ratingTotal += Number(review.dataset.rating);
  });

  //
  const average = ratingTotal / reviews.length;
  const averageText = average.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  const roundedStars = Math.round(average);

  // mengambil id overall-rating 
  document.getElementById("overall-rating").textContent = averageText;
  const overallStars = document.getElementById("overall-stars");
  overallStars.textContent = "★".repeat(roundedStars) + "☆".repeat(5 - roundedStars);
  overallStars.setAttribute("aria-label", averageText + " dari 5 bintang");
  document.getElementById("review-count").textContent = "Dari " + reviews.length + " ulasan";
}
