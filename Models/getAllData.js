const dbPool = require("../Configs/database");

const getAllData = async () => {
  try {
    // const queryGetAllData = `SELECT * FROM mendaftar`;
    const queryGetAllData = `SELECT nisn, nama, jenis_kelamin AS jk, asal_sekolah AS asalsekolah, minat_jurusan AS minat, kontak, alamat, created_at AS tanggal_daftar FROM mendaftar;`;
    const [rows] = await dbPool.execute(queryGetAllData);
    return rows;
  } catch (error) {
    console.error("Error di getAllData:", error.message);
    throw error; // Lempar error agar ditangani oleh controller
  }
};

module.exports = getAllData;
