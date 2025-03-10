const getAllData = require("../Models/getAllData");

const formatTanggal = (datetime) => {
  // Buat objek Date dari string datetime
  const date = new Date(datetime);

  // Daftar hari dalam bahasa Indonesia
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  // Daftar bulan dalam bahasa Indonesia
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Ambil komponen tanggal
  const namaHari = hari[date.getDay()];
  const tanggal = date.getDate();
  const namaBulan = bulan[date.getMonth()];
  const tahun = date.getFullYear();

  // Ambil jam dan menit, tambahkan padding jika perlu
  const jam = String(date.getHours()).padStart(2, "0");
  const menit = String(date.getMinutes()).padStart(2, "0");

  // Gabungkan menjadi format yang diinginkan
  return `${namaHari}, ${tanggal} ${namaBulan} ${tahun} - ${jam}:${menit}`;
};

const dashboard = async (req, res) => {
  try {
    const users = await getAllData(); // Ambil data dari model
    console.log("Users : ", users);

    // Format tanggal_daftar untuk setiap user
    const formattedUsers = users.map((user) => ({
      ...user,
      tanggal_daftar_formatted: formatTanggal(user.tanggal_daftar),
    }));

    return res.status(200).render("dashboard", { users: formattedUsers }); // Kirim data ke EJS dengan nama 'users'
  } catch (error) {
    const datas = {
      title: "Internal Error",
      description: "Terjadi kesalahan saat mengambil data dashboard!",
      keywords: "500",
    };
    return res.status(500).render("error", { datas });
  }
};

module.exports = dashboard;
