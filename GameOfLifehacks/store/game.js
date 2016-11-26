import defaultCards from './cards';

const DEFAULT_STATE = {
  health: {
    current: 100,
    max: 100,
    min: 0,
  },
  wealth: {
    current: 0,
    max: null,
    min: -1000000,
  },
  fame: {
    current: 50,
    max: null,
    min: null,
  },
  cards: defaultCards,
};

function buildResultCard({ resultText }){
  return {
    text: resultText,
    name: 'Result!',
    actions: {
      right: {
        text: 'Move on',
      },
      left: {
        text: 'Move on',
      }
    }
  }
}

function getNextCard(){
  return defaultCards[0];
}
function handleChoice({ fameChange = 0, wealthChange = 0, healthChange = 0, resultText }, state){
  const { health: h, wealth: w, fame: f, cards: c } = state;
  const fame = Object.assign({}, f, { current: f.current += fameChange });
  const wealth = Object.assign({}, w, { current: w.current += wealthChange });
  const health = Object.assign({}, h, { current: h.current += healthChange });
  const cards = c.slice(0)
  if (resultText){
    cards.push(buildResultCard({ resultText }));
  } else {
    cards.push(getNextCard());
  }
  return Object.assign({}, { health, fame, wealth, cards });
}

export default function game(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'MAKE_CHOICE':
      return handleChoice(action.choice, state);
    default:
      return state
  }
}