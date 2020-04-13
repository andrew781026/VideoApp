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

const PurchasedScreen = () => (
  <View style={styles.container}>
    <Text>購買</Text>
  </View>
);

export default PurchasedScreen;
