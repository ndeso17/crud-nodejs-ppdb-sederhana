const dbPool = require("../Configs/database");

const deleteData = async (nisn) => {
  try {
    const queryDeleteData = `DELETE FROM mendaftar WHERE nisn = ?`;
    const [result] = await dbPool.execute(queryDeleteData, [nisn]);
    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Data berhasil dihapus!",
      };
    } else {
      return {
        success: false,
        message: "Data tidak ditemukan!",
      };
    }
  } catch (error) {
    console.error("Error di deleteData:", error.message);
    throw error;
  }
};

module.exports = deleteData;
