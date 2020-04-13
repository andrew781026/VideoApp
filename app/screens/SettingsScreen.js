import * as React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const SettingsScreen = ({navigation}) => (
  <View style={styles.container}>
    <Text>Settings!</Text>
    <Button
      onPress={() => navigation.navigate('List')}
      title="Go To List"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
);

export default SettingsScreen;
