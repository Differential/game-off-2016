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
};

function handleChoice({ fameChange = 0, wealthChange = 0, healthChange = 0 }, state){
  const { health: h, wealth: w, fame: f } = state;
  const fame = Object.assign({}, f, { current: f.current += fameChange });
  const wealth = Object.assign({}, w, { current: w.current += wealthChange });
  const health = Object.assign({}, h, { current: h.current += healthChange });
  return Object.assign({}, { health, fame, wealth });
}

export default function game(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'MAKE_CHOICE':
      return handleChoice(action.choice, state);
    default:
      return state
  }
}