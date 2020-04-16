// 1. 先有厚度為 1 px 的 div => 透明黑
// 2. 有一個藍色長條 , 從左至右
// 3. 長條右側有個大圓圈

import * as React from 'react';
import {StyleSheet, View} from "react-native";

const getStyles = ({progress = '20%', indicatorRadius = 10}) => {

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
    },
    indicator: { // 藍色大圓圈
      zIndex: 3,
      position: 'absolute',
      top: '50%',
      bottom: '50%',
      left: progress,
      backgroundColor: "#44a7ee",
      width: indicatorRadius,
      height: indicatorRadius,
      borderRadius: '50%',
    },
    progressBar: { // 藍色進度條
      zIndex: 2,
      width: progress,
      height: '100%',
      backgroundColor: "#44a7ee",
    },
  });

  return styles;
};

const ProgressBar = ({indicatorRadius, progress}) => {

  const styles = getStyles({indicatorRadius, progress});

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}/>
      <View style={styles.indicator}/>
    </View>
  )
};

export default ProgressBar;
