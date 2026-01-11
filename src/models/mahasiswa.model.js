const db = require("../config/database.js");

const loginMahasiswa = async (nim, password) => {
  const [rows] = await db.query(
    `SELECT 
        m.id_mahasiswa,
        m.nama_mahasiswa,
        pw.status_proses
     FROM mahasiswa m
     LEFT JOIN proses_wisuda pw 
       ON m.id_mahasiswa = pw.id_mahasiswa
     WHERE m.nim = ? AND m.password = ?`,
    [nim, password]
  );

  return rows[0];
};

const createMahasiswa = async (data) => {
  const { nim, nama_mahasiswa, password, id_prodi, id_fakultas, sk_wisuda } =
    data;

  const [result] = await db.query(
    `INSERT INTO mahasiswa
     (nim, nama_mahasiswa, password, id_prodi, id_fakultas, id_akses, sk_wisuda)
     VALUES (?, ?, ?, ?, ?, 1, ?)`,
    [nim, nama_mahasiswa, password, id_prodi, id_fakultas, sk_wisuda]
  );

  return result.insertId;
};

const findByNim = async (nim) => {
  const [rows] = await db.query(
    "SELECT id_mahasiswa FROM mahasiswa WHERE nim = ?",
    [nim]
  );
  return rows[0];
};

const getAllMahasiswa = async () => {
  const [rows] = await db.promise().query("SELECT * FROM mahasiswa");
  return rows;
};

const updateMahasiswa = async (id, data) => {
  const { nama_mahasiswa, nim, id_prodi } = data;
  await db
    .promise()
    .query(
      "UPDATE mahasiswa SET nama_mahasiswa = ?, nim = ?,id_prodi = ? WHERE id_mahasiswa = ?",
      [nama_mahasiswa, nim, id_prodi, id]
    );
};

const deleteMahasiswa = async (id) => {
  await db
    .promise()
    .query("DELETE FROM mahasiswa WHERE id_mahasiswa = ?", [id]);
};

module.exports = {
  findByNim,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  loginMahasiswa,
};
