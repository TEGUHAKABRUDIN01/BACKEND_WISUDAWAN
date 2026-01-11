const db = require("../config/database.js");

const petugas = async (nama_petugas, password) => {
  const [rows] = await db.query(
    "SELECT id_petugas, nama_petugas, id_akses FROM petugas WHERE nama_petugas = ? AND password = ?",
    [nama_petugas, password]
  );
  return rows[0];
};

module.exports = { petugas };
