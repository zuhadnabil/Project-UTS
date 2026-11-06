// Perbandingan Hunian
document.addEventListener("DOMContentLoaded", function () {
  const dataTable = new simpleDatatables.DataTable("#tabelHunian", {
    searchable: true,
    sortable: false,
    paging: false,
    perPage: 4,
    perPageSelect: false,
    columns: [
      { select: 0, type: "string" },
      { select: 1, type: "string" },
      { select: 2, type: "string" },
      { select: 3, type: "string" },
      { select: 4, type: "string" },
      { select: 5, type: "string" },
      { select: 6, type: "string" },
      { select: 7, type: "string" }
    ]
  });

  // Bagian ini untuk menambahkan opsi perbandingan hunian baru ke tabel
  const propertyForm = document.getElementById("property-form");
  const formStatus = document.getElementById("property-form-status");
  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0
  });

  // Fungsi untuk menambahkan opsi perbandingan hunian baru ke tabel
  propertyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Mengambil nilai input dari form
    const name = document.getElementById("property-name").value.trim();
    const type = document.getElementById("property-type").value;
    const price = Number(document.getElementById("property-price").value);
    const deposit = Number(document.getElementById("property-deposit").value);
    const area = document.getElementById("property-area").value.trim();
    const distance = Number(document.getElementById("property-distance").value);
    const availability = document.getElementById("property-availability").value.trim();
    const facilities = document.getElementById("property-facilities").value.trim();
    const distanceText = distance.toLocaleString("id-ID", {
      maximumFractionDigits: 1
    }) + " km";

    // Menambahkan data ke tabel perbandingan hunian
    dataTable.search("");
    dataTable.rows.add([
      name,
      type,
      "Rp" + rupiahFormatter.format(price),
      "Rp" + rupiahFormatter.format(deposit),
      area,
      distanceText,
      availability,
      facilities
    ]);
    dataTable.page(dataTable.totalPages);

    // Menampilkan pesan status dan mereset form
    formStatus.textContent = "Opsi perbandingan berhasil ditambahkan sementara.";
    propertyForm.reset();
  });
});
