angular
  .module('CardsAgainstHumanity')
  .controller('RoomsShowCtrl', RoomsShowCtrl);

RoomsShowCtrl.$inject = [
  '$scope', 'API', '$http', '$stateParams',
  '$resource', 'Card', 'Room', 'ActionCableChannel',
  'ActionCableSocketWrangler','CurrentUserService', 'TokenService'
];

function RoomsShowCtrl(
  $scope, API, $http, $stateParams,
  $resource, Card, Room, ActionCableChannel,
  ActionCableSocketWrangler, CurrentUserService, TokenService
) {
  const vm = this;

  Room.get($stateParams).$promise.then(data => {
    vm.room = data;
    if (vm.checkIfPlayedBefore(vm.room.cards, vm.user.id)) {
      vm.played = true;
      return;
    }
    vm.whiteCardsGenerator();
  });

  vm.user  = CurrentUserService.currentUser;
  vm.token = TokenService.getToken();

  const randomNumberGenerator = (array) => {
    const randomNumber = Math.floor(Math.random() * (array.length + 1));
    return randomNumber;
  };

  vm.whiteCardsGenerator = function() {
     if (vm.checkIfPlayedBefore(vm.room.cards, vm.user.id)) {
       vm.played = true;
       return;
     }
    vm.whiteCards = [];
    for (let i= 0; i<10; i++) {
      const index = randomNumberGenerator(window.cards.whiteCards);
      vm.whiteCards.push(window.cards.whiteCards[index]);
    }

  };

  // If ActionCableConfig.debug
  // Live STARTED
  // socket open
  // Willkommen
  // socket ping
  const data = {
    id: $stateParams.id
  };

  const consumer = new ActionCableChannel("RoomChannel", data);

  vm.status = ActionCableSocketWrangler;

  function callback(whiteCard){
    vm.room.cards.push(whiteCard);
  }


  // ActionCable confirm_subscription on channel:
  // {"channel":"RoomChannel","data":{"id":11}}
  consumer
    .subscribe(callback)
    .then(function(){
      vm.chooseCard = (card, userId) => {
          const message = {
            content: card,
            color: "white",
            user_id: userId,
            token: vm.token,
            votes: 0
          }
// console.log(message);

          // ngActionCable will always prefix by message?!
          // consumer.send(message, action); ?
          consumer.send(message, 'choose_card');

          // Prevent that user from choosing again
          vm.whiteCards = [];
          vm.played = true;
      }

      $scope.$on('$destroy', function() {
        consumer.unsubscribe().then(function(){
          console.log('You\'ve left the room');
        });
      });

      vm.voteForFunniest = (card) => {
        const message = {
          id: card.id,
          votes: ++card.votes
        }
console.log(message);
        // ngActionCable will always prefix by message
        consumer.send(message, 'vote_for_card');
        vm.voterMessage = 'Thank you for your vote! Vote for more if you want, I don\'t give a shit.';
      }
    });

    vm.checkIfPlayedBefore = (cardsArr, userId) => {
      const playersCards = cardsArr.filter((card) => {
        return card.user_id = userId;
      });
      return playersCards.length ? true : false;
    }

}
