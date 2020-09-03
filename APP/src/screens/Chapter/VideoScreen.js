import React, * as react from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import YouTube from 'react-native-youtube';
import Axios from 'axios';

export default class KitInfo extends react.Component {
  static navigationOptions = {
    title: '조립 영상',
  };

  state = {
    videoURL: '',
  };

  loadVideoURL = async () => {
    const kitCode = this.props.navigation.state.params.kitCode;
    await Axios.get(
      'https://hwapp-2020.herokuapp.com/kit/getKitVideoURL?kitCode=' + kitCode,
    )
      .then((response) => this.setState({videoURL: response.data.kitVideoURL}))
      .then(() => console.log(this.state.videoURL));
  };

  storageChapterStep = async () => {
    const kitCode = this.props.navigation.state.params.kitCode;
    console.log(kitCode);
    await AsyncStorage.setItem('chapterStep' + kitCode, '2');
  };

  componentDidMount() {
    this.loadVideoURL();
    const chapterStep = this.props.navigation.state.params.chapterStep;
    if (chapterStep < 2) {
      this.storageChapterStep();
    }
  }

  render() {
    const {videoURL} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          <YouTube
            videoId={videoURL} // The YouTube video ID
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={(e) => this.setState({isReady: true})}
            onChangeState={(e) => this.setState({status: e.state})}
            onChangeQuality={(e) => this.setState({quality: e.quality})}
            onError={(e) => this.setState({error: e.error})}
            style={styles.videoStyle}
          />
        </View>
        <View style={styles.footerView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoStyle: {
    alignSelf: 'stretch',
    height: 300,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  headerView: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9aa9ff',
  },
  contentView: {
    flex: 1,
    alignContent: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  footerView: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  titleStyle: {
    fontSize: 50,
    //fontFamily: 'NanumSquareRoundB',
  },
  backButtonStyle: {
    position: 'absolute',
    left: 10,
    top: '50%',
  },
  ChapterButtonStyle: {
    width: '80%',
    height: 190,
    alignItems: 'center',
    backgroundColor: 'powderblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
