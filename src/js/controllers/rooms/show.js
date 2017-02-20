angular
  .module('CardsAgainstHumanity')
  .controller('RoomsShowCtrl', RoomsShowCtrl);

RoomsShowCtrl.$inject = ['API', '$http', '$stateParams', '$resource'];

function RoomsShowCtrl(API, $http, $stateParams, $resource) {
  const vm     = this;
  const Room   = $resource(`${API}/rooms/:id`, { id: '@id' });

  vm.room = {};
  vm.room = Room.get($stateParams);
  vm.cardsGenerator = cardsGenerator;
  vm.whiteCards = [];
  vm.pickedWhiteCards = [];
  vm.pickWhiteCard = pickWhiteCard;

  const randomNumberGenerator = (array) => {
    const randomNumber = Math.floor(Math.random() * (array.length + 1));
    return randomNumber;
  };

  function cardsGenerator() {
    blackCardGenerator();
    whiteCardsGenerator();
  }

  function blackCardGenerator() {
    const index = randomNumberGenerator(window.cards.blackCards);
    vm.blackCard =  window.cards.blackCards[index];
    return vm.blackCard;
  }

  function whiteCardsGenerator() {
    vm.whiteCards = [];
    for (let i= 0; i<10; i++) {
      const index = randomNumberGenerator(window.cards.whiteCards);
      vm.whiteCards.push(window.cards.whiteCards[index]);
    }
  }

  function pickWhiteCard($index) {
    vm.pickedWhiteCards = [];
    vm.pickedWhiteCards.push(vm.whiteCards[$index]);
  }

}
