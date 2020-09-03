import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {StackNavigator} from 'react-navigation'
import KitInfoButton from '../styles/KitItem';
import KitInfo from '../screens/KitInfo'
import RegisterKitScreen from '../screens/RegisterKitScreens';

// const Navigation = StackNavigator({
//   KitInfo:{screen: KitInfo},
// });

export default class KitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['키트 목록'],
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 1; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    const element = (data, index) => (
      <KitInfoButton
        buttonColor={'#3F3F3F'}
        title={'키트 '+(index+1)}
        onPress={()=>this.props.navigation.go()}
      />
    );

    return (
      <View style={styles.container}>
        <View>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {tableData.map((rowData, index) =>
                rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={element(cellData, index)}
                    textStyle={styles.text}
                  />
                )),
              )}
            </Table>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {width: '100%', flex: 1, padding: 10, paddingTop: 30},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});