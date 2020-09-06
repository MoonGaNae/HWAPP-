import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, AsyncStorage, Alert} from 'react-native';
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
    isRegisterAnswer: '',
  }

  loadQuiz = async() => {
    const kitCode = this.props.navigation.state.params.kitCode;
    await axios.get('https://hwapp-2020.herokuapp.com/kit/getQuizIdx?kitCode='+kitCode)
    .then((response) => this.setState({quiz: response.data}));
  };

  registerAlert = () => {
    Alert.alert(
      '답변을 등록하실건가요?',
      '한 번 등록하시면 다시 작성하실 수 없습니다',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK', 
          onPress: () => this.registerAnswer()
        },
      ],
      {cancelable: false},
    );
  };

  registerAnswer = async() => {
    const kitCode = this.props.navigation.state.params.kitCode;
    for (var i = 0; i < this.state.answers.length; i++) {
      await axios.post('https://hwapp-2020.herokuapp.com/kit/registQuizAnswer', {
        userId: 'bang',
        quizIdx: this.state.answers[i].quizIdx,
        answer: this.state.answers[i].answer,
      }).then(() => console.log('register'));
    }
    await AsyncStorage.setItem('isRegisterAnswer' + kitCode, '1');
    this.props.navigation.goBack();
  };

  getStorageIsRegisterAnswer = async() => {
    const kitCode = this.props.navigation.state.params.kitCode;
    const storageIsRegisterAnswer = await AsyncStorage.getItem(
      'isRegisterAnswer' + kitCode,
    );
    this.setState({isRegisterAnswer: storageIsRegisterAnswer});
    console.log(storageIsRegisterAnswer);
  };

  componentDidMount = async() => {
    await this.loadQuiz();
    for (var i = 0; i < this.state.quiz.length; i++) {
      this.state.answers[i] = {'quizIdx': this.state.quiz[i].quizIdx, 'answer': ''}
    }
    console.log(this.state.answers);
    this.getStorageIsRegisterAnswer();
  };

  renderRegisterButton = () => {
    if (this.state.isRegisterAnswer === '0') {
      return (
        <FucntionButton
          buttonColor={'#3AE5D1'}
          title={'답변 등록하기'}
          disabled={false}
          onPress={() => this.registerAlert()}
        />
      );
    } else {
      return <FucntionButton buttonColor={'#DBDBDB'} title={'답변 등록하기'} />;
    }
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
              <View style={{margin: '2%', alignItems: 'flex-end'}}>
                <this.renderRegisterButton />
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
