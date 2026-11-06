// Kalkulator Biaya Awal Hunian
const formKalkulator = document.getElementById("kalkulator-biaya");

// Fungsi untuk menghitung biaya awal hunian
formKalkulator.addEventListener("submit", function (event) {
  event.preventDefault();

  // Mengambil nilai input dari form
  const hargaSewa = parseFloat(document.getElementById("hargaSewa").value);
  const deposit = parseFloat(document.getElementById("depositHunian").value);
  const total = hargaSewa + deposit;

  // Menampilkan hasil perhitungan biaya awal hunian
  document.getElementById("hasilBiayaAwal").textContent =
    "Perkiraan biaya awal: Rp" + total.toLocaleString("id-ID");
});
