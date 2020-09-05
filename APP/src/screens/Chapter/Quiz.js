import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';
import {Pages} from 'react-native-pages';
import axios from 'axios';
import FucntionButton from '../../styles/functionButton';

export default class KitInfo extends Component {
  static navigationOptions = {
    title: '퀴즈',
  };

  state = {
    quiz: [],
    answers: [],
  }

  loadQuiz = async() => {
    const kitCode = this.props.navigation.state.params.kitCode;
    await axios.get('https://hwapp-2020.herokuapp.com/kit/getQuizIdx?kitCode='+kitCode)
    .then((response) => this.setState({quiz: response.data}));
  };

  registerAnswer = async() => {
    for (var i = 0; i < this.state.answers.length; i++) {
      await axios.post('https://hwapp-2020.herokuapp.com/kit/egistQuizAnswer', {
        userId: 'bang',
        quizIdx: this.state.answers[i].quizIdx,
        answer: this.state.answers[i].answer,
      })
    }
  };

  componentDidMount = async() => {
    await this.loadQuiz();
    for (var i = 0; i < this.state.quiz.length; i++) {
      this.state.answers[i] = {'quizIdx': this.state.quiz[i].quizIdx, 'answer': ''}
    }
    console.log(this.state.answers);
  };

  render() {
    var pages = [];

    const {quiz} = this.state;

    for (let i = 0; i < quiz.length; i++) {
      if (i == quiz.length-1) {
        pages.push(
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.contentView}>
              <Text style={styles.quizTitle}>{i+1}. {quiz[i].question}</Text>
              <View style={styles.contentView}></View>
              <View style={{marginBottom: '1%', alignItems: 'flex-end'}}>
                <FucntionButton
                  style={{width: '50%'}}
                  buttonColor={'#3AE5D1'}
                  title={'답변 등록하기'}
                  onPress={() => console.log(this.state.answers)}
                />
              </View>
              <View style={styles.answerSheetView}>
                <TextInput
                  multiline={true}
                  onChangeText={(text) => this.state.answers[i].answer = text}
                  placeholderTextColor="#BDBDBD"
                  placeholder={'생각하시는 답을 적어주세요!'}
                  style={styles.textForm}
                />
              </View>
            </View>
            <View style={styles.navView} />
          </View>
        );
      }
      else {
        pages.push(
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.contentView}>
              <Text style={styles.quizTitle}>{i+1}. {quiz[i].question}</Text>
              <View style={styles.contentView}></View>
              <View style={styles.answerSheetView}>
                <TextInput
                  multiline={true}
                  onChangeText={(text) => this.state.answers[i].answer = text}
                  placeholderTextColor="#BDBDBD"
                  placeholder={'생각하시는 답을 적어주세요!'}
                  style={styles.textForm}
                />
              </View>
            </View>
            <View style={styles.navView} />
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <Pages>{pages}</Pages>
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
  contentView: {
    flex: 1,
    width: '96%',
    margin: '2%',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  footerView: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  navView: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBB',
  },
  quizTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  answerSheetView: {
    height: '50%',
    borderWidth: 5,
    borderColor: '#3AE5D1',
    borderRadius: 20,
  },
  textForm: {
    margin: '2%',
    backgroundColor: '#00000000',
    textAlignVertical: 'top',
    fontSize: 20,
  },
});
