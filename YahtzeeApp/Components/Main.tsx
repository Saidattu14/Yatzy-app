import React, {useState,useRef,useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  DrawerLayoutAndroid,TextInput
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import Scoreboard from './Scoreboard';
import RequestPage from './Request';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {DataContext} from '../reducers/datalayer'
const random = (min = 1, max = 6) => {
  let num = Math.random() * (max - min) + min;
  return Math.round(num);
}
const Search : React.FC<{websocket: WebSocket;vl: String,v2:String}> = ({websocket,vl,v2}) => {
    const [yes,setYes] = useState([0,0,0,0,0])
    const [yes1,setYes1] = useState([0,0,0,0,0])
    const [autoplay,setAutoplay] = useState([false,false,false,false,false])
    const [Oppautoplay,setOppautoplay] = useState([false,false,false,false,false])
    const [dices,setDices] = useState([5,10,15,20,30])
    const [Oppdices,setOppDices] = useState([5,10,15,20,30])
    const [chances,setChances] = useState(vl)
    const [oppchances, setOppChances] = useState(v2);
    const [oppscore,setOppscore] = useState({
      "OppScore":
      {
          "Chance": 0,
          "Fives": 0,
          "FourofKind": 0,
          "Fours": 0, 
          "FullHouse": 0, 
          "LargeStraight": 0,
          "Ones": 0, 
          "Pair": 0, 
          "Sixs": 0, 
          "SmallStraight": 0, 
          "ThreeofKind": 0, 
          "Threes": 0, 
          "TwoPair": 0,
          "Twos": 0,
          "Yatzy": 0
      },
    })
    const [score,setScore] = useState({
      "MyScore":
          {
              "Chance": 0,
              "Fives": 0,
              "FourofKind": 0,
              "Fours": 0, 
              "FullHouse": 0, 
              "LargeStraight": 0,
              "Ones": 0, 
              "Pair": 0, 
              "Sixs": 0, 
              "SmallStraight": 0, 
              "ThreeofKind": 0, 
              "Threes": 0, 
              "TwoPair": 0,
              "Twos": 0,
              "Yatzy": 0
          },
      "Colors" : {
          "Chance": 'yellow',
          "Fives":  "yellow",
          "FourofKind":  "yellow",
          "Fours":  "yellow", 
          "FullHouse":  "yellow", 
          "LargeStraight":  "yellow",
          "Ones":  "yellow", 
          "Pair":  "yellow", 
          "Sixs":  "yellow", 
          "SmallStraight":  "yellow", 
          "ThreeofKind":  "yellow", 
          "Threes":  "yellow", 
          "TwoPair":  "yellow",
          "Twos":  "yellow",
          "Yatzy":  "yellow"
      },
      "Turn" : chances
    });
    const [Originalscore,setOrginalscore] =  useState({
      "MyScore":
          {
              "Chance": 0,
              "Fives": 0,
              "FourofKind": 0,
              "Fours": 0, 
              "FullHouse": 0, 
              "LargeStraight": 0,
              "Ones": 0, 
              "Pair": 0, 
              "Sixs": 0, 
              "SmallStraight": 0, 
              "ThreeofKind": 0, 
              "Threes": 0, 
              "TwoPair": 0,
              "Twos": 0,
              "Yatzy": 0
          }
      });
    const [Ok,SetOk] = useState(true);
    const drawer = useRef(null);
    function a1<Type>(a2: number[],index : number): void {
      if(a2[index] == 0)
      {
        a2[index] = 1
      }
      else
      {
        a2[index] = 0
      }
      let arr: React.SetStateAction<number[]> = [...a2]
      setYes(arr)
    }
    function DiceRoll (): void {
      var list = []
      if(chances != 'Opponent Turn' && chances != "Over")
      {
      
      for(let i = 0; i<=4;i++)
      {
        if (yes[i] != 1)
        {
        let res = random(1,6);
        list.push(res);

        if(res == 1)
        {
         dices[i] = 5;
        }
        else if(res == 2)
        {
          dices[i] = 10;
        }
        else if(res == 3)
        {
          dices[i] = 15;
        }
        else if(res == 4)
        {
          dices[i] = 20;
        }
        else if(res == 5)
        {
          dices[i] = 25;
        }
        else if(res == 6)
        {
          dices[i] = 30;
        }
        }
        else
        {
          if(dices[i] == 5)
          {
            list.push(1);
          }
          else if(dices[i] == 10)
          {
            list.push(2);
          }
          else if(dices[i] == 15)
          {
            list.push(3);
          }
          else if(dices[i] == 20)
          {
            list.push(4);
          }
          else if(dices[i] == 25)
          {
            list.push(5);
          }
          else if(dices[i] == 30)
          {
            list.push(6);
          }
        }
      }
      let arr: React.SetStateAction<number[]> = [...dices]
      setDices(arr);
      if (chances == 'Roll Dice')
      {
        setChances('Second Chance')
      }
      else if (chances == 'Second Chance')
      {
        setChances('Final Chance')
      }
      else if (chances == 'Final Chance')
      {
        setChances('Over')
      }
      let obj = {
        "Method" : "Dicerolling",
        "chance" : chances,
        "Dices" : list
      }
      websocket.send(JSON.stringify(obj));
    }}
    function DiceRollOpp (Dicelist: number[],): void {
      var list = []
     if(oppchances != 'Opponent Turn' )
     {
      for(let i = 0; i<=4;i++)
      {
        let res = Dicelist[i];
        if(res == 1)
        {
         Oppdices[i] = 5;
        }
        else if(res == 2)
        {
          Oppdices[i] = 10;
        }
        else if(res == 3)
        {
          Oppdices[i] = 15;
        }
        else if(res == 4)
        {
          Oppdices[i] = 20;
        }
        else if(res == 5)
        {
          Oppdices[i] = 25;
        }
        else if(res == 6)
        {
          Oppdices[i] = 30;
        }
     }
     let arr: React.SetStateAction<number[]> = [...Oppdices]
     setOppDices(arr);
     if (oppchances == 'Roll Dice')
     {
       setOppChances('Second Chance')
     }
     else if (oppchances == 'Second Chance')
     {
       setOppChances('Final Chance')
     }
     else if (oppchances == 'Final Chance')
     {
       setOppChances('Opponent Turn')
     }
   }}

  websocket.onmessage = (e) => {
      // a message was received
      const a = JSON.parse(e.data);
      if(a.Method == "Estimated_MyScore")
      {
      
       setScore(a);
      }
      else if (a.Method == "Update_MyScore")
      {
        setChances('Opponent Turn');
        setOppChances('Roll Dice');
        setOrginalscore(a);
      }
      else if(a.Method == "OpponentDices")
      {
       
       DiceRollOpp(a.Dices);
      }
      else if(a.Method == "Update_OppScore")
      {
        let obj = {
          "OppScore": a.Score
        }
        drawer.current.openDrawer();
        setChances('Roll Dice');
        setOppChances('Opponent Turn');
        setOppscore(obj);
        
      }
     
    };
    const openNav = () => {

    } 
    const SideNav = () => {
      return(
        <Scoreboard score={score.MyScore}
        oppscore = {oppscore.OppScore}
        originalscores={Originalscore.MyScore} 
        colors = {score.Colors}
        websocket = {websocket}
        Turn = {chances}
        Ok = {Ok}></Scoreboard>
      )
    }
    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={320}
        drawerPosition={'left'}
        renderNavigationView={SideNav}
        >
        <View style = {styles.sectionUser}>
        <View style = {styles.sectionDescription} >
          <View style = {styles.sectionIcon}>
              <SafeAreaView  style = {styles.sectionProfile} >
                      <LottieView 
                        source={require('../Assets/user.json')}
                        // ref={animation => animation?.play(25,25)}
                        style = {styles.IconData} autoPlay = {false} loop = {false}>
                      </LottieView>
              </SafeAreaView>
              <Text style = {styles.sectionName}>
                User
              </Text>
          </View>
          
          <View style = {styles.sectionContainer}>
                {
                  yes.map((rowData, index) => {
                    if (rowData == 1)
                    {
                    return (
                      <Text onPress={() => a1(yes,index)} style = {styles.sectionButtonSpace} key = {index}>
                      <SafeAreaView  key = {index} style = {styles.sectionProfile} >
                      <LottieView 
                        source={require('../Assets/pause1.json')}
                        ref={animation => animation?.play(25,25)}
                        style = {styles.ImageData} autoPlay = {false} loop = {false}>
                      </LottieView>
                      </SafeAreaView>
                      </Text>
                    )}
                    else
                    {
                      return (
                        <Text onPress={() => a1(yes,index)} key = {index}  style = {styles.sectionButtonSpace} >
                        <SafeAreaView  key = {index} style = {styles.sectionProfile} >
                        <LottieView
                          key = {index}
                          source={require('../Assets/dice.json')}
                          ref={animation => animation?.play(dices[index],dices[index])}
                          style = {styles.ImageData} autoPlay = {autoplay[index]} loop = {autoplay[index]}>
                        </LottieView>
                        </SafeAreaView>
                        </Text>
                      )
                    }
                  })
                }
          </View>
            <View style = {styles.sectionButtonMain}>
              <TouchableOpacity style = {styles.sectionButoon} onPress={() => drawer.current.openDrawer()}>
                  <Text  style = {styles.sectionButtonData}>
                  Score
                  </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.sectionButtonMain}>
              <TouchableOpacity style = {styles.sectionButoon} onPress={() => DiceRoll()}>
                  <Text  style = {styles.sectionButtonData}>
                   {chances}
                  </Text>
              </TouchableOpacity>
            </View>
        </View>
        </View>
        <View style = {styles.sectionOpp}>
        <View style = {styles.sectionDescription} >
          <View style = {styles.sectionIcon}>
              <SafeAreaView  style = {styles.sectionProfile} >
                      <LottieView 
                        source={require('../Assets/user.json')}
                        // ref={animation => animation?.play(25,25)}
                        style = {styles.IconData} autoPlay = {false} loop = {false}>
                      </LottieView>
              </SafeAreaView>
              <Text style = {styles.sectionName}>
                Opponent
              </Text>
          </View>  
        <View style = {styles.sectionContainer}>
                {
                  yes1.map((rowData, index) => {
                    if (rowData == 1)
                    {
                    return (
                      <Text onPress={() => a1(yes,index)} style = {styles.sectionButtonSpace} key = {index}>
                      <SafeAreaView  key = {index} style = {styles.sectionProfile} >
                      <LottieView 
                        source={require('../Assets/pause1.json')}
                       
                        style = {styles.ImageData} autoPlay = {false} loop = {false}>
                      </LottieView>
                      </SafeAreaView>
                      </Text>
                    )
                    }
                    else
                    {
                      return (
                        <Text key = {index}  style = {styles.sectionButtonSpace} >
                        <SafeAreaView  key = {index} style = {styles.sectionProfile} >
                        <LottieView
                          key = {index}
                          source={require('../Assets/dice.json')}
                          ref={animation => animation?.play(Oppdices[index],Oppdices[index])}
                          style = {styles.ImageData} autoPlay = {Oppautoplay[index]} loop = {Oppautoplay[index]}>
                        </LottieView>
                        </SafeAreaView>
                        </Text>
                      )
                    }
                  })
                }
          </View>
            <View style = {styles.sectionButtonMain}>
              <TouchableOpacity style = {styles.sectionButoon} >
                  <Text  style = {styles.sectionButtonData}>
                    Your Score :12
                  </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.sectionButtonMain}>
              <TouchableOpacity style = {styles.sectionButoon} >
                  <Text  style = {styles.sectionButtonData}>
                   {oppchances}
                  </Text>
              </TouchableOpacity>
            </View>
        </View>
        </View>
        </DrawerLayoutAndroid>

    );
};


