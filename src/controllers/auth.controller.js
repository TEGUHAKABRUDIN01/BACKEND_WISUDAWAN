const {
  createMahasiswa,
  findByNim,
  loginMahasiswa,
} = require("../models/mahasiswa.model");
const { petugas } = require("../models/admin.model");
const { findProdiById } = require("../models/prodi.model");
const { createProsesWisuda } = require("../models/prosesWisuda.model");
const { json } = require("express");

const registerMahasiswa = async (req, res) => {
  try {
    const { nim, nama_mahasiswa, password, id_prodi } = req.body;
    const file = req.file;

    if (!nim || !nama_mahasiswa || !password || !id_prodi || !file) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    // cek NIM
    const exist = await findByNim(nim);
    if (exist) {
      return res.status(409).json({ message: "NIM sudah terdaftar" });
    }

    // ambil fakultas dari prodi
    const prodi = await findProdiById(id_prodi);
    if (!prodi) {
      return res.status(400).json({ message: "Prodi tidak valid" });
    }

    // simpan mahasiswa
    const id_mahasiswa = await createMahasiswa({
      nim,
      nama_mahasiswa,
      password,
      id_prodi,
      id_fakultas: prodi.id_fakultas,
      sk_wisuda: file.filename,
    });

    // buat proses wisuda
    await createProsesWisuda(id_mahasiswa);

    res.status(201).json({
      message: "Registrasi berhasil, menunggu verifikasi admin",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { nim, password } = req.body;

    if (!nim || !password) {
      return res.status(400).json({
        message: "NIM dan password wajib diisi",
      });
    }

    const mahasiswa = await loginMahasiswa(nim, password);

    // MAHASISWA TIDAK ADA SAMA SEKALI
    if (!mahasiswa) {
      return res.status(404).json({
        message: "Mahasiswa tidak ditemukan",
      });
    }

    // BELUM ADA DATA PROSES_WISUDA
    if (!mahasiswa.status_proses) {
      return res.status(403).json({
        message: "Akun belum diverifikasi admin",
        status: "menunggu",
      });
    }

    // MASIH PROSES
    if (mahasiswa.status_proses === "proses") {
      return res.status(403).json({
        message: "Akun belum di-ACC admin",
        status: "menunggu",
      });
    }

    // SUDAH SELESAI / DI-ACC
    return res.json({
      message: "Login berhasil",
      role: "mahasiswa",
      data: mahasiswa,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const loginPetugas = async (req, res) => {
  try {
    const { nim, password } = req.body;

    if (!nim || !password) {
      return res.status(400).json({
        message: "Nama petugas dan password wajib diisi",
      });
    }

    const petugasHandler = await petugas(nim, password);

    if (!petugasHandler) {
      return res.status(401).json({
        message: "Peteguas tidak terdaftar atau password salah!!!",
      });
    }

    return res.json({
      message: "Login berhasil",
      role: "petugas",
      data: petugas,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerMahasiswa, login, loginPetugas };
