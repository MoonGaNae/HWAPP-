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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '100%',
    height: 60,
    marginBottom: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderTopColor: '#EFEFEF',
    borderLeftColor: '#EEEEEE',
    borderRightColor: '#EEEEEE',
    borderBottomColor: '#CBCBCB',
  },
  title: {
    fontSize: 30,
    color: '#3A3A3A',
  },
});
