import * as React from 'react';
import {Image, StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity} from "react-native";
import styled from 'styled-components/native'; // https://levelup.gitconnected.com/using-styled-components-with-react-native-de645fcf4787
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {HeaderFactory} from '../components/NavigationHeader';

const Container = styled.View`
	flex: 1;
  flex-direction:row;
  background-color:#F5FCFF;
  paddingTop: ${getStatusBarHeight()};
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  box: {
    flex: 1,
    backgroundColor: '#6799ff',
    margin: 3
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favorite: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: 'rgba(255, 255, 0, 0.7)',
  },
  heart: {
    position: 'absolute',
    top: 2,
    right: 5,
  },
  watchNumber: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 10,
    backgroundColor: 'rgba(255,69,0, 0.7)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3
  }
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    favorite: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'r8694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'w8694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'g94a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '594a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '5efg4a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

// if height > width, then orientation is portrait, otherwise landscape
const isPortrait = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return windowHeight > windowWidth;
};

const getOrientation = () => isPortrait() ? 'portrait' : 'landscape';

const Card = ({navigation, text, favorite}) => (
  <View style={styles.box}>
    <TouchableOpacity onPress={() => navigation.navigate('VideoInfo')}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/card_one.png')}
          resizeMode='center' // cover . contain . stretch . repeat . center
        />
        <View style={styles.favorite}>
          <MaterialCommunityIcons style={styles.heart} color={favorite ? 'red' : 'white'} name="heart" size={26}/>
        </View>
        <View style={styles.watchNumber}>
          <MaterialCommunityIcons name="fire" size={26}/>
          <Text>745735</Text>
        </View>
      </View>
      <Text>如果有妹妹好了</Text>
      <Text>11/26 更新至第 8 集</Text>
    </TouchableOpacity>
  </View>
);

// 建立一張張卡片 , 根據手機方向 , 決定左右放多少元素 ,
// |---|
// |   | : Portrait - 左右 2 個 , |------| : landscape - 左右 3 個
// |---|                         |------|
// 直式螢幕稱為「Portrait」，橫式螢幕「Landscape」
class ListScreen extends React.Component {

  static navigationOptions = ({navigation}) => HeaderFactory.create({
    title: '動畫列表',
    titleStyle: {},
    navigation
  });

  constructor() {
    super();
    this.state = {
      // 參考資料 : https://medium.com/@mridultripathi/effectively-change-orientation-in-react-native-and-detect-device-type-8b9f69d669d6
      orientation: getOrientation()
    };
  }

  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: getOrientation()
      })
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          // Dynamically changing numColumns is not support to FlatList , so we need key to force reRender
          key={this.state.orientation}
          data={DATA}
          renderItem={({item}) => (
            <Card {...item} navigation={this.props.navigation}/>
          )}
          keyExtractor={item => item.id}
          numColumns={this.state.orientation === 'portrait' ? 2 : 4}
          horizontal={false}
        />
      </SafeAreaView>
    )
  }
}

export default ListScreen;
