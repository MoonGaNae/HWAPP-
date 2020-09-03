import React, {Component} from 'react';
import {View, StyleSheet, Text, AsyncStorage} from 'react-native';
import ChapterButton from '../styles/ChapterButton';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import VideoScreen from './Chapter/VideoScreen';
import CodeCoach from './Chapter/CodeCoach';
import CustomCode from './Chapter/CustomCode';
import Quiz from './Chapter/Quiz';

class KitInfo extends Component {
  static navigationOptions = {
    title: '키트 정보',
  };

  state = {
    chapterStep: 1,
    kitCode: '',
    kitName: '',
  };

  loadChapterStep = async () => {
    const index = this.props.navigation.state.params.index;
    const kitCode = this.props.navigation.state.params.kitInfo[index].kitCode;
    const kitName = this.props.navigation.state.params.kitInfo[index].kitName;
    this.setState({kitCode: kitCode});
    this.setState({kitName: kitName});

    const storageChapterStep = await AsyncStorage.getItem(
      'chapterStep' + kitCode,
    );
    if (storageChapterStep === null) {
      this.setState({chapterStep: '1'});
      AsyncStorage.setItem('chapterStep' + kitCode, '1');
    } else {
      console.log('storage: ' + storageChapterStep);
      this.setState({chapterStep: storageChapterStep});
    }
  };

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.loadChapterStep();
      //Put your Data loading function here instead of my this.LoadData()
    });
  }

  render() {
    var {navigate} = this.props.navigation;

    const {chapterStep} = this.state;

    const {kitCode} = this.state;

    const {kitName} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <View style={styles.titleStyle}>
            <Text style={styles.titleTextStyle}>{kitName}</Text>
          </View>
        </View>
        <View style={styles.contentView}>
          <View style={styles.ChapterButtonStyle}>
            <ChapterButton
              buttonColor={chapterStep < 1 ? '#DBDBDB' : '#3AE5D1'}
              title={'조립영상'}
              onPress={() => {
                navigate('VideoScreen', {
                  kitCode: kitCode,
                  chapterStep: chapterStep,
                });
              }}
              disabled={chapterStep < 1}
            />
            <ChapterButton
              buttonColor={chapterStep < 2 ? '#DBDBDB' : '#3AE5D1'}
              title={'코드설명'}
              onPress={() => {
                navigate('CodeCoach', {
                  kitCode: kitCode,
                  chapterStep: chapterStep,
                });
              }}
              disabled={chapterStep < 2}
            />
          </View>
          <View style={styles.ChapterButtonStyle}>
            <ChapterButton
              buttonColor={chapterStep < 3 ? '#DBDBDB' : '#3AE5D1'}
              title={'커스터마이징'}
              onPress={() => {
                navigate('CustomCode', {
                  kitCode: kitCode,
                  chapterStep: chapterStep,
                });
              }}
              disabled={chapterStep < 3}
            />
            <ChapterButton
              buttonColor={chapterStep < 4 ? '#DBDBDB' : '#3AE5D1'}
              title={'퀴즈'}
              onPress={() => {
                navigate('Quiz', {
                  kitCode: kitCode,
                  chapterStep: chapterStep,
                });
              }}
              disabled={chapterStep < 4}
            />
          </View>
        </View>
        <View style={styles.footerView} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    KitInfo,
    VideoScreen,
    CodeCoach,
    CustomCode,
    Quiz,
  },
  {
    defaultNavigationOptions: () => ({
      headerShown: true,
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#FFF',
      },
      headerBackTitle: ' ',
    }),
    initialRouteName: 'KitInfo',
  },
);
export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
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
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  titleStyle: {
    width: '60%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#3AE5D1',
    borderWidth: 5,
    borderRadius: 50,
  },
  contentView: {
    flex: 1,
    width: '100%',
    alignContent: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  footerView: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  titleTextStyle: {
    fontSize: 40,
    //: 'NanumSquareRoundB',
  },
  backButtonStyle: {
    position: 'absolute',
    left: 10,
    top: '50%',
  },
  ChapterButtonStyle: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
