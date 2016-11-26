import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
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
    backgroundColor: 'red',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  body: {
    backgroundColor: 'blue',
    marginTop: HEADER_HEIGHT + 20,
    margin: 20,
    height: 500,

    // justifyontent: 'center',
    // alignItems: 'center',
  },
});

function ProgressBar(props) {
  const { percent, text } = props;
  const otherFlex = 100 - percent;
  return (
    <View>
      <Text>{text}</Text>
      <View style={{ height: 50, margin: 5, borderColor: 'black', borderWidth: 1, borderStyle: 'solid' }} >
        <View style={{ backgroundColor: 'white', flex: otherFlex }}>
        </View>
        <View style={{ backgroundColor: 'black', flex: percent }}>
        </View>
      </View>
    </View>
  );
};

class Game extends Component {
  render(){
    return (
      <View style={styles.gameContainer}>
        <View style={styles.header}>
          <ProgressBar text="Wealth" percent={50} />
          <ProgressBar text="Health" percent={75} />
          <ProgressBar text="Fame" percent={25} />
        </View>
        <View style={styles.body}>
          <Card onAction={console.log} />
        </View>
      </View>
    )
  }
}

export default Game;