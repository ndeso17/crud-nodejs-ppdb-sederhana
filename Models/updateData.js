const dbPool = require("../Configs/database");

const getId = async (nisn) => {
  try {
    const queryGetId = `SELECT id FROM mendaftar WHERE nisn = ? LIMIT 1`;
    const [rows] = await dbPool.execute(queryGetId, [nisn]);

    if (rows.length === 0) {
      return null; // Jika tidak ada hasil, kembalikan null
    }

    return rows[0].id; // Mengambil nilai id dari objek pertama
  } catch (error) {
    console.error("Error di getId:", error.message);
    throw error; // Lempar error agar ditangani oleh controller
  }
};

const updateData = async (res, datas) => {
  try {
    const { nisn, nama, jk, asalsekolah, minat, kontak, alamat } = datas;
    const id = await getId(nisn);
    const [existingData] = await dbPool.execute(
      "SELECT * FROM mendaftar WHERE id = ?",
      [id]
    );

    if (!existingData || existingData.length === 0) {
      return res.json({
        success: false,
        message: "Data siswa tidak ditemukan",
      });
    }
    const existing = existingData[0];

    // Bandingkan data baru dengan data existing
    const isChanged =
      existing.nisn !== nisn ||
      existing.nama !== nama ||
      existing.jenis_kelamin !== jk ||
      existing.asal_sekolah !== asalsekolah ||
      existing.minat_jurusan !== minat ||
      existing.kontak !== kontak ||
      existing.alamat !== alamat;

    if (!isChanged) {
      return res.json({
        success: false,
        message: "Tidak ada perubahan pada data",
      });
    }

    // Jika ada perubahan, lakukan update
    const query = `
      UPDATE mendaftar 
      SET nisn = ?, nama = ?, jenis_kelamin = ?, asal_sekolah = ?, minat_jurusan = ?, kontak = ?, alamat = ?
      WHERE id = ?
    `;
    const [result] = await dbPool.execute(query, [
      nisn,
      nama,
      jk,
      asalsekolah,
      minat,
      kontak,
      alamat,
      id,
    ]);

    if (result.affectedRows > 0) {
      return res.json({
        success: true,
        message: "Data berhasil diperbarui",
      });
    } else {
      return res.json({
        success: false,
        message: "Gagal memperbarui data",
      });
    }
  } catch (error) {
    console.error("Error update Data PPDB :", error.message);
    throw error;
  }
};

module.exports = updateData;
