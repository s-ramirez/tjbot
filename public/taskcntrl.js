
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
      "action": "Dance",
      "options": {"opt1" : 1},
      "owner": "Melisa Carranza"
    },
    {
      "id": 2,
      "action": "Wave",
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

    for (i in $scope.tasks) {
      if ($scope.tasks[i].id == id){
        ($scope.tasks).splice(i, 1);
      }
    };

    // console.log("deleting task with id", id);
  };

});
