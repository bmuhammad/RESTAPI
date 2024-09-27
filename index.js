// Add express server and create application
let express = require("express");
//Use the express Router opbject
let router = express.Router();
let app = express();
let satelliteRepo = require("./repos/satelliteRepo");

let satellites = satelliteRepo.get();

router.get("/", function (req, res, next) {
    res.send(satellites);
    
  });


app.use('/', router);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
