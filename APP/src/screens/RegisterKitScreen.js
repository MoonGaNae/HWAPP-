import React, {Component} from 'react';
import {View, StyleSheet, Button, TextInput, Linking} from 'react-native';

import axios from 'axios';

// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

export default class RegisterKitScreen extends Component {
  state = {
    message: 'test',
    serialNumber: '',
  };

  handleText = (text) => {
    this.setState({serialNumber: text});
  };

  goBack() {
    this.props.navigation.goBack();
  }

  registerKitbySerialNumber = () => {
    axios
      .post('https://hwapp-2020.herokuapp.com/kit/registUserKit', {
        userId: 'bang',
        kitCode: this.state.serialNumber,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.goBack();
  };

  static navigationOptions = {
    title: '키트 등록하기',
  };
  onSuccess = (e) => {
    this.state.message = e.data;
    Linking.openURL(e.data).catch((err) =>
      console.error('An error occured', err),
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          {/* <TouchableOpacity style={styles.backButtonStyle}>
            <Text onPress={() => this.props.navigation.goBack()}>{'<'}</Text>
          </TouchableOpacity> */}
        </View>
        {/* <View style={styles.titleView}>
          <Text style={styles.titleStyle}>키트 등록하기</Text>
        </View> */}
        <View style={styles.contentView}>
          <TextInput
            style={styles.textForm}
            placeholder={'시리얼 번호 입력'}
            onChangeText={this.handleText}
          />
          <Button
            title="등록"
            onPress={() => this.registerKitbySerialNumber()}
          />
        </View>
        <View style={styles.QRView}>
          {/* <QRCodeScanner
            onRead={this.onSuccess}
            flashMode={RNCamera.Constants.FlashMode.None}
          /> */}
        </View>
      </View>
    );
  }
}

// const AppNavigator = createStackNavigator(
//   {
//     RegisterKitScreen,
//     TMP,
//   },
//   {
//     defaultNavigationOptions: () => ({
//       headerShown: true,
//       headerTintColor: '#000',
//       headerStyle: {
//         backgroundColor: '#FFF',
//       },
//       headerBackTitle: ' ',
//     }),
//     initialRouteName: 'RegisterKitScreen',
//   },
// );
// export default createAppContainer(AppNavigator);

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
    backgroundColor: '#FFF',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  QRView: {
    width: '100%',
    height: '40%',
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
});

// import React, {Component} from 'react';

// import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';

// export default class ScanScreen extends Component {
//   onSuccess = (e) => {
//     Linking.openURL(e.data).catch((err) =>
//       console.error('An error occured', err),
//     );
//   };

//   render() {
//     return (
//       <QRCodeScanner
//         onRead={this.onSuccess}
//         flashMode={RNCamera.Constants.FlashMode.torch}
//         topContent={
//           <Text style={styles.centerText}>
//             Go to{' '}
//             <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
//             your computer and scan the QR code.
//           </Text>
//         }
//         bottomContent={
//           <TouchableOpacity style={styles.buttonTouchable}>
//             <Text style={styles.buttonText}>OK. Got it!</Text>
//           </TouchableOpacity>
//         }
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777',
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)',
//   },
//   buttonTouchable: {
//     padding: 16,
//   },
// });
