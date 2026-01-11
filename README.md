# BACKEND_WISUDAWAN

1. ################ ################ ################ ################ BUAT FILE .env ################ ################ ################ ################ ################
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_db


2. ################ INSTALL NPM ################
npm install

################ 🔥API ENDPOINT ################
- AUTH REGISTRASI DAN LOGIN MAHASISWA ATAU WISUDWAN
  1. (METHOD HTTP POST) http://localhost:3000/wisudawan/auth/registrasi/ 
     <img width="563" height="563" alt="image" src="https://github.com/user-attachments/assets/ea776ae3-c937-4399-9287-80439a627a84" />
     RESPONSE: 
     {
        "message": "Registrasi berhasil, menunggu verifikasi admin"
     }

  2. (METHOD HTTP POST) http://localhost:3000/wisudawan/auth/login/mahasiswa 
     <img width="563" height="563" alt="image" src="https://github.com/user-attachments/assets/b20f0e3d-7285-45ab-a2d6-39968f70037e" />
     RESPONSE:
     {
      "message": "Akun belum di-ACC admin",
      "status": "menunggu"
    }
- AUTH LOGIN PETUGAS
  1. (METHOD HTTP POST) http://localhost:3000/wisudawan/auth/login/petugas
     <img width="563" height="563" alt="image" src="https://github.com/user-attachments/assets/05731547-5b23-4f4f-8181-f3e4b3ab6182" />
    RESPONSE:
    {
      "message": "Login berhasil",
      "role": "petugas"
    }
    
- MELIHAT SEMUA DATA WISUDWAN  ROLE ADMIN ATAU PETUGAS
  1. (METHOD HTTP GET) http://localhost:3000/admin/wisuda
     RESPONSE:
      <img width="563" height="563" alt="image" src="https://github.com/user-attachments/assets/9613d9a2-e2a1-41f2-8013-fb49c3ecfe3e" />

- 


