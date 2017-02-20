var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://massive:Forces$57@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    // db.user_create_seed(function(err){
    //
    //   console.log(err);
    //
    // });
    // db.vehicle_create_seed(function(err){
    //   console.log(err)
    // });
})

app.get('/api/users', function (req, res) {
  db.get_all(function (err, result) {
    if (err) {
      res.status(500).json(err);
    }

    else {
      res.status(200).json(result);
    }
  })
});

app.get('/api/vehicles', function (req, res) {
  db.all_vehicles(function (err, result) {
    if (err) {
      res.status(500).json(err);
    }
    else {
      res.status(200).json(result);
    }
  })
})

app.post('/api/users', function (req, res) {
  db.post_users([req.body.firstname, req.body.lastname, req.body.email], function (err, result) {
    if (err) {
      res.status(500).json(err)
    }
    else {
      res.status(200).json(result);
    }
  })
});

app.post('/api/vehicles', function (req, res) {
  db.post_vehicles([req.body.make, req.body.model, req.body.year, req.body.ownerId], function (err, result) {
    if (err) {

      res.status(500).json(err)
    }
    else {
      res.status(200).json(result);
    }
  })
});

app.get('/api/user/:userId/vehiclecount', function (req, res) {
  db.count_vehicle([req.params.userId], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json(err)
    }
    else {

      res.status(200).json(result[0]);
    }
  })
});

app.get('/api/user/:userId/vehicle', function (req, res) {
  db.vehicle_by_id([req.params.userId], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json(err)
    }
    else {

      res.status(200).json(result);
    }
  })
});

app.get('/api/vehicle', function (req, res) {

  if (req.query.UserEmail) {
    db.vehicle_by_email([req.query.UserEmail], function (err, result) {
      if (err) {
        res.status(500).json(err)
      }
      else {

        res.status(200).json(result);
      }
    })
  }

  if (req.query.userFirstStart) {

    db.vehicles_by_letters([req.query.userFirstStart], function (err, result) {
      if (err) {

        res.status(500).json(err)
      }
      else {

        res.status(200).json(result);
      }
    })
  }

});

app.get('/api/newervehiclesbyyear', function (req, res) {
  db.vehicle_by_year( function (err, result) {
    if (err) {

      res.status(500).json(err)
    }
    else {

      res.status(200).json(result);
    }
  })

})

app.put('/api/vehicle/:vehicleId/user/:userId', function (req, res) {
  db.update_owner([req.params.vehicleId, req.params.userId], function (err, result) {
    if (err) {
      res.status(500).json(err)
    }
    else {
      res.status(200).json(result);
    }
  })

})

app.delete('/api/user/:userId/vehicle/:vehicleId', function (req, res) {
  db.delete_owner([req.params.userId, req.params.vehicleId], function (err, result) {
    if (err) {
      res.status(500).json(err)
    }
    else {
      res.status(200).json(result);
    }
  })
});

  app.delete('/api/vehicle/:vehicleId', function (req, res) {
    db.delete_vehicle([req.params.vehicleId], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json(err)
      }
      else {
        console.log(result);
        res.status(200).json(result);
      }
    })

})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
