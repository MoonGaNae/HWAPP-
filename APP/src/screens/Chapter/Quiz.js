import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class KitInfo extends Component {
  static navigationOptions = {
    title: '퀴즈',
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.headerView}>
          <TouchableOpacity style={styles.backButtonStyle}>
            <Text onPress={() => this.props.navigation.goBack()}>뒤로가기</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.titleView}>
          <Text style={styles.titleStyle}>퀴즈</Text>
        </View> */}
        <View style={styles.contentView} />
        <View style={styles.footerView} />
      </View>
    );
  }
}

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
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentView: {
    flex: 1,
    alignContent: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footerView: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
