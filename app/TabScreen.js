import * as React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// screens
import PurchasedScreen from './screens/PurchasedScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ListScreen from './screens/ListScreen';
import VideoInfoScreen from './screens/VideoInfoScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

function getHeaderTitle(route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
    route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
    route.params?.screen || 'Feed';

  switch (routeName) {
    case 'Feed':
      return 'News feed';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="First" component={HomeScreen}/>
    <Stack.Screen name="Second" component={SettingsScreen}/>
    <Stack.Screen name="Third" component={FavoriteScreen}/>
  </Stack.Navigator>
);

const ListStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={ListScreen}/>
    <Stack.Screen name="VideoInfo" component={VideoInfoScreen}/>
  </Stack.Navigator>
);

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
          component={HomeStack}
          options={{
            tabBarLabel: '首頁',
            tabBarBadge: 10,
            tabBarColor: "#1b85ff",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" color={color} size={26}/>
          }}/>
        <Tab.Screen
          name="ListShow"
          component={ListStack}
          options={{
            tabBarLabel: '列表',
            tabBarBadge: true,
            tabBarColor: "#fcba03",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="library-books" color={color} size={26}/>
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
          name="Settings"
          component={PurchasedScreen}
          options={{
            tabBarLabel: '設定',
            tabBarBadge: 'N',
            tabBarColor: "#16c934",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="settings" color={color} size={26}/>
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
