const dbPool = require("../Configs/database");

const saveData = async (res, datas) => {
  try {
    // Destructure data yang akan disimpan
    const { nisn, nama, jk, asalsekolah, minat, kontak, alamat } = datas;

    // Validasi data sebelum menyimpan (opsional, bisa dilakukan di controller)
    if (!nisn || !nama || !jk || !asalsekolah || !minat || !kontak || !alamat) {
      throw new Error("Semua field wajib diisi!");
    }

    // Query SQL untuk menyimpan data
    const querySaveData = `
      INSERT INTO mendaftar (nisn, nama, jenis_kelamin, asal_sekolah, minat_jurusan, kontak, alamat)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Parameter untuk query (menggunakan parameterized query untuk mencegah SQL injection)
    const values = [nisn, nama, jk, asalsekolah, minat, kontak, alamat];

    // Jalankan query
    const [result] = await dbPool.execute(querySaveData, values);

    // Periksa apakah data berhasil disimpan
    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Data berhasil disimpan!",
        insertId: result.insertId,
      };
    } else {
      throw new Error("Gagal menyimpan data!");
    }
  } catch (error) {
    console.error("Error di saveData:", error.message);

    // Jika error karena duplikat NISN (misalnya, jika NISN adalah unique key)
    if (error.code === "ER_DUP_ENTRY") {
      const datas = {
        title: "Error",
        description: "NISN sudah terdaftar!",
        keywords: "409",
      };
      return res.status(409).render("error", { datas });
    }

    // Error umum
    const datas = {
      title: "Internal Error",
      description: "Terjadi kesalahan saat menyimpan data!",
      keywords: "500",
    };
    return res.status(500).render("error", { datas });
  }
};

module.exports = saveData;
