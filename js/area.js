// script koordinat Kampus UKRI
const campusCenter = [-6.92667855, 107.62625748];

// untuk bagian kos, kontrakan, dan apartemen termasuk tipe, harga, dan lokasi (koordinat)
const housing = [
  {
    name: "Kos Seroja",
    type: "Kos",
    price: 950000,
    coordinates: [-6.9239, 107.6285]
  },
  {
    name: "Kos Melati",
    type: "Kos",
    price: 1250000,
    coordinates: [-6.925, 107.62]
  },
  {
    name: "Kontrakan Kenanga",
    type: "Kontrakan",
    price: 2800000,
    coordinates: [-6.929, 107.6235]
  },
  {
    name: "Apartemen Taman Kota",
    type: "Apartemen",
    price: 4100000,
    coordinates: [-6.932, 107.629]
  }
];

// memanggil id "map" dari div pada file html
const mapElement = document.getElementById("map");

if (window.L) {
  const areaMap = L.map(mapElement).setView(campusCenter, 15);

  // tampilan peta dengan max zoom 19 dan menampilkan copyright dari OpenStreetMap.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(areaMap);

  housing.forEach((listing) => {
    const marker = L.marker(listing.coordinates).addTo(areaMap);

    const price = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(listing.price);

    marker.bindPopup(
      "<strong>" + listing.name + "</strong><br>" +
      listing.type + "<br>" + price + " / bulan"
    );

    // Rute dimulai dari lokasi hunian menuju Kampus UKRI.
    L.Routing.osrmv1().route(
      [
        L.Routing.waypoint(L.latLng(listing.coordinates)),
        L.Routing.waypoint(L.latLng(campusCenter))
      ],
      (error, routes) => {
        if (error || !routes || !routes.length) {
          console.warn("Rute tidak dapat dimuat untuk " + listing.name, error);
          return;
        }

        L.polyline(routes[0].coordinates, {
          color: "#0d6efd",
          weight: 4,
          opacity: 0.8
        }).addTo(areaMap);
      }
    );
  });

  // Marker Kampus UKRI.
  L.marker(campusCenter)
    .addTo(areaMap)
    .bindTooltip("Kampus UKRI", {
      permanent: true,
      direction: "top",
      offset: [-15, 0],
      className: "campus-tooltip"
    });

  // Center peta tetap di Kampus UKRI dengan zoom level 15.
  areaMap.setView(campusCenter, 15);
} else {
  // jika koneksi internet tidak memuat Leaflet, maka akan menampilkan teks berikut
  mapElement.textContent =
    "Peta memerlukan koneksi internet untuk memuat Leaflet.";
}

// ini adalah bagian dari Highcharts untuk menampilkan grafik rata-rata harga per bulan
const chartElement = document.getElementById("rentChart");

if (window.Highcharts) {
  /* Bagian ini adalah konfigurasi grafik Highcharts untuk menampilkan rata-rata harga per bulan
     menggunakan algoritma pembagian dari 0 - 5.000.000 / 1.000.000 agar hasilnya menjadi 0,0 - 5,0
     lalu "return "Rp" + hasil dari pembagian dari 0 - 5.000.000 / 1.000.000 diakhiri dengan " jt";" sehingga hasilnya menjadi Rp0,0 jt - Rp5,0 jt dengan format 0,0
     karena nilai tertingginya adalah 4.100.000 maka menggunakan angka 5.000.000 agar grafiknya tidak terlalu panjang.
  */
  Highcharts.chart(chartElement, {
    chart: {
      type: "column"
    },

    title: {
      text: null
    },

    xAxis: {
      categories: ["Kos", "Kontrakan", "Apartemen"],
      title: {
        text: "Jenis hunian"
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: "Harga per bulan"
      },
      labels: {
        formatter() {
          return "Rp" +
            Highcharts.numberFormat(this.value / 1000000, 1) +
            " jt";
        }
      }
    },

    tooltip: {
      pointFormatter() {
        // ini adalah format harga per bulan
        const price = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0
        }).format(this.y);

        return "<b>" + price + "</b>";
      }
    },

    // bagian ini kredit, legend, dan konfigurasi grafik lainnya
    credits: {
      enabled: false
    },

    legend: {
      enabled: false
    },

    series: [
      {
        name: "Harga rata-rata",
        data: [1100000, 2800000, 4100000],
        colorByPoint: true,
        colors: ["#0d6efd", "#198754", "#6f42c1"]
      }
    ]
  });
} else {
  // jika koneksi internet tidak memuat Highcharts, maka akan menampilkan teks berikut
  chartElement.textContent =
    "Grafik memerlukan koneksi internet untuk memuat Highcharts.";
}
