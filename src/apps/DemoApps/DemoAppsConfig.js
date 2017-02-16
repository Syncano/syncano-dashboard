import TicTacToe from './img/tic-tac-toe.jpg';
import TicTacToeSchema from './img/tic-tac-toe-schema.svg';
import PokemonMap from './img/pokemon-map.jpg';
import PokemonMapSchema from './img/pokemon-map-schema.svg';

const config = {
  'tic-tac-toe': {
    avatar: TicTacToe,
    schema: TicTacToeSchema
  },
  'pokemon-map': {
    avatar: PokemonMap,
    schema: PokemonMapSchema
  }
};

export default {
  getAvatar(appName) {
    return config[appName] && config[appName].avatar;
  },

  getSchema(appName) {
    return config[appName] && config[appName].schema;
  }
};

