/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BleModule from './BleModule';

import RBSheet from 'react-native-raw-bottom-sheet';

export default class App extends Component {
  static navigationOptions = {
    title: '커스터마이징',
  };
  constructor(props) {
    super(props);
    this.state = {
      scaning: false,
      isConnected: false,
      customValues: '',
      writeData: '',
      receiveData: '',
      readData: '',
      data: [],
      isMonitoring: false,
    };
    this.bluetoothReceiveData = [];
    this.deviceMap = new Map();
    this.BluetoothManager = new BleModule();
  }

  storageChapterStep = async () => {
    const kitCode = this.props.navigation.state.params.kitCode;
    await AsyncStorage.setItem('chapterStep' + kitCode, '4');
  };

  componentDidMount() {
    const chapterStep = this.props.navigation.state.params.chapterStep;
    if (chapterStep < 4) {
      this.storageChapterStep();
    }
    this.onStateChangeListener = this.BluetoothManager.manager.onStateChange(
      (state) => {
        console.log('onStateChange: ', state);
        if (state === 'PoweredOn') {
          this.scan();
        }
      },
    );
  }

  componentWillUnmount() {
    this.BluetoothManager.destroy();
    this.onStateChangeListener && this.onStateChangeListener.remove();
    this.disconnectListener && this.disconnectListener.remove();
    this.monitorListener && this.monitorListener.remove();
  }

  alert(customValues) {
    Alert.alert('에러', customValues, [
      {customValues: '확인', onPress: () => {}},
    ]);
  }

  scan() {
    if (!this.state.scaning) {
      this.setState({scaning: true});
      this.deviceMap.clear();
      this.BluetoothManager.manager.startDeviceScan(
        null,
        null,
        (error, device) => {
          if (error) {
            console.log('startDeviceScan error:', error);
            if (error.errorCode === 102) {
              this.alert('핸드폰 블루투스를 켜세요');
            }
            this.setState({scaning: false});
          } else {
            console.log(device.id, device.name);
            this.deviceMap.set(device.id, device);
            this.setState({data: [...this.deviceMap.values()]});
          }
        },
      );
      this.scanTimer && clearTimeout(this.scanTimer);
      this.scanTimer = setTimeout(() => {
        if (this.state.scaning) {
          this.BluetoothManager.stopScan();
          this.setState({scaning: false});
        }
      }, 1000); //1초 후 스캔 중지
    } else {
      this.BluetoothManager.stopScan();
      this.setState({scaning: false});
    }
  }

  connect(item) {
    if (this.state.scaning) {
      //연결할 때 스캔 중이면 중지
      this.BluetoothManager.stopScan();
      this.setState({scaning: false});
    }
    if (this.BluetoothManager.isConnecting) {
      console.log(
        '현재 블루투가 연결되어 있어 다른 블루투스는 연결할 수 없습니다.',
      );
      return;
    }
    let newData = [...this.deviceMap.values()];
    newData[item.index].isConnecting = true; //연결 중
    this.setState({data: newData});
    this.BluetoothManager.connect(item.item.id)
      .then((device) => {
        newData[item.index].isConnecting = false;
        this.setState({data: [newData[item.index]], isConnected: true});
        this.onDisconnect();
      })
      .catch((err) => {
        newData[item.index].isConnecting = false;
        this.setState({data: [...newData]});
        this.alert(err);
      });
  }

  // read=(index)=>{
  //     BluetoothManager.read(index)
  //         .then(value=>{
  //             this.setState({readData:value});
  //         })
  //         .catch(err=>{

  //         })
  // }

