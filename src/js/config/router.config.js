angular
.module('CardsAgainstHumanity')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
  })
  .state('roomsIndex', {
    url: '/rooms',
    templateUrl: '/js/views/rooms/index.html',
    controller: 'RoomsIndexCtrl',
    controllerAs: 'roomsIndex'
  })
  .state('roomsNew', {
    url: '/rooms/new',
    templateUrl: '/js/views/rooms/new.html',
    controller: 'RoomsNewCtrl',
    controllerAs: 'roomsNew'
  });

  $urlRouterProvider.otherwise('/');
}
