const cards = [
  {
    name: 'Card 1',
    text: 'This is an interesting choice',
    image: "https://1833.fm/wp-content/uploads/2015/02/brf9mp1hlaiznmn9uy9p.png",
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
        wealthChange: 20,
      }
    }
  }
];

export default cards;