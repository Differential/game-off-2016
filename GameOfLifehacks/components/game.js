import React, { Component } from 'react';
import { connect } from 'react-redux'
import { makeChoice } from '../store/actions';

import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Card from './card';

const HEADER_HEIGHT = 80;
const styles = StyleSheet.create({
  gameContainer: {
  },
  header: {
    position: 'absolute',
    height: HEADER_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#649E4A',
    borderWidth: 3,
    borderStyle: 'dashed',
  },
  body: {
    marginTop: HEADER_HEIGHT + 20,
    margin: 20,
    height: 500,

    // justifyontent: 'center',
    // alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -50,
    width: null,
    height: null,
  },
});

function ProgressBar(props) {
  const { percent, text } = props;
  const otherFlex = 100 - percent;
  return (
    <View>
      <Text style={{color: '#649E4A'}}>{text}</Text>
      <View style={{ height: 50, margin: 5, borderColor: 'black', borderWidth: 1, borderStyle: 'solid' }} >
        <View style={{ backgroundColor: 'white', flex: otherFlex }}>
        </View>
        <View style={{ backgroundColor: '#649E4A', flex: percent }}>
        </View>
      </View>
    </View>
  );
};

class Game extends Component {
  render(){
    return (
      <View style={styles.gameContainer}>
        <Image style={styles.image} source={require('./future-city.jpeg')} />
        <View style={styles.header}>
          <ProgressBar text="Wealth" percent={this.props.wealth} />
          <ProgressBar text="Health" percent={this.props.health} />
          <ProgressBar text="Fame" percent={this.props.fame} />
        </View>
        <View style={styles.body}>
            <Card onAction={this.props.makeChoice} cards={this.props.cards}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wealth: state.game.wealth.current,
    health: state.game.health.current,
    fame: state.game.fame.current,
    cards: state.game.cards,
  }
};

const mapDispatchToProps = {
  makeChoice,
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);