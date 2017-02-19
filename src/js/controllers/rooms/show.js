angular
  .module('CardsAgainstHumanity')
  .controller('RoomsShowCtrl', RoomsShowCtrl);

RoomsShowCtrl.$inject = ['API', '$http', '$stateParams', '$resource'];
function RoomsShowCtrl(API, $http, $stateParams, $resource) {
  const vm     = this;
  vm.room = {};

  const Character = $resource(`${API}/rooms/:id`, { id: '@id' });
  vm.room = Character.get($stateParams);

}
