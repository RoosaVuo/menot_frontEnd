const sqlite3 = require('sqlite3').verbose();

// Luo tietokanta tai avaa olemassa oleva
let db = new sqlite3.Database('./menot.db');


// Luo taulu
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Menot (
        id INTEGER PRIMARY KEY NOT NULL,
        kuvaus TEXT NOT NULL,
        paiva TEXT NOT NULL,
        summa REAL NOT NULL,
        kategoria TEXT NOT NULL,
        maksaja TEXT NOT NULL,
        tarpeellisuus REAL,
        kuitti TEXT
    )`, (error) => {
        if (error) {
            return console.log(error.message);
        }
        console.log("Taulu tehtiin")
    });

    // Lisää data tauluun
    const menot = [
        {
            id:1,
            kuvaus: 'S-Market ruokaostokset', 
            paiva: '2024-05-15',
            summa: 4,
            kategoria: 'Ruoka',
            maksaja: 'Mikko',
            tarpeellisuus: 4,
            kuitti: 'kuitti.png' 
        },
        {
            id:2,
            kuvaus: 'Prisma ruokaostokset', 
            paiva: '2024-05-16',
            summa: 41,
            kategoria: 'Ruoka',
            maksaja: 'Roosa',
            tarpeellisuus: 5,
            kuitti: 'kuitti2.png'
        },
        {
            id:3,
            kuvaus: 'Kukkia', 
            paiva: '2024-05-17',
            summa: 9,
            kategoria: 'Koti',
            maksaja: 'Roosa',
            tarpeellisuus: 1,
            kuitti: 'kuitti3.png'
        },
        {
            id:4,
            kuvaus: 'Leffaliput', 
            paiva: '2024-05-10',
            summa: 61,
            kategoria: 'Vapaa-aika',
            maksaja: 'Mikko',
            tarpeellisuus: 1,
            kuitti: 'kuitti4.png'
        },
    ];

    const stmt = db.prepare('INSERT INTO Menot (id, kuvaus, paiva, summa, kategoria, maksaja, tarpeellisuus, kuitti) VALUES (?, ?, ?, ?, ?, ?,?,?)');
    menot.forEach(meno => {
        stmt.run(meno.id, meno.kuvaus, meno.paiva, meno.summa, meno.kategoria, meno.maksaja, meno.tarpeellisuus, meno.kuitti);
    });
    stmt.finalize();

    // Tulosta tietokannan sisältö testausta varten
    db.each('SELECT * FROM Menot', (err, row) => {
        console.log(row);
    });
});



// Sulje tietokanta kun olet valmis
db.close();
