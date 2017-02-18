angular
  .module('CardsAgainstHumanity')
  .factory('User', userFactory);

userFactory.$inject = ['API', '$resource'];
function userFactory(API, $resource){
  return $resource(`http://localhost:7000/users/:id`, { id: '@id'}, {
    'register': { method: 'POST', url: `${API}/register`},
    'login': { method: 'POST', url: `${API}/login`}
  });
}
