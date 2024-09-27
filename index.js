// Add express server and create application
let express = require("express");
let cors = require('cors');
import cors from 'cors';

const options = [
    cors({
      origin: '*',
      methods: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  ];
  

//Use the express Router opbject
let router = express.Router();
let app = express();
let satelliteRepo = require("./repos/satelliteRepo");

let satellites = satelliteRepo.get();

router.get("/", function (req, res, next) {
    res.send(satellites);
    
  });


app.use('/', router);

//Configure cors
app.use(options);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
