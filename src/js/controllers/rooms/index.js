angular
  .module('CardsAgainstHumanity')
  .controller('RoomsIndexCtrl', RoomsIndexCtrl);

RoomsIndexCtrl.$inject = ['Room'];
function RoomsIndexCtrl(Room){
  const vm = this;
  vm.rooms = Room.query();
}
