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
      height: 2,
    },
    second: {
      flex: 1,
      flexDirection: 'row'
    },
    indicator: { // 藍色大圓圈
      zIndex: 3,
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

// we can use PanResponder to make draggable view , see : https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0
class ProgressBar extends React.Component {

  render() {

    const {indicatorRadius, progress} = this.props;
    const styles = getStyles({indicatorRadius, progress});

    // PanResponder 只在 Parent 區塊才有效
    return (
      <View style={styles.container}>
        <View style={styles.second}>
          <View style={styles.progressBar}/>
          <Animated.View style={[styles.indicator, {
            transform: [{translateX: this.props.x }, {translateY: -indicatorRadius / 2}]
          }]}/>
        </View>
      </View>
    )
  }
}

export default ProgressBar;
