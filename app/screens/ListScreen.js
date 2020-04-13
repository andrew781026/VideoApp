import * as React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import styled from 'styled-components/native'; // https://levelup.gitconnected.com/using-styled-components-with-react-native-de645fcf4787
import {getStatusBarHeight} from 'react-native-status-bar-height';

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
  }
});

const ListScreen = ({navigation}) => (
  <Container>
    <View style={styles.box}>
      <Text>Good</Text>
    </View>
    <View style={styles.box}>
      <Text>Bad</Text>
    </View>
  </Container>
);

export default ListScreen;
