const cards = [
  {
    name: 'Card 1',
    text: 'This is an interesting choice',
    actions: {
      left: {
        text: 'Make one choice',
        resultText: 'you made a choice!',
        fameChange: 20,
        wealthChange: -20,
      },
      right: {
        text: 'Make another choice',
        resultText: 'you made a different choice!',
        fameChange: -20,
        healthChange: 20,
      }
    }
  }
];

export default cards;