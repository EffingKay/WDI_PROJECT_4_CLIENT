angular
  .module('CardsAgainstHumanity')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [];
function MainCtrl() {
  const vm = this;

  // $rootScope.$on('loggedIn', () => {
  //   CurrentUserService.getUser()
  //   .then(data => {
  //     vm.user = data;
  //     $state.go('usersIndex');
  //   }, err => {
  //     console.log(err);
  //   });
  // });
}
