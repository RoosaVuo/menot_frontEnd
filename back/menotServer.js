const express = require('express');
const app = express();

let helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.urlencoded({ limit: '5mb', extended: true }));

const cors = require('cors');
app.use(cors());

app.use(express.json());

const sqlite3 = require('sqlite3');

const port = 8080;

// Open database
const db = new sqlite3.Database('./menot.db');

 
// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS Menot (
    id INTEGER PRIMARY KEY,
    kuvaus TEXT,
    paiva TEXT,
    summa REAL,
    kategoria TEXT,
    maksaja TEXT,
    tarpeellisuus REAL,
    kuitti TEXT
)`);

// Get all expenses
app.get('/menot', (req, res) => {
    db.all('SELECT * FROM Menot', (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

//Get one expense
app.get('/menot/one/:id', (req, res) => {
    let id = req.params.id;

    db.get('select * from Menot where id = ?', [id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        // Jos haku ei tuottanut yhtään riviä
        if (!row) {
            res.status(404).json({ error: 'Haettua menoa ei ole' });
            return;
        }

        res.status(200).json(row);
    });
});

//kaikki kuitit
app.get('/menot/kuitit', (req, res) => {
    db.all('select kuitti from Menot where kuitti IS NOT NULL', (err, row) => {
        if (err) {
            console.log(err.message);
            return res.status(400).json({ error: err.message });
        }

        return res.status(200).json(row);
    });
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images'); // Mihin kansioon ladataan
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);  // Millä tiedostonimellä
    }
});

const upload = multer({ storage: storage })


// Add an expense
app.post('/menot/add', upload.single('kuitti'), (req, res) => {
    const { kuvaus, paiva, summa, kategoria, maksaja, tarpeellisuus } = req.body;

    let kuittiNimi = null;
    if (req.file) {
        kuittiNimi = req.file.originalname;
    }

    db.run('INSERT INTO Menot (kuvaus, paiva, summa, kategoria, maksaja, tarpeellisuus, kuitti) VALUES (?, ?, ?, ?, ?, ?,?)', 
    [kuvaus, paiva, summa, kategoria, maksaja, tarpeellisuus, kuittiNimi], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ id: this.lastID });
    });
});


// Update an expense
app.put('/menot/update', (req, res) => {
    let meno = req.body;

    
    db.run('UPDATE Menot SET kuvaus=?, paiva=?, summa=?, kategoria=?, maksaja=?, tarpeellisuus=?, kuitti=? WHERE id=?', 
    [meno.kuvaus, meno.paiva, meno.summa, meno.kategoria, meno.maksaja, meno.tarpeellisuus, meno.kuitti, meno.id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
            
        }
        res.status(200).json({ count: 1 });
    });
}); 

// Delete an expense
app.delete('/menot/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM Menot WHERE id=?', id, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ changes: this.changes });
    });
});

//lataa kuitti (kuva)
app.get('/download/:nimi', (req, res) => {
    let file = './images/' + req.params.nimi;
    res.download(file);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Ei pyydettyä palvelua' });
});