  write = (index, type) => {
    console.log(index);
    if (this.state.customValues.length === 0) {
      console.log(this.BluetoothManager.writeWithResponseCharacteristicUUID);
      this.alert('정보를 입력하십시오.');
      return;
    }
    this.BluetoothManager.write(this.state.customValues, index, type)
      .then((characteristic) => {
        this.bluetoothReceiveData = [];
        this.setState({
          writeData: this.state.customValues,
          customValues: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //연결 해제
  onDisconnect() {
    this.disconnectListener = this.BluetoothManager.manager.onDeviceDisconnected(
      this.BluetoothManager.peripheralId,
      (error, device) => {
        if (error) {
          //error시 자동으로 연결 해제
          console.log('onDeviceDisconnected', 'device disconnect', error);
          this.setState({
            data: [...this.deviceMap.values()],
            isConnected: false,
          });
        } else {
          this.disconnectListener && this.disconnectListener.remove();
          console.log(
            'onDeviceDisconnected',
            'device disconnect',
            device.id,
            device.name,
          );
        }
      },
    );
  }

  //연결 해제
  disconnect() {
    this.BluetoothManager.disconnect()
      .then((res) => {
        this.setState({data: [...this.deviceMap.values()], isConnected: false});
      })
      .catch(() => {
        this.setState({data: [...this.deviceMap.values()], isConnected: false});
      });
  }

  renderItem = (item) => {
    let data = item.item;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={this.state.isConnected ? true : false}
        onPress={() => {
          this.connect(item);
        }}
        style={styles.item}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>{data.name ? data.name : ''}</Text>
          <Text style={{color: 'red', marginLeft: 50}}>
            {data.isConnecting ? '연결 중...' : ''}
          </Text>
        </View>
        <Text>{data.id}</Text>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View style={{marginTop: 20}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.buttonView,
            {marginHorizontal: 10, height: 40, alignItems: 'center'},
          ]}
          onPress={
            this.state.isConnected
              ? this.disconnect.bind(this)
              : this.scan.bind(this)
          }>
          <Text style={styles.buttonText}>
            {this.state.scaning
              ? '검색 중'
              : this.state.isConnected
              ? '블루투스 연결끊기'
              : '블루투스 검색'}
          </Text>
        </TouchableOpacity>

        <Text style={{marginLeft: 10, marginTop: 10}}>
          {this.state.isConnected
            ? '현재 연결된 디바이스'
            : '사용가능한 디바이스'}
        </Text>
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View style={{marginBottom: 30}}>
        {this.state.isConnected ? (
          <View>
            {this.renderWriteView(
              '데이터 쓰기(write)：',
              '보내기',
              this.BluetoothManager.writeWithUUID,
              this.write,
            )}
          </View>
        ) : (
          <View style={{marginBottom: 20}} />
        )}
      </View>
    );
  };

  renderWriteView = (label, buttonText, characteristics, onPress, state) => {
    if (characteristics.length === 0) {
      return null;
    }
    var index = this.BluetoothManager.findUuidIndex(characteristics);
    return (
      <View style={{marginHorizontal: 10, marginTop: 30}} behavior="padding">
        <Text style={{color: 'black'}}>{label}</Text>
        <Text style={styles.content}>{this.state.writeData}</Text>

        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          style={styles.buttonView}
          onPress={() => {
            onPress(index);
          }}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderReceiveView = (label, buttonText, characteristics, onPress, state) => {
    if (characteristics.length === 0) {
      return null;
    }
    return (
      <View style={{marginHorizontal: 10, marginTop: 30}}>
        <Text style={{color: 'black', marginTop: 5}}>{label}</Text>
        <Text style={styles.content}>{state}</Text>
        {characteristics.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonView}
              onPress={() => {
                onPress(index);
              }}
              key={index}>
              <Text style={styles.buttonText}>
                {buttonText} ({item})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  RenderCustomContent = () => {
    const kitCode = this.props.navigation.state.params.kitCode;
    console.log(this.state.customValues);
    if (kitCode === 'ABC-A') {
      return (
        <View>
          <Text>색상1</Text>
          <RNPickerSelect
            onValueChange={(value) => this.setState({customValues: value})}
            items={[
              {label: 'RED', value: 'r'},
              {label: 'GREEN', value: 'g'},
              {label: 'BLUE', value: 'b'},
            ]}
          />
        </View>
      );
    } else if (kitCode === 'ABC-B') {
      return (
        <View>
          <Text>변경할 비밀번호</Text>
          <TextInput
            style={styles.textForm}
            keyboardType="numeric"
            maxLength={4}
            placeholder={'비밀번호 입력'}
            onChangeText={(value) =>
              this.setState({customValues: 'pw' + value})
            }
          />
        </View>
      );
    }
  };

  render() {
    const kitCode = this.props.navigation.state.params.kitCode;
    console.log(kitCode);
    return (
      <View style={styles.container}>
        <View style={styles.titleView} />
        <View style={styles.contentView}>
          <this.RenderCustomContent />
        </View>
        <View style={styles.footerView}>
          <TouchableOpacity
            onPress={() => this.Standard.open()}
            style={styles.sendButton}>
            <Text style={styles.buttonTitle}>전송</Text>
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={(ref) => {
            this.Standard = ref;
          }}
          height={700}
          openDuration={250}
          customStyles={{
            container: {
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <FlatList
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            data={this.state.data}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            extraData={[
              this.state.isConnected,
              this.state.customValues,
              this.state.receiveData,
              this.state.readData,
              this.state.writeData,
              this.state.isMonitoring,
              this.state.scaning,
            ]}
            keyboardShouldPersistTaps="handled"
          />
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    borderColor: 'rgb(235,235,235)',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    paddingVertical: 8,
  },
  buttonView: {
    height: 30,
    backgroundColor: 'rgb(33, 150, 243)',
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  content: {
    marginTop: 5,
    marginBottom: 15,
  },
  textInput: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
    height: 50,
    fontSize: 16,
    flex: 1,
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
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'center',
    width: '90%',
  },
  footerView: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: 50,
    //fontFamily: 'NanumSquareRoundB',
  },
  buttonStyle: {
    height: 100,
  },
  sendButton: {
    minWidth: 140,
    height: 40,
    backgroundColor: '#4EB1D1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dataWrapper: {
    marginTop: 0,
    marginLeft: 20,
    width: '95%',
  },
});
