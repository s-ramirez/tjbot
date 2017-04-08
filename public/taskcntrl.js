
var app = angular.module('tjBot');
var url = "http://localhost:8080";

app.controller('tasksCtrl', function($scope, $http){

  $scope.tasks = [
    {
      "id": 0,
      "action": "Wave",
      "options": {"opt1" : 1},
      "owner": "Sebastian Ramirez"
    },
    {
      "id": 1,
      "action": "wave",
      "options": {"opt1" : 1},
      "owner": "Melisa Carranza"
    },
    {
      "id": 2,
      "action": "wave",
      "options": {"opt1" : 1},
      "owner": "Alina Pacheco"
    }
  ];

  $scope.getTasks = function(){
    $http.get(url+"/tasks").then(function(response){
      var data = response.data;
      $scope.tasks = data;
    });
  };

  $scope.deleteTask = function(id){
    console.log("deleting task with id", id);
  };

});
