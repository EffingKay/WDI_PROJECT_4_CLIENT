angular
  .module('CardsAgainstHumanity')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function RegisterCtrl(User, CurrentUserService, $state){
  const vm = this;

  vm.register = () => {
    User
      .register(vm.user).$promise
      .then(() => {
        CurrentUserService.getUser();
        $state.go('roomsIndex');
      }, err => {
        vm.error = 'Please try again';
  console.log(err);
      });
  };
}
