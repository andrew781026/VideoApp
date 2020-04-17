// 1. 先有厚度為 1 px 的 div => 透明黑
// 2. 有一個藍色長條 , 從左至右
// 3. 長條右側有個大圓圈

import * as React from 'react';
import {StyleSheet, View, Animated, PanResponder} from "react-native";

const getStyles = ({progress = '20%', indicatorRadius = 10}) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(167, 166, 157, 0.5)',
      width: '100%', // 由於左側有文字 , 所以 width 100% 會超出邊界
      height: 2
    },
    indicator: { // 藍色大圓圈
      zIndex: 3,
      position: 'absolute',
      top: '50%',
      bottom: '50%',
      left: `${progress * 100 < 5 ? 0 : progress * 100 - 5}%`,
      backgroundColor: "#44a7ee",
      width: indicatorRadius,
      height: indicatorRadius,
      borderRadius: indicatorRadius,
    },
    progressBar: { // 藍色進度條
      zIndex: 2,
      width: `${progress * 100}%`,
      height: '100%',
      backgroundColor: "#44a7ee",
    },
  });

  return styles;
};


class App extends React.Component {
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
      <View style={styles.container}>
        <Text style={styles.titleText}>Drag this box!</Text>
        <Animated.View
          style={{
            transform: [{translateX: this.pan.x}, {translateY: this.pan.y}]
          }}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.box}/>
        </Animated.View>
      </View>
    );
  }
}

// we can use PanResponder to make draggable view , see : https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0
const ProgressBar = ({indicatorRadius, progress}) => {

  const styles = getStyles({indicatorRadius, progress});

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}/>
      <View style={[styles.indicator, {
        transform: [{translateY: -indicatorRadius / 2}]
      }]}/>
    </View>
  )
};

export default ProgressBar;
