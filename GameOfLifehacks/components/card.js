// Copied from
// https://github.com/brentvatne/react-native-animated-demo-tinder/blob/master/index.ios.js

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
} from 'react-native';

import clamp from 'clamp';

var SWIPE_THRESHOLD = 120;

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      card: props.cards[0],
    }
  }

  _goToNextCard() {
    const cards = this.props.cards;
    let currentCardIndex = cards.lastIndexOf(this.state.card);
    let newIdx = currentCardIndex + 1;

    this.setState({
      card: cards[newIdx > cards.length - 1 ? 0 : newIdx]
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        const panVal = this.state.pan.x._value;
        if (Math.abs(panVal) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState)
          const cardActions = this.state.card.actions;
          if (panVal > 0) {
            this.props.onAction(cardActions.right);
          } else {
            this.props.onAction(cardActions.left);
          }
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState = () => {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextCard();
    this._animateEntrance();
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedRightStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedLeftStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    const { name, text, actions } = this.state.card;
    const { left, right } = actions;
    const { text: leftText } = left;
    const { text: rightText } = right;
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
          <Text style={styles.cardHeader}>{name}</Text>
          <Text style={styles.cardText}>{text}</Text>
        </Animated.View>

        <Animated.View style={[styles.left, animatedLeftStyles]}>
          <Text style={styles.leftText}>{leftText}</Text>
        </Animated.View>

        <Animated.View style={[styles.right, animatedRightStyles]}>
          <Text style={styles.rightText}>{rightText}!</Text>
        </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  cardText: {
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: 'black',
    borderColor: '#649E4A',
    borderWidth: 3,
    borderStyle: 'dashed',
  },
  right: {
    borderColor: 'black',
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: 'white',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  leftText: {
    fontSize: 16,
  },
  left: {
    borderColor: 'black',
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  rightText: {
    fontSize: 16,
  }
});

export default Card;
