const db = require("../config/database.js");

const getAllProdi = async () => {
  const [rows] = await db.query(
    "SELECT id_prodi, nama_prodi, id_fakultas FROM prodi"
  );
  return rows;
};

const findProdiById = async (id_prodi) => {
  const [rows] = await db.query(
    "SELECT id_fakultas FROM prodi WHERE id_prodi=?",
    [id_prodi]
  );

  return rows[0];
};

module.exports = { getAllProdi, findProdiById };
