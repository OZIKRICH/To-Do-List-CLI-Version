let statusTugas: string;
import readlineSync from "readline-sync";
import fs from "fs";

console.log("Selamat Datang Di Task Manager");

interface Task {
    id: number;
    judul: string;
    selesai: boolean;
}

class TaskManager {
    private daftarTugas: Task[] = [
        {id: 1, judul: "Belajar TypeScript", selesai:false},
        {id: 2, judul: "Mengerjakan latihan", selesai: false},
        {id: 3, judul: "Belajar Web", selesai: false},
        {id: 4, judul: "Olahraga", selesai: false},
        {id: 5, judul: "Mandi", selesai: false},
    ];

    tambah(judul: string): void {
        const idBaru = this.daftarTugas.length + 1;
        this.daftarTugas.push({id: idBaru, judul, selesai: false});
    }

    tampilkan(): void {
        this.daftarTugas.forEach((t) => 
            console.log(`${t.id} - ${t.judul} - ${t.selesai ? "Selesai" : "Belum"}`)
        );
    }

    tandaiSelesai(id:number): void {
        const tugas = this.daftarTugas.find((t) => t.id === id);
        if (tugas) tugas.selesai = true;
    }

    hapus(id: number): void {
        this.daftarTugas = this.daftarTugas.filter((t) => t.id !== id);
    }

    simpan(): void {
        fs.writeFileSync("data.json", JSON.stringify(this.daftarTugas, null, 2));
    }

    muat(): void {
        if (fs.existsSync("data.json")) {
            const data = fs.readFileSync("data.json", "utf-8");
            this.daftarTugas = JSON.parse(data);
        }
    }
}

const manager = new TaskManager();

while (true) {
    console.log("\n1. Tambah Tugas\n2. Lihat Tugas\n3. Tandai Selesai\n4. Hapus Tugas\n5. Keluar");

    const pilihan = readlineSync.question("Pilih Menu: ");

    switch (pilihan) {
        case "1": {
            const judul = readlineSync.question("Judul Tugas: ");
            manager.tambah(judul);
            break;
        }
        case "2": {
            manager.tampilkan();
            break;
        }
        case "3": {
            const idSelesaiString = readlineSync.question("No Berapa yang sudah selesai?: ");
            const idSelesaiNumber: number = Number(idSelesaiString)
            manager.tandaiSelesai(idSelesaiNumber);
            break;
        }
        case "4": {
            const idSelesaiString = readlineSync.question("No Berapa yang sudah selesai?: ");
            const idSelesaiNumber: number = Number(idSelesaiString)
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