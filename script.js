
const hargaProduk = {
    "Kaos Polos": 35000,
    "Kaos Sablon Custom": 55000,
    "Hoodie Custom": 120000
};

const produk = document.getElementById("produk");
const jumlah = document.getElementById("jumlah");
const total = document.getElementById("total");
const form = document.getElementById("formPesanan");
const tabel = document.getElementById("tabelPesanan");

let nomor = 0;

function rupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// Menghitung estimasi harga
function hitungTotal() {
    const harga = hargaProduk[produk.value] || 0;
    const banyak = Math.max(1, Number(jumlah.value) || 1);

    total.textContent = rupiah(harga * banyak);

    return harga * banyak;
}

produk.addEventListener("change", hitungTotal);
jumlah.addEventListener("input", hitungTotal);

// Memilih produk dari katalog
function pilihProduk(namaProduk) {
    produk.value = namaProduk;
    hitungTotal();

    document.getElementById("pesan").scrollIntoView({
        behavior: "smooth"
    });
}

// Menambahkan pesanan ke tabel
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const jenis = produk.value;
    const banyak = Math.max(1, Number(jumlah.value) || 1);
    const catatan = document.getElementById("catatan").value.trim();
    const harga = hitungTotal();

    if (!nama || !whatsapp || !jenis) {
        alert("Mohon lengkapi semua data wajib.");
        return;
    }

    // Hapus pesan awal pada tabel
    if (nomor === 0) {
        tabel.innerHTML = "";
    }

    nomor++;

    const baris = tabel.insertRow();

    const data = [
        nomor,
        nama,
        whatsapp,
        jenis,
        banyak + " pcs",
        rupiah(harga),
        catatan || "-"
    ];

    data.forEach(function(nilai) {
        const sel = baris.insertCell();
        sel.textContent = nilai;
    });

    alert("Pesanan berhasil ditambahkan!");

    form.reset();
    jumlah.value = 1;
    hitungTotal();

    document.getElementById("daftar").scrollIntoView({
        behavior: "smooth"
    });
});

hitungTotal();