const Main = ({navigation,route}) => {
  const {paramKey} = route.params;
  const {paramKey1} = route.params;
  const { state, dispatch } = React.useContext(DataContext);
  return (
        <View style = {styles.main}>
         <Search websocket={state.ws} vl = {paramKey} v2 = {paramKey1}></Search>
        </View>
    );

};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection : 'row',
  },
  sectionUser: {
    width : '100%',
    height : '50%',
    backgroundColor : '#1c1c1c'
  },
  sectionOpp: {
    width : '100%',
    height : '50%',
    backgroundColor : 'grey'
  },
  main : {
   height : '100%',
   width : '100%',
  },
  sectionTitle: {
    padding : 5,
    fontSize: 13, 
    fontFamily: 'Times New Roman',
    color : 'green',
    width : '25%',
    height : 33,
    borderWidth : 1,
    borderRadius : 1,
    borderColor : 'green',
  },
  sectionButtonData: {
    textAlign : 'center',
    padding : 7,
    fontSize: 20, 
    fontFamily: 'Times New Roman',
    color : 'white',
    width : '100%',
    height : 45,
    borderWidth : 1,
    borderRadius : 30,
    borderColor : 'green',
    backgroundColor : 'green'
  },
  sectionList: {
    flexDirection : 'row',
    margin : 5,
    color : 'green',
    width : '97%',
    height : 100,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'green',
    backgroundColor : 'green'
  },
  sectionProfileData: {
  
    color : 'green',
    width : '30%',
    height : 98,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'green',
    
  },
  sectionRequest: {
   
    width : '34%',
    height : 100,
    textAlign : 'center'
  },
  sectionRequestText: {
    marginTop : 25,
    paddingTop : 14,
    paddingLeft : 10,
    fontSize: 15, 
    fontFamily: 'Times New Roman',
    color : 'white',
    width : '98%',
    height : 50,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'black',
    backgroundColor : 'green'
  },
  
  
  sectionProfile: {
   
    alignItems : 'center',
    color : 'white',
    width : '25%',
    height : 50,
    marginTop : 10,
  
    
    
  },
  sectionName: {
    margin : 10,
    fontSize: 20,
    fontFamily: 'Times New Roman',
    color : 'green',
    
  },
  sectionStatus: {
    
    fontSize: 15, 
    fontFamily: 'Times New Roman',
    color : 'white',
    width : '100%',
    height : 40,
    
  },
  sectionDescription: {
    margin : 10,
  },
  sectionButoon: {
    width : '50%',
    alignItems : 'center'
  },
  sectionButtonSpace: {
    margin : 7,
    width : '17%',
  },
  sectionButtonMain: {
    margin : 10,
    alignItems : 'center'
  },
  sectionIcon: {
    margin : 20,
    alignItems : 'center'
  },
  
  highlight: {
    flexDirection : 'row',
  },
  ImageData: {
    
    height : '100%',
    width : '40%',
    backgroundColor : 'green'
  },
  ConnData: {
    alignItems : 'center',
    height : '50%',
    width : '50%',
  },
  ConnBck : {
    backgroundColor : 'white',
    alignItems : 'center',
  },
  IconData: {
    
    height : '100%',
    width : '40%',
  },
});
export default Main;