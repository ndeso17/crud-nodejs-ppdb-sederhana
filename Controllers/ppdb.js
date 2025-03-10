const saveData = require("../Models/saveData");

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

const ppdb = async (req, res) => {
  try {
    const cekBody = await bodyChecker(req, res);
    if (!cekBody) {
      console.log("Body Kosong");
      return res.status(200).render("ppdb", {
        message: "Silahkan Isi Semua Form.",
        jenisAlert: "info",
      });
    }

    // NISN, Nama, Jenis Kelamin, Asal Sekolah, Minat Jurusan, Kontak, Alamat
    const { nisn, nama, jk, asalsekolah, minat, kontak, alamat } = req.body;

    if (!nisn || !nama || !jk || !asalsekolah || !minat || !kontak || !alamat) {
      return res
        .status(200)
        .render("ppdb", {
          message: "Form tidak boleh kosong!",
          jenisAlert: "error",
        });
    }

    // Jika Form Tidak Kosong, Lakukan Proses menyimpan data
    const datas = { nisn, nama, jk, asalsekolah, minat, kontak, alamat };
    const save = await saveData(res, datas);
    console.log("Save Data: ", save);
    if (!save.success) {
      return res.status(201).render("ppdb", {
        message: save.message,
        jenisAlert: "error",
      });
    }
    // Proses menyimpan data berhasil redirect ke index dengan sweet alert berhasil
    return res.status(200).render("index", {
      message: save.message,
      jenisAlert: "success",
    });
  } catch (error) {
    const datas = {
      title: "Internal Error",
      description: "PPDB Page!",
      keywords: "500",
    };
    return res.status(500).render("error", { datas });
  }
};

module.exports = ppdb;
