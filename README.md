# REST API Dasar

Aplikasi REST API sederhana yang dibangun dengan Node.js, Express.js, dan MongoDB untuk mengelola data Todo.

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [API Endpoints](#api-endpoints)
- [Struktur Folder](#struktur-folder)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## 🚀 Fitur

- ✅ CRUD operations untuk Todo
- ✅ Koneksi ke MongoDB dengan Mongoose
- ✅ Error handling middleware
- ✅ Environment variables support
- ✅ Hot reload dengan Nodemon (development)
- ✅ RESTful API design

## 🛠 Teknologi

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variables
- **Nodemon** - Development tool untuk hot reload

## 📋 Prasyarat

Pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (v14 atau lebih baru)
- [MongoDB](https://www.mongodb.com/) (lokal atau cloud)
- [Git](https://git-scm.com/)

## 🔧 Instalasi

1. Clone repository ini:

```bash
git clone <repository-url>
cd rest-api-dasar
```

2. Install dependencies:

```bash
npm install
```

## ⚙️ Konfigurasi

1. Buat file `.env` di dalam folder `src/`:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/todoapp

# Server
PORT=3000
```

2. Sesuaikan konfigurasi database di `src/config/db.js` jika diperlukan.

## 🚀 Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📚 API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method | Endpoint         | Deskripsi                       |
| ------ | ---------------- | ------------------------------- |
| GET    | `/`              | Welcome message                 |
| GET    | `/api/todos`     | Mendapatkan semua todo          |
| GET    | `/api/todos/:id` | Mendapatkan todo berdasarkan ID |
| POST   | `/api/todos`     | Membuat todo baru               |
| PUT    | `/api/todos/:id` | Update todo berdasarkan ID      |
| DELETE | `/api/todos/:id` | Hapus todo berdasarkan ID       |

### Contoh Request Body (POST/PUT)

```json
{
  "title": "Belajar Node.js",
  "description": "Mempelajari dasar-dasar Node.js dan Express",
  "completed": false
}
```

### Contoh Response

```json
{
  "status": "success",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "title": "Belajar Node.js",
    "description": "Mempelajari dasar-dasar Node.js dan Express",
    "completed": false,
    "createdAt": "2023-07-02T10:30:00.000Z",
    "updatedAt": "2023-07-02T10:30:00.000Z"
  }
}
```

## 📁 Struktur Folder

```
rest-api-dasar/
├── src/
│   ├── config/
│   │   └── db.js              # Konfigurasi database
│   ├── controllers/
│   │   └── todoController.js  # Controller untuk todo
│   ├── middlewares/
│   │   └── errorHandler.js    # Error handling middleware
│   ├── models/
│   │   └── todo.js            # Model todo
│   ├── routes/
│   │   └── todo.js            # Routes untuk todo
│   ├── .env                   # Environment variables
│   └── app.js                 # Entry point aplikasi
├── .gitignore
├── package.json
└── README.md
```

## 🧪 Testing

Anda dapat menggunakan tools seperti:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code Extension)

untuk testing API endpoints.

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Project ini menggunakan lisensi ISC. Lihat file `LICENSE` untuk detail lebih lanjut.

## 👨‍💻 Author

**borjanTech**

---

⭐ Berikan star jika project ini membantu Anda!
