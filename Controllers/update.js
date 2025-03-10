const updateData = require("../Models/updateData");

const bodyChecker = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    const datas = {
      title: "PPDB",
      description: "PPDB Page, function bodyChecker!",
      keywords: "403",
    };
    return res.status(403).render("404", { datas });
  }
};

const updateSis = async (req, res) => {
  try {
    const cekBody = await bodyChecker(req, res);
    if (!cekBody) {
      console.log("Body Kosong");
      return res.json({
        success: false,
        message: "Tidak ada user untuk di update",
      });
    }
    console.log("Data Update = ", req.body);
    const { nisn, nama, jk, asalsekolah, minat, kontak, alamat } = req.body;
    const datas = { nisn, nama, jk, asalsekolah, minat, kontak, alamat };
    const edit = await updateData(res, datas);
    return edit;
  } catch (error) {
    console.error("Error di update Data PPDB :", error.message);
    throw error;
  }
};

module.exports = updateSis;
