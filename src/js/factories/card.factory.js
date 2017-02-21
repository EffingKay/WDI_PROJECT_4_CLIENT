angular
  .module('CardsAgainstHumanity')
  .factory('Card', cardFactory);

cardFactory.$inject = ['API', '$resource'];
function cardFactory(API, $resource){
  return $resource(`${API}/cards/:id`, { id: '@id'}, {
    'create': { method: 'POST', url: `${API}/cards`}
  });
}
