import * as React from 'react';
import {StyleSheet, SafeAreaView, Dimensions, View, TouchableWithoutFeedback} from "react-native";
import {Video} from 'expo-av';
import {HeaderFactory} from '../components/NavigationHeader';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {PanGestureHandler} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  videoController: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

// if height > width, then orientation is portrait, otherwise landscape
const isPortrait = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return windowHeight > windowWidth;
};

const getOrientation = () => isPortrait() ? 'portrait' : 'landscape';

class VideoController extends React.Component {

  state = {
    mute: false,
    shouldPlay: false
  };

  handlePlayAndPause = () => {
    const playbackObject = this.props.getPlaybackObject();
    if (this.state.shouldPlay) playbackObject.pauseAsync();
    else playbackObject.playAsync();
    this.setState(prevState => ({shouldPlay: !prevState.shouldPlay}));
  };

  handleVolume = () => {
    const playbackObject = this.props.getPlaybackObject();
    playbackObject.setIsMutedAsync(!this.state.mute);
    this.setState(prevState => ({mute: !prevState.mute}));
  };

  render() {
    return (
      <View style={styles.controlBar}>
        <MaterialCommunityIcons
          name={this.state.mute ? "volume-mute" : "volume-high"}
          size={45}
          color="white"
          onPress={this.handleVolume}
        />
        <MaterialCommunityIcons
          name={this.state.shouldPlay ? "pause" : "play"}
          size={45}
          color="white"
          onPress={this.handlePlayAndPause}
        />
      </View>
    )
  }
}

// 直式螢幕稱為「Portrait」，橫式螢幕「Landscape」
class VideoInfoScreen extends React.Component {

  static navigationOptions = ({navigation}) => HeaderFactory.create({
    title: '動畫明細',
    titleStyle: {},
    navigation
  });

  state = {
    // 參考資料 : https://medium.com/@mridultripathi/effectively-change-orientation-in-react-native-and-detect-device-type-8b9f69d669d6
    orientation: getOrientation(),
  };

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

  // you need to custom your control bar , ref : https://medium.com/front-end-weekly/how-to-play-video-with-react-native-and-expo-30523bfcb311
  render() {

    /*
    * skip-backward : 到最前面 ( to 00:00 )
    * replay-10 : 向前 10 秒鐘 ( - 10 s )
    * forward-10 : 向後 10 秒鐘 ( + 10 s )
    * skip-forward : 到最後一秒 ( to last )
    * */

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
          <View style={styles.videoController}>
            <MaterialCommunityIcons name="skip-backward" size={26}/>
            <MaterialCommunityIcons name="replay-10" size={26}/>
            <MaterialCommunityIcons name="play" size={26}/>
            <MaterialCommunityIcons name="forward-10" size={26}/>
            <MaterialCommunityIcons name="skip-forward" size={26}/>
          </View>
          <Video
            ref={ref => this.playbackObject = ref}
            source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}} // https://youtu.be/FiGmAI5e91M
            rate={1.0}
            volume={1.0}
            shouldPlay={false}
            useNativeControls={true}
            isMuted={false}
            resizeMode="cover"
            style={{width: '100%', height: 300}}
          />
        </TouchableWithoutFeedback>
        {/* Pan Gesture is drag or flick */}
        <PanGestureHandler
          onGestureEvent={() => console.warn('Pan trigger')}
        >
          <View style={{width: '100%', height: 50, backgroundColor: '#854216'}}/>
        </PanGestureHandler>
        <VideoController
          ref={ref => this.controller = ref}
          getPlaybackObject={() => this.playbackObject}
        />
      </SafeAreaView>
    )
  }
}

export default VideoInfoScreen;
