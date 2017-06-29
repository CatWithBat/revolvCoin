var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();

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







var insertInventory = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('inventory');
  // Insert some documents

  collection.insert(
    {ProductId : 1, ProductName : "AppInjector",
    ProductQuantity : 3, ProductCost : 10.0},
    function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 inventory item into the collection");
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







// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //inserts documents into the database
  // insertDocuments(db, function() {
  //   //finds all documents in the database (currently used as a callback)
  //   findDocuments(db, function() {
  //     db.close();
  //   });
  // });
  // updateDocument(db, function() {
  //   db.close();
  // });
  // removeDocument1(db, function() {
  //       db.close();
  // });
  // removeDocument2(db, function() {
  //       db.close();
  // });
  // removeDocument3(db, function() {
  //       db.close();
  // });

  insertInventory(db, function() {
    //finds all documents in the database (currently used as a callback)
    getInventory(db, function() {
      //finds all documents in the database (currently used as a callback)
      db.close();
    });
    // db.close();
  });
  // getInventory(db, function() {
  //   //finds all documents in the database (currently used as a callback)
  //   db.close();
  // });
  // indexCollection(db, function() {
  //     db.close();
  // });
});
