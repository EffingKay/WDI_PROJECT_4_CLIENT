angular
  .module('CardsAgainstHumanity')
  .factory('Room', roomFactory);

roomFactory.$inject = ['API', '$resource'];
function roomFactory(API, $resource){
  return $resource(`${API}/rooms/:id`, { id: '@id'}, {
    'create': { method: 'POST', url: `${API}/rooms`}
  });
}
