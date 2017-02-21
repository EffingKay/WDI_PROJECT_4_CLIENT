angular
  .module('CardsAgainstHumanity')
  .run(ActionCableConfig);

function ActionCableConfig(ActionCableConfig) {
  ActionCableConfig.debug = true;
}
