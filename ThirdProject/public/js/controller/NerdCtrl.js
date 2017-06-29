// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.findAll = function() {
      $http(
          {
            method : "GET",
            url : "http://localhost:8082/"// we need to change the urls here
          }).then(function(response) {
        console.log(response);
        $scope.allInv = response.data;
      });
    }

});
