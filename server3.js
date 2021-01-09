const { Client } = require('pg')
const http = require("http");

// postgresl connection info
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'reservationsdemo',
    user: 'postgres',
    password: 'GE76V9EV',
})

var attendees = [];

client.connect();

http.createServer(function (req, resp) {

    attendees = []; // reset on every request
    client
        .query("SELECT * FROM venue")
        .then(function (results) {
            console.log("ok " + results.rowCount);
            // the actual data are in the results.row array
            console.log(results.rows);
            // iterate results.rows array and fill the attendees array
            results.rows.forEach((item, index) => { attendees.push(item); });
            // console.log("returning: " + JSON.stringify(attendees));
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify(attendees));
            resp.end();
        })
        .catch(function (err) {
            console.log(err);
            attendees = [];
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify(attendees));
            resp.end();
        });
}).listen(3003);