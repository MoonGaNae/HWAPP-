/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Pages} from 'react-native-pages';
import FucntionButton from '../../styles/functionButton';

export default class KitInfo extends Component {
  static navigationOptions = {
    title: '코드설명',
  };

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: '',
      maxPage: 5,
      codeStep: '',
    };
  }

  storageChapterStep = () => {
    const kitCode = this.props.navigation.state.params.kitCode;
    AsyncStorage.setItem('chapterStep' + kitCode, '3');
  };

  loadCodeStep = async () => {
    const kitCode = this.props.navigation.state.params.kitCode;
    const storageCodeStep = await AsyncStorage.getItem('codeStep' + kitCode);
    if (storageCodeStep === null) {
      this.setState({codeStep: '0'});
      AsyncStorage.setItem('codeStep' + kitCode, '0');
    } else {
      this.setState({codeStep: storageCodeStep});
    }
  };

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.loadCodeStep();
      //Put your Data loading function here instead of my this.LoadData()
    });
  }

  checkCodeStep(codeStep, index) {
    const {maxPage} = this.state;
    const chapterStep = this.props.navigation.state.params.chapterStep;
    const kitCode = this.props.navigation.state.params.kitCode;
    if (codeStep < maxPage && index + 1 > codeStep) {
      this.setState({codeStep: index + 1});
      AsyncStorage.setItem('codeStep' + kitCode, String(index + 1));
    }
    if (index + 1 === maxPage && chapterStep < 3) {
      this.storageChapterStep();
    }
  }

  RenderCodeIamge = (props) => {
    const kitCode = this.props.navigation.state.params.kitCode;
    if (kitCode === 'ABC-A') {
      if (props.index === 0) {
        return <Image source={require('../../../assets/ABC-A/0.png')} r />;
      } else if (props.index === 1) {
        return <Image source={require('../../../assets/ABC-A/1.png')} />;
      } else if (props.index === 2) {
        return <Image source={require('../../../assets/ABC-A/2.png')} />;
      } else if (props.index === 3) {
        return <Image source={require('../../../assets/ABC-A/3.png')} />;
      } else if (props.index === 4) {
        return <Image source={require('../../../assets/ABC-A/4.png')} />;
      }
    } else {
      if (props.index === 0) {
        return <Image source={require('../../../assets/ABC-B/0.png')} />;
      } else if (props.index === 1) {
        return <Image source={require('../../../assets/ABC-B/1.png')} />;
      } else if (props.index === 2) {
        return <Image source={require('../../../assets/ABC-B/2.png')} />;
      } else if (props.index === 3) {
        return <Image source={require('../../../assets/ABC-B/3.png')} />;
      } else if (props.index === 4) {
        return <Image source={require('../../../assets/ABC-B/4.png')} />;
      }
    }
  };

  RenderExplain = (props) => {
    const kitCode = this.props.navigation.state.params.kitCode;
    if (kitCode === 'ABC-A') {
      if (props.index === 0) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              헤더파일(.h){'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              헤더파일이란, 외부 소스 파일에 정의된 변수나 함수를 쓰기 위해
              만들어진 파일입니다.{'\n'}
              즉, 해당 프로그램에서 사용할 수 있는 기능(함수)들의 코드들의
              집합이라고 생각하면 편합니다.{'\n'}
              {'\n'}
              쉽게 예를 들자면, 헤더파일은 음식점의 ‘메뉴판’과 같습니다.{'\n'}
              우리가 있는 음식점에 어떤 음식을 먹을 수 있는지 알려주는 게
              메뉴판이듯이,{'\n'}
              우리가 실행하는 프로그램에 어떤 기능을 사용할 수 있는지 알려주는
              게 헤더파일입니다.{'\n'}
              {'\n'}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              #include{'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              헤더파일을 사용하기 위해서 #include 를 꼭 써야 하고,{'\n'}
              전세계의 사람들이 표준으로 사용하는 헤더파일의 경우 {'<'} {'>'}로
              묶어줍니다.{'\n'}
              (단, 개인이 만든 헤더파일의 경우 “ “로 묶어줍니다.){'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 1) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>자료형{'\n'}</Text>
            <Text style={{fontSize: 20}}>
              자료형이란, 여러 종류의 문자를 컴퓨터가 쉽게 식별할 수 있도록
              분류한 것으로,{'\n'}
              정수는 int, 문자 한 개는 char, 숫자나 문자로 이루어진 문장은
              string 등으로 분류가 됩니다.{'\n'}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Struct{'\n'}</Text>
            <Text style={{fontSize: 20}}>
              struct이란, structure의 약자로, 구조체라고 합니다.{'\n'}
              즉, 여러 자료나 데이터들의 묶음이라고 생각하면 좋습니다.
              {'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 2) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              void setup(){'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              setup이라는 함수를 뜻하며, {'{'} {'}'} 안의 내용들은 setup이라는
              함수의 기능을 하게 됩니다.{'\n'}
              즉, void “함수명”() {'{'} {'}'} 형식으로 많이 쓰이며, {'\n'}
              setup같이 이 함수에 대해서 쉽게 알 수 있는 용어로 보통 작성합니다.
              {'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 3) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>반복문{'\n'}</Text>
            <Text style={{fontSize: 20}}>
              반복문이란, 프로그램 소스 코드 내에서 특정한 부분의 코드가
              반복적으로 수행될 수 있도록 한 구문입니다.
              {'\n'}
              대표적으로, for문과 while문이 있습니다.{'\n'}
              {'\n'}
              for문의 경우, for(초기화, 조건식, 증감문) 식으로 작성됩니다.{'\n'}
              초기화 : 반복문 안에서 사용할 변수를 초기화합니다.{'\n'}
              조건식 : 반복문 안쪽 코드가 실행되기 전 참/거짓 여부를 판별하는
              식입니다.{'\n'}
              증감문 : 반복문 안쪽 코드가 실행된 후에 실행되는 코드입니다.{'\n'}
              {'\n'}
              while문의 경우, while(조건식) 식으로 작성됩니다.{'\n'}
              그래서, 조건식이 계속 맞다면 while문 안의 코드들이 계속 진행하게
              됩니다.{'\n'}
              그리고 조건식이 틀렸을 때에 반복문을 그만둘 수 있습니다.{'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 4) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              RTC 모듈{'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              RTC 모듈이란, Real-Time Clock의 약자로,
              {'\n'}
              Real-Time : 실제 시간 / Clock : 시계 또는 정기적 신호를 뜻합니다.
              {'\n'}
              {'\n'}
              즉, 실제 시간에 맞춰 정기적 신호를 주는 장치입니다.{'\n'}
              {'\n'}
              한글시계의 경우, 실제 시간에 맞춰 신호를 줘야만 작동하기 때문에 꼭
              있어야 하는 장치입니다.{'\n'}
            </Text>
          </View>
        );
      }
    } else {
      if (props.index === 0) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              헤더파일(.h){'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              헤더파일이란, 외부 소스 파일에 정의된 변수나 함수를 쓰기 위해
              만들어진 파일입니다.{'\n'}
              즉, 해당 프로그램에서 사용할 수 있는 기능(함수)들의 코드들의
              집합이라고 생각하면 편합니다.{'\n'}
              {'\n'}
              쉽게 예를 들자면, 헤더파일은 음식점의 ‘메뉴판’과 같습니다.{'\n'}
              우리가 있는 음식점에 어떤 음식을 먹을 수 있는지 알려주는 게
              메뉴판이듯이,{'\n'}
              우리가 실행하는 프로그램에 어떤 기능을 사용할 수 있는지 알려주는
              게 헤더파일입니다.{'\n'}
              {'\n'}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              #include{'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              헤더파일을 사용하기 위해서 #include 를 꼭 써야 하고,{'\n'}
              전세계의 사람들이 표준으로 사용하는 헤더파일의 경우 {'<'} {'>'}로
              묶어줍니다.{'\n'}
              (단, 개인이 만든 헤더파일의 경우 “ “로 묶어줍니다.){'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 1) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>자료형{'\n'}</Text>
            <Text style={{fontSize: 20}}>
              자료형이란, 여러 종류의 문자를 컴퓨터가 쉽게 식별할 수 있도록
              분류한 것으로,{'\n'}
              정수는 int, 문자 한 개는 char, 숫자나 문자로 이루어진 문장은
              string 등으로 분류가 됩니다.{'\n'}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Struct{'\n'}</Text>
            <Text style={{fontSize: 20}}>
              struct이란, structure의 약자로, 구조체라고 합니다.{'\n'}
              즉, 여러 자료나 데이터들의 묶음이라고 생각하면 좋습니다.
              {'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 2) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>행렬{'\n'}</Text>
            <Text style={{fontSize: 20}}>
              행렬이란, 숫자 또는 식 등을 직사각형 모양으로 배열한 것입니다.
              {'\n'}
              즉, 표라고 생각하면 이해하기 쉽습니다.{'\n'}
              컴퓨터에서의 행렬 표시는 “행렬이름”[n][m] 으로 표시하며,
              {'\n'}
              {'\n'}
              n개의 가로와 m개의 세로가 있다는 의미입니다.{'\n'}
              예를 들어,{'\n'}
              keys[4][3] = {'{'} {'\n'}
              {'\t'}
              {'{'}‘1’, ‘2’, ‘3’{'}'},{'\n'}
              {'\t'}
              {'{'}‘4’, ‘5’, ‘6’{'}'},{'\n'}
              {'\t'}
              {'{'}‘7’, ‘8’, ‘9’{'}'},{'\n'}
              {'\t'}
              {'{'}‘*’, ‘0’, ‘#’{'}'}
              {'\n'}
              {'}'};{'\n'}가 의미하는 거는{'\n'}
              휴대전화의 키패드를 뜻합니다.{'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 3) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              void setPW(){'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              setPW이라는 함수를 뜻하며, {'{'} {'}'} 안의 내용들은 setPW이라는
              함수의 기능을 하게 됩니다.{'\n'}
              즉, void “함수명”() {'{'} {'}'} 형식으로 많이 쓰이며, {'\n'}
              setPW같이 이 함수에 대해서 쉽게 알 수 있는 용어로 보통 작성합니다.
              {'\n'}
            </Text>
          </View>
        );
      } else if (props.index === 4) {
        return (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>조건문{'\n'}</Text>
            <Text style={{fontSize: 20}}>
              조건문이란, “만약 ~라면 ~일 것이다”와 같이 주어진 조건에 따라서
              실행하는 문장을 말하며, 대표적으로 if문이 있습니다.
              {'\n'}
              {'\n'}
              표현은 if(조건식) {'{'}종속문{'}'}; 이며, 해당 조건식에 맞다면
              종속문을 실행합니다.
              {'\n'}
              만약 조건식이 틀렸다면 종속문 다음의 일반 다음 문장을 실행하게
              됩니다.{'\n'}
            </Text>
          </View>
        );
      }
    }
  };

  RenderBottomSheetBtn = (props) => {
    const {codeStep} = this.state;
    if (props.index <= codeStep && codeStep !== '') {
      return (
        <FucntionButton
          buttonColor={'#3AE5D1'}
          title={'설명보기'}
          disabled={false}
          onPress={() => {
            this.Explain.open();
            this.setState({pageIndex: props.index});
            this.checkCodeStep(codeStep, props.index);
          }}
        />
      );
    } else {
      return <FucntionButton buttonColor={'#DBDBDB'} title={'설명보기'} />;
    }
  };

  render() {
    var pages = [];
    const {maxPage} = this.state;
    const {pageIndex} = this.state;
    const {codeStep} = this.state;

    for (let i = 0; i < maxPage; i++) {
      pages.push(
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={styles.contentView}>
            <this.RenderCodeIamge index={i} />
          </View>
          <View style={styles.footerView}>
            <this.RenderBottomSheetBtn index={i} />
          </View>
          <View style={styles.navView} />
        </View>,
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text>
            완료 개수 {codeStep} / {maxPage}
          </Text>
        </View>
        <Pages>{pages}</Pages>
        <RBSheet
          ref={(ref) => {
            this.Explain = ref;
          }}
          closeOnDragDown={true}
          height={700}
          openDuration={250}
          customStyles={{
            container: {
              borderRadius: 20,
              alignItems: 'center',
            },
          }}>
          <View style={styles.explainView}>
            <this.RenderExplain index={pageIndex} />
          </View>
        </RBSheet>
        <View style={styles.navigateView} />
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
    height: '5%',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    backgroundColor: '#FFF',
  },
  navView: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBB',
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
  buttonStyle: {
    height: 100,
  },
  button: {
    minWidth: 50,
    height: 15,
    backgroundColor: '#4EB151',
    alignItems: 'center',
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
  explainButton: {
    minWidth: 140,
    height: 40,
    backgroundColor: '#3AE5D1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  explainView: {
    width: '96%',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
