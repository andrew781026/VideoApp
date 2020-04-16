import * as React from 'react';
import {StyleSheet, SafeAreaView, View, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {Video} from 'expo-av';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

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
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emptyController: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: 50,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class IconButton extends React.Component {

  // 等 0.5 秒 , 才執行動作
  handlePress = () => {
    this.props.onPress();
    setTimeout(this.props.afterPress, 500);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        {this.props.icon}
      </TouchableOpacity>
    );
  }
}

class MaskVideoController extends React.Component {

  state = {
    controllerShow: false,
    mute: false,
    shouldPlay: false,
    videoLength: 0,
    currentLength: 0,
    canplayLength: 0
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

  changeVideo = () => {
    // playbackObject.unloadAsync(); // Unloads the media from memory. loadAsync() must be called again in order to be able to play the media.
    // playbackObject.loadAsync(source, initialStatus = {}, downloadFirst = true);
  };

  _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      // 設定影音長度
      this.setState({
        videoLength: playbackStatus.durationMillis,
        currentLength: playbackStatus.positionMillis,
        canplayLength: playbackStatus.playableDurationMillis
      });
      // positionMillis : the current position of playback in milliseconds.
      // durationMillis : 影音長度
      // playableDurationMillis : 記憶體中載入長度
      // isBuffering : a boolean describing if the media is currently buffering.

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }

    }
  };

  componentDidMount() {

    // Load the playbackObject and obtain the reference.
    this.props.getPlaybackObject().setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={() => this.setState({controllerShow: !this.state.controllerShow})}>
        {this.state.controllerShow ? (
          <View style={styles.videoController}>
            <View style={styles.bottomBar}>
              <Text
                style={{color: 'white'}}> {this.state.currentLength} / {this.state.canplayLength} / {this.state.videoLength}</Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="skip-backward" color="white" size={40}/>
              <MaterialIcons name="replay-10" color="white" size={40}/>
              <IconButton
                onPress={this.handleVolume}
                afterPress={() => this.setState({controllerShow: false})}
                icon={
                  <MaterialCommunityIcons
                    name={this.state.mute ? "volume-mute" : "volume-high"}
                    size={40}
                    color="white"
                  />
                }
              />
              <IconButton
                onPress={this.handlePlayAndPause}
                afterPress={() => this.setState({controllerShow: false})}
                icon={
                  <MaterialCommunityIcons
                    name={this.state.shouldPlay ? "pause" : "play"}
                    size={40}
                    color="white"
                  />
                }
              />
              <MaterialIcons name="forward-10" color="white" size={40}/>
              <MaterialCommunityIcons name="skip-forward" color="white" size={40}/>
            </View>
          </View>
        ) : (
          <View style={styles.emptyController}/>
        )}
      </TouchableWithoutFeedback>
    );
  }
}

// 直式螢幕稱為「Portrait」，橫式螢幕「Landscape」
class VideoInfoScreen extends React.Component {

  // the video object
  playbackObject = null;

  videos = [
    'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_640_3MG.mp4'
  ];

  componentDidMount() {

    this.props.navigation.setOptions({
      title: '動畫撥放'
      // headerShown: false // hide the stack header
    });
  }

  // you need to custom your control bar , ref : https://medium.com/front-end-weekly/how-to-play-video-with-react-native-and-expo-30523bfcb311
  render() {

    /*
    * skip-backward : 到最前面 ( to 00:00 )
    * replay-10 : 向前 10 秒鐘 ( - 10 s )
    * forward-10 : 向後 10 秒鐘 ( + 10 s )
    * skip-forward : 到最後一秒 ( to last )
    * */

    /*
    *  you need webview to play youtube video
    *
      <WebView
              style={ styles.WebViewContainer }
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{uri: 'https://www.youtube.com/embed/YE7VzlLtp-4' }}
      />

    * */

    return (
      <SafeAreaView>
        <TouchableWithoutFeedback>
          <View style={{backgroundColor: 'rgba(0,0,0,0.3)', height: 300}}>
            <Video
              ref={ref => this.playbackObject = ref}
              source={{uri: this.videos[1]}}
              rate={1.0}
              volume={1.0}
              shouldPlay={false}
              isMuted={false}
              resizeMode="cover"
              style={{width: '100%', height: '100%',}}
            />
            <MaskVideoController getPlaybackObject={() => this.playbackObject}/>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}

export default VideoInfoScreen;
