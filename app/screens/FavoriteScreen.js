import * as React from 'react';
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const FavoriteScreen = () => (
  <View style={styles.container}>
    <Text>喜好</Text>
  </View>
);

export default FavoriteScreen;
