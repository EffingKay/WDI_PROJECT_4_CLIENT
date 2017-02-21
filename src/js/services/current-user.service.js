angular
  .module('CardsAgainstHumanity')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', '$rootScope', 'User'];
function CurrentUserService(TokenService, $rootScope, User) {
  const self    = this;
  const decoded = TokenService.decodeToken();

  self.currentUser = {};

  self.getUser = () => {
    if (decoded) {
      User
        .get({ id: decoded.id }).$promise
        .then(data => {
          self.currentUser = data;
          $rootScope.$broadcast('loggedIn');
        });
    }
  };

  self.getUser();

  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  };
}
