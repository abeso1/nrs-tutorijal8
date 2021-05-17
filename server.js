const express = require('express')
const path = require('path')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const port = 3001

export function beforeAndAfterEachShowGradove() {
    let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.all(`SELECT NAZIV
                     FROM grad`, (err, rows, fields) => {
            if (err) {
                console.error(err.message);
            }

            res.json(JSON.stringify(rows));


        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

export function startDb() {
    let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });
}

export function closeDb() {
    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

app.get('/gradovi', (req, res) => {
    const gradovi = [];
    // code to retrieve an article...
    let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.all(`SELECT NAZIV
                 FROM grad`, (err, rows, fields) => {
            if (err) {
                console.error(err.message);
            }

            res.json(JSON.stringify(rows));


        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.post('/grad', (req, res) => {

    let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.run(`INSERT INTO grad VALUES (3, 'Travnik', 12345)`, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });


    res.send("Successfull post");
});

app.put('/gradovi/:id', (req, res) => {
    const { id } = req.params;
    // code to update an article...
    let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.each(`UPDATE grad
        SET NAZIV = ?
        WHERE ID = ?`, ['TUZLA', id], function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);

        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    res.send("Successfull put");
});

app.get('/gradovi/:id', (req, res) => {
    const { id } = req.params;
    // code to delete an article...
    let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.each(`SELECT NAZIV
                 FROM grad 
                 WHERE ID = ?`, [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }

            res.json(JSON.stringify(row));


        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});



app.delete('/gradovi/:id', (req, res) => {
    const { id } = req.params;
    // code to delete an article...
    let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.all(`DELETE
                 FROM grad
                 WHERE ID = ? `, [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }

            res.json("Successfull delete");


        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.get('/', (req, res) => {
    console.log(__dirname + '/index.html')
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

var server = app.listen(3000)



module.exports = server