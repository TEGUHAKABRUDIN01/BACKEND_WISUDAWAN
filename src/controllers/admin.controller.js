const {
  getProsesWisuda,
  updateStatusWisuda,
} = require("../models/prosesWisuda.model.js");

const getProsesWisudaHandler = async (req, res) => {
  try {
    const data = await getProsesWisuda();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveWisuda = async (req, res) => {
  try {
    const { id_proses, status_proses, id_petugas } = req.body;

    if (!id_proses || !status_proses || !id_petugas) {
      return res.status(400).json({
        message: "Data tidak lengkap",
      });
    }

    await updateStatusWisuda(id_proses, status_proses, id_petugas);

    res.json({
      message: "Status wisuda berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProsesWisudaHandler,
  approveWisuda,
};
