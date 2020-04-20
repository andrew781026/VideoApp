import React from "react";
import {
  StyleSheet,
  PanResponder,
  Animated,
  View,
} from "react-native";

class Draggable extends React.Component {

  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },
    onPanResponderMove: Animated.event([
      null,
      {dx: this.pan.x, dy: this.pan.y}
    ]),
    onPanResponderRelease: () => {
      this.pan.flattenOffset();
    }
  });

  render() {
    return (
      <Animated.View
        style={{
          transform: [{translateX: this.pan.x}, {translateY: this.pan.y}]
        }}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.box}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default Draggable;
