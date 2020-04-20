import * as React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Draggable from "../components/Draggable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const HomeScreen = ({navigation}) => (
  <View style={styles.container}>
    <Text>Home!</Text>
    <Button
      onPress={() => navigation.navigate('Second')}
      title="Go To Second"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
    <Draggable/>
  </View>
);

export default HomeScreen;
