var app = angular.module('tjBot');
var url = "http://localhost:8080";

app.controller('photosCtrl', function($scope, $http){

  $scope.photos = [1,2,3,4];

});
