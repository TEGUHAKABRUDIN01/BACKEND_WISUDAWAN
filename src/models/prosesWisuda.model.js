const db = require("../config/database.js");

// saat mahasiswa register
const createProsesWisuda = async (id_mahasiswa) => {
  const [result] = await db.query(
    `INSERT INTO proses_wisuda (id_mahasiswa, status_proses)
     VALUES (?, 'proses')`,
    [id_mahasiswa]
  );
  return result;
};

// liat semua data wiswudawan
const getProsesWisuda = async () => {
  const [rows] = await db.query(
    `SELECT 
        pw.id_proses,
        m.nim,
        m.nama_mahasiswa,
        pw.status_proses
     FROM proses_wisuda pw
     JOIN mahasiswa m ON pw.id_mahasiswa = m.id_mahasiswa
     WHERE pw.status_proses = 'proses'`
  );
  return rows;
};

// proses menunggu atau selesai
const updateStatusWisuda = async (id_proses, status_proses, id_petugas) => {
  if (!["proses", "selesai"].includes(status_proses)) {
    throw new Error("Status tidak valid");
  }

  const [result] = await db.query(
    `UPDATE proses_wisuda
       SET status_proses = ?, 
           id_petugas = ?, 
       WHERE id_proses = ?`,
    [status_proses, id_petugas, id_proses]
  );

  return result.affectedRows;
};

module.exports = {
  createProsesWisuda,
  getProsesWisuda,
  updateStatusWisuda,
};
