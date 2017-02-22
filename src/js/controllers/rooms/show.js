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
console.log(vm.user, vm.room.cards)
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
    });

    vm.checkIfPlayedBefore = (cardsArr, userId) => {
      const playersCards = cardsArr.filter((card) => {
        return card.user_id = userId;
      });
      return playersCards.length ? true : false;
    }


    vm.voteForFunniest = (card) => {

console.log(card)

      // ngActionCable will always prefix by message?!
      // consumer.send(message, action); ?
      consumer.send(card, 'vote_for_card');

    }







//   vm.room = {};
//   vm.room = Room.get($stateParams);
//
//   vm.whiteCards = [];
//   vm.pickedWhiteCards = [];
//   // vm.pickWhiteCard = pickWhiteCard;
//   //
//
//   //
//   // function cardsGenerator() {
//   //   vm.pickedWhiteCards = [];
//   //   blackCardGenerator();
//   //   whiteCardsGenerator();
//   // }
//   //
//   // function blackCardGenerator() {
//   //   const index = randomNumberGenerator(window.cards.blackCards);
//   //   vm.blackCard =  window.cards.blackCards[index];
//   //   return vm.blackCard;
//   // }
//   //
//
//   //
//   // function pickWhiteCard($index) {
//   //   vm.pickedWhiteCards = [];
//   //   vm.pickedWhiteCards.push(vm.whiteCards[$index]);
//   // }
//
//
// // action cable
// //   const consumer = new ActionCableChannel('RoomChannel', { room: $stateParams.id });
// // console.log(consumer)
//
//   let i = 0;
//   function createNewBlackCard() {
//     vm.blackCard = {
//       content: window.cards.blackCards[i].text,
//       color: 'black',
//       pick: window.cards.blackCards[i].pick,
//       room_id: $stateParams.id
//     };
//     Card.create(vm.blackCard).$promise
//       .then(() => {
//         console.log(`Card created: ${vm.blackCard}`);
//       });
//     i++;
//   }
//
//   vm.createNewBlackCard = createNewBlackCard;
//
//   // var callback = function(message){
//   //   console.log(message)
//   // };
//   // consumer.subscribe(callback).then(function(){
//   //   vm.chooseWhiteCard = function(card){
//   //     vm.pickedWhiteCards.push(card);
//   //     vm.playedWhiteCard = {
//   //       content: card,
//   //       color: 'white',
//   //       room_id: $stateParams.id
//   //     };
//   //     Card.create(vm.playedWhiteCard);
//   //     consumer.send(card, 'choose_white_card');
//   //   };
//   // });
//
// console.log(Socket)
//
//
//   vm.chooseWhiteCard = function(card){
//     vm.pickedWhiteCards.push(card);
//     vm.playedWhiteCard = {
//       content: card,
//       color: 'white',
//       room_id: $stateParams.id
//     };
//     // Card.create(vm.playedWhiteCard);
//   };
}
