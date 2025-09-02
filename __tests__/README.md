# Panduan Test untuk Pemula

## Apa itu Testing?

Testing adalah cara untuk memastikan kode kita berfungsi dengan baik. Seperti mengecek apakah motor bisa jalan sebelum dibawa pergi.

## File Test yang Dibuat

### 1. **setup.js**

- File pengaturan test
- Mock (tiruan) database agar tidak perlu database asli
- Berguna untuk pembelajaran tanpa ribet setup database

### 2. **models/todo.test.js**

- Test untuk model Todo
- Mengecek apakah model bisa menyimpan dan mengambil data
- Test sederhana untuk pemula

### 3. **controllers/todoController.test.js**

- Test untuk semua fungsi controller
- Mengecek 4 fungsi utama:
  - `index`: Ambil semua todo
  - `store`: Buat todo baru
  - `update`: Update todo
  - `destroy`: Hapus todo

### 4. **routes/todo.test.js**

- Test untuk API endpoints
- Mengecek apakah API bisa diakses dengan benar
- Test HTTP request/response

### 5. **middlewares/errorHandler.test.js**

- Test untuk handling error
- Mengecek apakah error ditangani dengan baik

## Cara Menjalankan Test

### Menjalankan Semua Test

```bash
npm test
```

### Menjalankan Test dengan Mode Watch (otomatis jalan ulang)

```bash
npm run test:watch
```

### Menjalankan Test dengan Coverage (lihat persentase kode yang ditest)

```bash
npm run test:coverage
```

### Menjalankan Test File Tertentu

```bash
# Test controller saja
npm test controllers

# Test model saja
npm test models

# Test routes saja
npm test routes
```

## Penjelasan Konsep Test

### 1. **Mock**

- Tiruan dari database atau fungsi asli
- Berguna agar test tidak bergantung pada database nyata
- Lebih cepat dan aman untuk belajar

### 2. **describe()**

- Mengelompokkan test yang sejenis
- Seperti folder untuk mengorganisir test

### 3. **test() atau it()**

- Satu test case
- Mengecek satu hal spesifik

### 4. **expect()**

- Memastikan hasil sesuai harapan
- Contoh: `expect(result).toBe('success')`

### 5. **beforeEach()**

- Dijalankan sebelum setiap test
- Untuk membersihkan atau setup data

## Contoh Output Test

```
✓ Model Todo › harus bisa membuat todo baru
✓ Todo Controller › index › harus berhasil mengambil daftar todo
✓ Todo Routes › GET /api/todos › harus berhasil mengambil semua todo
```

## Tips untuk Pemula

1. **Mulai dari yang sederhana**

   - Baca test yang sudah ada
   - Pahami struktur describe-test-expect

2. **Jangan takut error**

   - Error di test itu normal
   - Baca pesan error untuk tahu masalahnya

3. **Test satu hal pada satu waktu**

   - Jangan test banyak hal dalam satu test case
   - Lebih mudah debug kalau error

4. **Gunakan nama test yang jelas**

   - `test('harus berhasil membuat todo')` ✅
   - `test('test 1')` ❌

5. **Mock adalah teman**
   - Tidak perlu database asli untuk belajar
   - Focus ke logika, bukan infrastruktur

## Yang Dipelajari dari Test Ini

1. **Unit Testing**: Test fungsi individual
2. **Integration Testing**: Test API endpoints
3. **Mocking**: Tiruan dependensi eksternal
4. **HTTP Testing**: Test request/response
5. **Error Handling**: Test penanganan error

## Latihan Lanjutan

Setelah paham, coba:

1. Tambah test case baru
2. Test dengan data invalid
3. Test edge cases (kasus ekstrem)
4. Buat test untuk fungsi baru yang dibuat

Selamat belajar testing! 🚀
