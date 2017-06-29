
// app/routes.js
var bodyParser = require('body-parser');

// grab the nerd model we just created
var Nerd = require('./models/GameItem');

// require('./models/routeModels');

// This responds with "Hello World" on the homepage

// parse application/json
var urlencodedParser = bodyParser.urlencoded({ extended: false })
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////






    module.exports = function(app) {
      var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');
      var insertInventory = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('inventory');
        // Insert some documents

        collection.insert(
          {a : 1},
          function(err, result) {
          assert.equal(err, null);
          assert.equal(3, result.result.n);
          assert.equal(3, result.ops.length);
          console.log("Inserted 3 documents into the collection");
          callback(result);
        });
      }

      var getInventory = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('inventory');
        // Find some documents
        //{'a': 3} would act as a filter. only 'a' : 3 would return.
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following records");
          console.log(docs)
          callback(docs);
        });
      }

      ////////////////////////////////////////////////////////////////////////////////
      ///////////////////////Insert Documents/////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var insertDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Insert some documents
        collection.insertMany([
          {a : 1}, {a : 2}, {a : 3}
        ], function(err, result) {
          assert.equal(err, null);
          assert.equal(3, result.result.n);
          assert.equal(3, result.ops.length);
          console.log("Inserted 3 documents into the collection");
          callback(result);
        });
      }
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////Find Doucments////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Find some documents
        //{'a': 3} would act as a filter. only 'a' : 3 would return.
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following records");
          console.log(docs)
          callback(docs);
        });
      }
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////Update Documents////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var updateDocument = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Update document where a is 2, set b equal to 1
        collection.updateOne({ a : 2 }
          , { $set: { b : 1 } }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Updated the document with the field a equal to 2");
          callback(result);
        });
      }
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////Remove Documents (3)////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var removeDocument3 = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Delete document where a is 3
        collection.deleteOne({ a : 3 }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Removed the document with the field a equal to 3");
          callback(result);
        });
      }
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////Remove Documents (2)////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var removeDocument2 = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        collection.deleteOne({ a : 2 }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Removed the document with the field a equal to 3");
          callback(result);
        });
      }
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////Remove Documents (1)////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var removeDocument1 = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Delete document where a is 3
        collection.deleteOne({ a : 1 }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Removed the document with the field a equal to 3");
          callback(result);
        });
      }
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////Create Collection index////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var indexCollection = function(db, callback) {
        db.collection('documents').createIndex(
          { "a": 1 },
            null,
            function(err, results) {
              console.log(results);
              callback();
          }
        );
      };
        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });

        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////

        app.get('/', function (req, res) {
           console.log("Got a GET request for the homepage");

           // Connection URL
           var url = 'mongodb://localhost:27017/myproject';
           // Use connect method to connect to the server
           var docss = '';
           MongoClient.connect(url, function(err, db) {
             assert.equal(null, err);
             console.log("Connected successfully to server");


             var collection = db.collection('inventory');
             // Find some documents
             //{'a': 3} would act as a filter. only 'a' : 3 would return.
             collection.find({}).toArray(function(err, docs) {
               assert.equal(err, null);
               console.log("Found the following records");
               console.log(docs)
               res.json(docs);
              //  docss = docs;
              //  callback(docs);
              db.close();
             });
            //  res.json(docss);
             //inserts documents into the database
            //  insertDocuments(db, function() {
            //    //finds all documents in the database (currently used as a callback)
            //    findDocuments(db, function() {
            //      db.close();
            //    });
            //  });
            //  updateDocument(db, function() {
            //    db.close();
            //  });
            //  removeDocument1(db, function() {
            //        db.close();
            //  });
            //  removeDocument2(db, function() {
            //        db.close();
            //  });
            //  removeDocument3(db, function() {
            //        db.close();
            //  });
            //  indexCollection(db, function() {
            //      db.close();
            //  });
           });
          //  console.log(docss);
          //  res.send(JSON.stringify(docss));
        })
        // route to handle creating goes here (app.post)

        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });



        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        // This responds a POST request for the homepage

        app.post('/', function (req, res) {
           console.log("Got a POST request for the homepage");

           res.send('Hello POST');
        })

        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        app.get('/index.html', function (req, res) {
          //console below works with a browser going to http://localhost:8082/index.htm
          console.log("The Client.js is talking to me (the server). I am now sending a file back to the client.");
           res.sendFile( __dirname + "/" + "public/views/index.html" );
        })

        app.get('/Navbar.html', function (req, res) {
          //console below works with a browser going to http://localhost:8082/index.htm
          console.log("The Client.js is talking to me (the server). I am now sending a file back to the client.");
           res.sendFile( __dirname + "/" + "Navbar.html" );
        })

        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        app.post('/process_post', urlencodedParser, function (req, res) {
           // Prepare output in JSON format
           response = {
              first_name:req.body.first_name,
              last_name:req.body.last_name
           };
           console.log(response);
           res.end(JSON.stringify(response));
        })
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        app.post('/file_upload', function (req, res) {
           console.log(req.files.file.name);
           console.log(req.files.file.path);
           console.log(req.files.file.type);
           var file = __dirname + "/" + req.files.file.name;

           fs.readFile( req.files.file.path, function (err, data) {
              fs.writeFile(file, data, function (err) {
                 if( err ){
                    console.log( err );
                    }else{
                       response = {
                          message:'File uploaded successfully',
                          filename:req.files.file.name
                       };
                    }
                 console.log( response );
                 res.end( JSON.stringify( response ) );
              });
           });
        })

        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        // This responds a DELETE request for the /del_user page.
        app.delete('/del_user', function (req, res) {
           console.log("Got a DELETE request for /del_user");
           res.send('Hello DELETE');
        })


        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        // This responds a GET request for the /list_user page.
        app.get('/list_user', function (req, res) {
           console.log("Got a GET request for /list_user");
           res.send('Page Listing');
        })


        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        // This responds a GET request for abcd, abxcd, ab123cd, and so on
        app.get('/ab*cd', function(req, res) {
           console.log("Got a GET request for /ab*cd");
           res.send('Page Pattern Match');
        })
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        app.post('/inventory/add', function (req, res){
          console.log("A request to post new inventory has been received.");

          // Connection URL
          var db1 = require('./config/db');
          // Use connect method to connect to the server
          MongoClient.connect(db1.url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            //inserts documents into the database
            db.close();
            // insertDocuments(db, function() {
            //   //finds all documents in the database (currently used as a callback)
            //   findDocuments(db, function() {
            //     db.close();
            //   });
            // });

          });
          res.send('Hello GET');
        })



        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////

        app.get('/inventory/FindAll', function (req, res){
          console.log("A request to post new inventory has been received.");

          // Connection URL
          var db1 = require('./config/db');
          docss = '';
          // Use connect method to connect to the server
          MongoClient.connect(db1.url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            //inserts documents into the database
            // db.close();
            docss = getInventory(db, function() {
              db.close();
            });
          });
          res.JSON(docss);
        })
    };
