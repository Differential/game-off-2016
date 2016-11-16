# Github Game Off 2016 - Game of Life Hacks

# Abstract

Card based choose your own adventure game. Player is presented with a series of binary choices presented as cards.
The results of those choices will be either unexpected or unguesable.
The player can swipe the cards to the left or the right to make choices that affect his score.

Ther player's score is represented through a series of meters at the top of his screen.
Some of the meteors being filled will end the game, other meteors should be kept full to increase score.

The decisions presented to the player are chronological, but non sequential.
They have a vauge ordering that's enforced, but none of the cards have any impact or depend on any other cards.

After a certain number of cards, the game ends and the user is presented with a score.

# Theme

** Game of Life Hacks ** is theme chosen to represent the card based game.

The theme is based off the board game "The Game of Life".
The player progresses along a random track of cards, making choices that affect his money, health, and social media score.
The health, money, and social media score are the three bars at the top of the screen.

If health runs out, the game ends.
The more money you have at the end of the game, the higher your score.
A higher social media score increases your money, but decreases your health (mechanics around this need more defininition)


Examples of theme:

- You get a bonus from work. Do you want to spend the money on A) An intelligence boost, or B) Cancer-fighting nano-bots?
- Character creation UI: from the perspective or your parents who are engineering their future offspring. Choose gender, etc as well as individual attributes from a finite pool of "points".
- In addition to money, you have a personal rating you are trying to maintain (i.e. Black Mirror "Nose Dive" episode). Random "event cards" are spawned that cause your rating to go up or down, with reactions you can take that may further raise or lower your rating.
- End game is to accumulate enough money and a high rating so that you have better "end life" options (e.g. transfer your consciousness to a VR world, cryogenic freezing, etc)

# Architecture

Game is React Native app, let's only worry about iOS for now.
Cards are represented in a set of JSON arrays. We should have a set of cards for the early game, mid game, and end game (to enforce a vauge chronological order).

Cards will look something like this:

```
{
  text: "Bla bla bla"
  image: "image uri"
  options: [
    {
      text: 'do something',
      resultText: 'you did something!',
      effect: {
        health: 20,
        social: -5,
        money: 0
      }
    },
    {
      text: 'the other option',
      resultText: 'why did you do that!',
      effect: {
        health: 0,
        social: 30,
        money: 20,
      }
    }
  ]
}
````

When the user starts the game, decide how many cards should be shown from each timeline.
We should probably show no more than 1/3 of the card selection per playthrough, so if we create 30 "early game" cards
the user should see 10 cards for from the early game.

When a user completes a card, apply the effect of their choices to their score.
Then grab another card from the set. Do this until the user has seen a set number of cards.


### Backend.
None.

### Persistance?
Use Redux + Redux Storage.

# Contributors

If you are looking for a way to contribute, I have come up with ideas for who could work on what.

- Woody / Marcello - Card Structure / Redux Actions for interacting with cards.
- Conrad / Nick - Card flow, look and feel.
- Jess / Josh - Card design, some images we could use for cards.
- Jess / Salem - Card ideas. Come up with questions, answers for those questions, and example effects for those answers.
(Do you want nanobots? A) Yes - would increase health but lower social, B) Not now. Health decreases but money goes up)