import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// screens
import PurchasedScreen from './screens/PurchasedScreen';
import FavoriteScreen from './screens/FavoriteScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#0d0c0c"
        shifting
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: '首頁',
            tabBarBadge: 10,
            tabBarColor: "#1b85ff",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" color={color} size={26}/>
          }}/>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: '設定',
            tabBarBadge: true,
            tabBarColor: "#fcba03",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="settings" color={color} size={26}/>
          }}/>
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            tabBarLabel: '收藏',
            tabBarColor: "#0fbddb",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="heart" color={color} size={26}/>
          }}/>
        <Tab.Screen
          name="Purchased"
          component={PurchasedScreen}
          options={{
            tabBarLabel: '購買',
            tabBarBadge: 'N',
            tabBarColor: "#16c934",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="google-play" color={color} size={26}/>
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
