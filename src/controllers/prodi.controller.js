const ModelProdi = require("../models/prodi.model.js");

const getProdi = async (req, res) => {
  try {
    const data = await ModelProdi.getAllProdi();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data prodi" });
  }
};

module.exports = getProdi;
