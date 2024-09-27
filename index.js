// Add express server and create application
let express = require("express");
let app = express();
let satelliteRepo = require("./repos/satelliteRepo");

//Use the express Router opbject
let router = express.Router();
//possible sql  call for data
///let satellites = satelliteRepo.get();

//Create GET to return a list of items
router.get("/", function (req, res, next) {
  // res.send("Communication"); return on single piece of data
  //can send status here res.status(206).send based on needs
  /// res.send(satellites);

  satelliteRepo.get(
    function (data) {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All satellites retrieved.",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

//Create GET/id to return a single satellite
router.get("/:id", function (req, res, next) {
  satelliteRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "All satellites retrieved.",
          data: data,
        });
      } else {
        res.status(200).json({
          status: 404,
          statusText: ",Not Found",
          message: "The satellite '" + req.params.id + "' could not be found.",
          error: {
            code: "NOT_FOUND",
            message:
              "The satellite '" + req.params.id + "' could not be found.",
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

//Configure router so all routes are prefixed with /api/v1
//app.use("/api/", router);
//test for vercel deploy
//after test this works.
// app.get("/", (req, res) => {
//     res.send("Express on Vercel");
//   });
  
//   // Initialize server
// app.listen(5000, () => {
//     console.log("Running on port 5000.");
//   });

app.use('/api', router);

//Create server to listen on port 5000
var server = app.listen("https://restapi-nine-kappa.vercel.app/", function () {
   console.log("Node server is running on  https://restapi-nine-kappa.vercel.app/"); //      http://localhose:5000..");
});

module.exports = server;
