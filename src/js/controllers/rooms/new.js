angular
  .module('CardsAgainstHumanity')
  .controller('RoomsNewCtrl', RoomsNewCtrl);

RoomsNewCtrl.$inject = ['Room', '$state'];
function RoomsNewCtrl(Room, $state) {
  const vm = this;

  vm.create = () => {
    Room
      .create(vm.room).$promise
      .then(() => {
        $state.go('roomsIndex');
      }, err => {
  console.log(err);
      });
  };
}
