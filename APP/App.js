import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Button,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
  Image,
} from 'react-native';
import axios from 'axios';

import {Table} from 'react-native-table-component';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import KitInfoButton from './src/styles/KitItem';

import KitInfo from './src/screens/KitInfo';
import RegisterKitScreen from './src/screens/RegisterKitScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    kitInfo: [],
    serialNumber: '',
  };

  handleText = (text) => {
    this.setState({serialNumber: text});
  };

  loadKitInfo = async () => {
    console.log('load');
    await axios
      .get('https://hwapp-2020.herokuapp.com/kit/getKitinfo?userId=bang')
      .then((response) => this.setState({kitInfo: response.data}));
  };

  registerKitbySerialNumber = async () => {
    await axios
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
    console.log('register');
    this.loadKitInfo();
    this.setState({serialNumber: ''});
  };

  componentDidMount() {
    this.loadKitInfo();
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.loadKitInfo();
      //Put your Data loading function here instead of my this.LoadData()
    });
    //this.loadKitInfo();
  }

  deleteInfo = async () => {
    await axios
      .delete('https://hwapp-2020.herokuapp.com/kit/deleteUserKitInfo')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    this.loadKitInfo();
    AsyncStorage.clear();
  };

  render() {
    const {kitInfo} = this.state;
    console.log(kitInfo);

    var {navigate} = this.props.navigation;

    const tableData = [];
    for (let i = 0; i < kitInfo.length; i += 1) {
      const rowData = [];
      rowData.push(`${i}`);

      tableData.push(rowData);
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <View style={styles.statusBar}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" ax />
          </View>
          <View style={styles.headerView} />
          <View style={styles.titleView}>
            <Image style={styles.logo} source={require('./assets/logo.png')} />
            <Button title="delete" onPress={() => this.deleteInfo()} />
          </View>
          <View style={styles.contentView}>
            <View style={styles.registerView}>
              <TextInput
                style={styles.textForm}
                placeholder={'시리얼 번호 입력'}
                onChangeText={this.handleText}
                value={this.state.serialNumber}
                returnKeyType="done"
                clearButtonMode="always"
                placeholderTextColor="#BDBDBD"
                onSubmitEditing={() => this.registerKitbySerialNumber()}
              />
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.registerKitbySerialNumber()}>
                <Text style={styles.buttonTitle}>등록</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tableContainer}>
              <View>
                <ScrollView style={styles.dataWrapper}>
                  <Table>
                    {tableData.map((rowData, index) =>
                      rowData.map(() => (
                        <KitInfoButton
                          buttonColor={'#FFF'}
                          title={kitInfo[index].kitName}
                          onPress={() =>
                            navigate('KitInfo', {
                              kitInfo: kitInfo,
                              index: index,
                            })
                          }
                        />
                      )),
                    )}
                  </Table>
                </ScrollView>
              </View>
            </View>
            <View>
              <Text>{this.state.children}</Text>
            </View>
          </View>
          <View style={styles.footerView} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    HomeScreen,
    RegisterKitScreen,
    KitInfo,
  },
  {
    defaultNavigationOptions: () => ({
      headerShown: false,
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#FFF',
      },
      headerBackTitle: ' ',
    }),
    initialRouteName: 'HomeScreen',
  },
);
export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#FFF',
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
    //backgroundColor: '#9aa9ff',
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: '#d6ca1a',
    flexDirection: 'column',
    marginTop: '6%',
  },
  registerView: {
    marginTop: 20,
    height: '11%',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3AE5D1',
    flexDirection: 'row',
    borderRadius: 50,
  },
  footerView: {
    width: '100%',
    height: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1ad657',
  },
  titleStyle: {
    fontSize: 70,
    // fontFamily: 'NanumSquareRoundB',
  },
  tableContainer: {width: '90%', flex: 1, padding: 10, paddingTop: 20},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
  borderStyle: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  textForm: {
    width: '85%',
    height: '94%',
    borderWidth: 5,
    borderColor: '#3AE5D1',
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  buttonStyle: {
    width: 50,
  },
  buttonTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: '60%',
    height: '60%',
  },
});
