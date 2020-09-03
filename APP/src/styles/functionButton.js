import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class CustomButton extends Component {
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#000',
    titleColor: '#fff',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: this.props.buttonColor}]}
        onPress={this.props.onPress}>
        <Text style={[styles.title]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    minWidth: 140,
    height: 40,
    backgroundColor: '#3AE5D1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    //fontFamily: 'NanumSquareRoundB',
  },
});
