import * as React from 'react';
import {Image, StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity} from "react-native";
import styled from 'styled-components/native'; // https://levelup.gitconnected.com/using-styled-components-with-react-native-de645fcf4787
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {HeaderFactory} from '../components/NavigationHeader';
import moment from 'moment';

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
    height: 140,
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

function guidGenerator() {

  /**
   * @return {string}
   */
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const DATA = [
  {
    id: guidGenerator(),
    title: '狼與辛香料',
    imageSrc: require('../assets/wolf-and-salt.jpg'),
    updateAt: new Date(2020, 3, 10, 5, 10, 22, 33),
    totalVideoNumber: 8,
    favorite: true,
    watchNumber: 1573,
  },
  {
    id: guidGenerator(),
    title: '飛天小女警',
    imageSrc: require('../assets/flying-cop-girls.jpg'),
    updateAt: new Date(2020, 4, 9, 2, 7, 1, 5),
    totalVideoNumber: 7,
    favorite: true,
    watchNumber: 21648,
  },
  {
    id: guidGenerator(),
    title: 'Keroro軍曹',
    imageSrc: require('../assets/keroro.jpg'),
    updateAt: new Date(2020, 2, 18, 21, 8, 17, 147),
    totalVideoNumber: 3,
    watchNumber: 14516,
  },
  {
    id: guidGenerator(),
    title: '飛天少女豬',
    imageSrc: require('../assets/flying-pig.jpg'),
    updateAt: new Date(2020, 3, 10, 5, 10, 22, 33),
    totalVideoNumber: 10,
    favorite: true,
    watchNumber: 584515,
  },
  {
    id: guidGenerator(),
    title: '校園嬌娃',
    imageSrc: require('../assets/totally-spies.jpg'),
    updateAt: new Date(2020, 3, 10, 5, 10, 22, 33),
    totalVideoNumber: 9,
    watchNumber: 562562,
  },
  {
    id: guidGenerator(),
    title: '德克斯特的實驗室',
    imageSrc: require('../assets/dexter-lab.jpg'),
    updateAt: new Date(2020, 3, 10, 5, 10, 22, 33),
    totalVideoNumber: 11,
    favorite: true,
    watchNumber: 486528,
  },
  {
    id: guidGenerator(),
    title: '膽小狗英雄',
    imageSrc: require('../assets/frighten-dog.jpg'),
    updateAt: new Date(2020, 3, 10, 5, 10, 22, 33),
    totalVideoNumber: 8,
    favorite: true,
    watchNumber: 5240,
  },
  {
    id: guidGenerator(),
    title: '愛書的下克上',
    imageSrc: require('../assets/love-book-avenge.jpg'),
    updateAt: new Date(2020, 3, 10, 5, 10, 22, 33),
    totalVideoNumber: 8,
    favorite: true,
    watchNumber: 52751,
  },
];

// if height > width, then orientation is portrait, otherwise landscape
const isPortrait = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return windowHeight > windowWidth;
};

const getOrientation = () => isPortrait() ? 'portrait' : 'landscape';

const Card = ({navigation, id, title, imageSrc, updateAt, totalVideoNumber, favorite, watchNumber,}) => (
  <View style={styles.box}>
    <TouchableOpacity onPress={() => navigation.navigate('VideoInfo')}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={imageSrc}
          resizeMode='contain' // cover . contain . stretch . repeat . center
        />
        <View style={styles.favorite}>
          <MaterialCommunityIcons style={styles.heart} color={favorite ? 'red' : 'white'} name="heart" size={26}/>
        </View>
        <View style={styles.watchNumber}>
          <MaterialCommunityIcons name="fire" size={26}/>
          <Text>{watchNumber}</Text>
        </View>
      </View>
      <Text>{title}</Text>
      <Text>{moment(updateAt).format('MM/DD')} 更新至第 {totalVideoNumber} 集</Text>
    </TouchableOpacity>
  </View>
);

// 直式螢幕稱為「Portrait」，橫式螢幕「Landscape」
class ListScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      // 參考資料 : https://medium.com/@mridultripathi/effectively-change-orientation-in-react-native-and-detect-device-type-8b9f69d669d6
      orientation: getOrientation()
    };
  }

  componentDidMount() {

    // set Header , 參考資料 : https://reactnavigation.org/blog/2020/02/06/react-navigation-5.0/
    this.props.navigation.setOptions({
      title: '懷舊動畫列表',
    });

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
