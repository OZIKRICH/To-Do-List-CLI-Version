"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let statusTugas;
const readline_sync_1 = __importDefault(require("readline-sync"));
const fs_1 = __importDefault(require("fs"));
console.log("Selamat Datang Di Task Manager");
class TaskManager {
    constructor() {
        this.daftarTugas = [
            { id: 1, judul: "Belajar TypeScript", selesai: false },
            { id: 2, judul: "Mengerjakan latihan", selesai: false },
            { id: 3, judul: "Belajar Web", selesai: false },
            { id: 4, judul: "Olahraga", selesai: false },
            { id: 5, judul: "Mandi", selesai: false },
        ];
    }
    tambah(judul) {
        const idBaru = this.daftarTugas.length + 1;
        this.daftarTugas.push({ id: idBaru, judul, selesai: false });
    }
    tampilkan() {
        this.daftarTugas.forEach((t) => console.log(`${t.id} - ${t.judul} - ${t.selesai ? "Selesai" : "Belum"}`));
    }
    tandaiSelesai(id) {
        const tugas = this.daftarTugas.find((t) => t.id === id);
        if (tugas)
            tugas.selesai = true;
    }
    hapus(id) {
        this.daftarTugas = this.daftarTugas.filter((t) => t.id !== id);
    }
    simpan() {
        fs_1.default.writeFileSync("data.json", JSON.stringify(this.daftarTugas, null, 2));
    }
    muat() {
        if (fs_1.default.existsSync("data.json")) {
            const data = fs_1.default.readFileSync("data.json", "utf-8");
            this.daftarTugas = JSON.parse(data);
        }
    }
}
const manager = new TaskManager();
while (true) {
    console.log("\n1. Tambah Tugas\n2. Lihat Tugas\n3. Tandai Selesai\n4. Hapus Tugas\n5. Keluar");
    const pilihan = readline_sync_1.default.question("Pilih Menu: ");
    switch (pilihan) {
        case "1": {
            const judul = readline_sync_1.default.question("Judul Tugas: ");
            manager.tambah(judul);
            break;
        }
        case "2": {
            manager.tampilkan();
            break;
        }
        case "3": {
            const idSelesaiString = readline_sync_1.default.question("No Berapa yang sudah selesai?: ");
            const idSelesaiNumber = Number(idSelesaiString);
            manager.tandaiSelesai(idSelesaiNumber);
            break;
        }
        case "4": {
            const idSelesaiString = readline_sync_1.default.question("No Berapa yang sudah selesai?: ");
            const idSelesaiNumber = Number(idSelesaiString);
            manager.hapus(idSelesaiNumber);
            break;
        }
        case "5": {
            process.exit(0);
        }
        default: {
            console.log("Input yang anda masukan tidak benar");
            break;
        }
    }
}
