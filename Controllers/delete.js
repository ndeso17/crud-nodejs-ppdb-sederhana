const deleteData = require("../Models/deleteData");

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

const deleteSis = async (req, res) => {
  try {
    const cekBody = await bodyChecker(req, res);
    if (!cekBody) {
      console.log("Body Kosong");
      return res.json({
        success: false,
        message: "Tidak ada user untuk di hapuskan.",
      });
    }
    const { nisn } = req.body;
    const hapus = await deleteData(nisn);
    return res.json({ hapus });
  } catch (error) {
    console.error("Error di delete Data PPDB :", error.message);
    throw error;
  }
};

module.exports = deleteSis;
