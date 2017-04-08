var angular;

angular.module('tjBot', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/tasks',
    controller: 'tasksCtrl',
    templateUrl: 'tasks.html'
  })
  .state('photos', {
    url: '/photos',
    controller: 'photosCtrl',
    templateUrl: 'photos.html'
  });
})
