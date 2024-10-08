// declare dependences / variables

const express = require ('express');
const app = express ();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require ('cors'); 

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to the database ***
const db = mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    });

// Check if db connection works
db.connect((err) => {
    // No wedding today
    if(err) return console.log("Error connecting to the mysql db");
    // Yes wedding connected
    console.log("Connected to mysql successfully as id: ",db.threadId)

    // Setup EJS view engine
    // GET METHOD example
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views')

    // Data is the name of the file inside views folder

    // 1. Retrieve all patients
    app.get('/data', (req, res) => {
        console.log("Received request at /data");
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { results: results });
            }
        });
    });

    // 2. Retrieve all providers
    app.get('/data', (req, res) => {
        console.log("Received request at /data");
        db.query('SELECT * FROM providers', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { results: results });
            }
        });
    });
    
    // 3. Filter patients by first name
    app.get('/data', (req, res) => {
        console.log("Received request at /data");
        db.query('SELECT first_name FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { results: results });
            }
        });
    });

    // 4. Retrieve all providers by their speciality
    app.get('/data', (req, res) => {
        console.log("Received request at /data");
        db.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { results: results });
            }
        });
    });
    
    app.listen(process.env.PORT, () => {
        console.log(`Sever listening on port ${process.env.PORT}`);

        // Send a message to the browser
        console.log('Sending message to browser...');
        app.get('/', (req,res) => {
            res.send('Server started successfully! Wedding can go ON1!!!')
        })
    });
});