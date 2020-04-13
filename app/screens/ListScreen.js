import * as React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import styled from 'styled-components/native'; // https://levelup.gitconnected.com/using-styled-components-with-react-native-de645fcf4787
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const Container = styled.View`
	flex: 1;
  flex-direction:row;
  background-color:#F5FCFF;
  paddingTop: ${getStatusBarHeight()};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    paddingTop: getStatusBarHeight()
  },
  box: {
    flex: 1,
    backgroundColor: '#6799ff',
    position: relative
  },
  stretch: {
    // width : 100% ,
    height: 200,
    resizeMode: 'stretch',
  },
  favorite: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  watchNumber: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
});

const Card = ({text}) => (
  <View style={styles.box}>
    <Image
      style={styles.stretch}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
    <Text>如果有妹妹好了</Text>
    <Text>11/26 更新至第 8 集</Text>
    <View style={styles.favorite}>
      <MaterialCommunityIcons name="heart" size={26}/>
    </View>
    <View style={styles.watchNumber}>
      <MaterialCommunityIcons name="heart" size={26}/>
      <Text>745735</Text>
    </View>
  </View>
);

// 建立一張張卡片 , 根據手機方向 , 決定左右放多少元素 ,
// |---|
// |   | : Portrait - 左右 2 個 , |------| : landscape - 左右 3 個
// |---|                         |------|
// 直式螢幕稱為「Portrait」，橫式螢幕「Landscape」
const ListScreen = ({navigation}) => (
  <Container>
    <Card text='good'/>
    <Card text='bad'/>
  </Container>
);

export default ListScreen;
