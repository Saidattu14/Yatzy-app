import React, {useState,useRef,useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  DrawerLayoutAndroid,TextInput
} from 'react-native';
import Scoreboard from './Scoreboard';
import {DataContext} from '../reducers/datalayer'
import { opponent_score_object, 
  user_estimated_score_and_colors_object, original_score_object } from './interfaces_json';


const random = (min = 1, max = 6) => {
  let num = Math.random() * (max - min) + min;
  return Math.round(num);
}



const reducer1 = (state1 : any, action:any) => {
  switch (action.type) {
    case 'set_update_user_dices_and_user_chances':
      return {
        ...state1,
        user_chances : action.user_chances,
        user_dices : action.user_dices
      };
    case 'set_update_opponent_dices_and_opponent_chances':
        return {
          ...state1,
          opponent_chances : action.opponent_chances,
          opponent_dices : action.opponent_dices
      };
      case 'set_update_user_estimatedscores_and_colors':
        return {
          ...state1,
          user_estimated_score : action.user_estimated_score,
      };
    case 'set_update_user_originalscore_user_chance_opponent_chance':
        return {
          ...state1,  
          user_chances : action.user_chances,
          opponent_chances : action.opponent_chances,
          user_original_score : action.user_original_score,
      };
    case 'set_update_opponentscore_mychance_oppchance':
        return {
          ...state1,  
          user_chances : action.user_chances,
          opponent_chances : action.opponent_chances,
          opponent_score : action.opponent_score
      };
    default:
      throw new Error();
  }
}


// The initial states of the
const defaultstate = {
  user_chances : '',
  opponent_chances : '',
  user_dices : [5,10,15,20,30],
  opponent_dices : [5,10,15,20,30],
  user_estimated_score : user_estimated_score_and_colors_object,
  user_original_score : original_score_object,
  opponent_score : opponent_score_object,
  // UsersDataOriginal : Array<message_Data_details>(),
  // UsersDataModify : Array<message_Data_details>(),
}





/**
 This is a game environment Component. Here the user roll dices, updates the scores on the scoreboard which
 present in the side nav bar component.
*/
const GameBoard : React.FC<{websocket: any; MyTurn: string,OppTurn: string}> = ({websocket,
  MyTurn,OppTurn}) => {
    defaultstate.user_chances = MyTurn;
    defaultstate.opponent_chances = OppTurn
    const [state1, dispatch1] = React.useReducer(reducer1,defaultstate);
    const [user_dice_status,setUserDiceStatus] = useState([0,0,0,0,0])
    const [opponent_dice_status, setOpponentDiceStatus] = useState([0,0,0,0,0])
    const [autoplay,setAutoplay] = useState([false,false,false,false,false])
    const [opponent_autoplay,setOpponent_autoplay] = useState([false,false,false,false,false])
    const [Ok,SetOk] = useState(true);
    const drawer = useRef(null);

    /**
     Saving the user dices and updated that one in UI.
    */
    function Save_and_Release<Type>(DiceStatus: number[],index : number): void {
      if(DiceStatus[index] == 0)
      {
        DiceStatus[index] = 1
      }
      else
      {
        DiceStatus[index] = 0
      }
      let arr: React.SetStateAction<number[]> = [...DiceStatus]
      setUserDiceStatus(arr)
    }
   
    /**
     Updates the User Chance and Dices infromation on UI when user cliks on the roll dice button.
    */
    function Update_ChanceData_and_Dices (updated_dices: number[],updated_chances : string): void {
      
        dispatch1({
          type: 'set_update_user_dices_and_user_chances',
          user_chances : updated_chances,
          user_dices : updated_dices,
         }) 
    }

   /**
     Updates the User Chance data, opponent chance data and opponent Dices infromation on UI 
     when opponent cliks on the their roll dice button.
    */
   function Update_ChanceData_and_Dices_Opponent (updated_dices: number[],updated_chances : string): void {
      dispatch1({
        type: 'set_update_opponent_dices_and_opponent_chances',
        opponent_chances : updated_chances,
        opponent_dices : updated_dices,
       })
    }
   
    /**
     Updates the User Chance data, opponent chance data and original scores infromation on UI.
    */

    function Update_myoriginalscore_mychance_oppchance (updated_chances : string,
      updated_oppchances:string,Original_Score: any): void {
      dispatch1({
        type: 'set_update_user_originalscore_user_chance_opponent_chance',
        opponent_chances : updated_oppchances,
        user_chances : updated_chances,
        user_original_score : Original_Score,
       })
    }
    /**
     Updates the User estimated scores infromation on UI for the dices data.
    */

    function Update_estimated_score_and_colors (score : JSON,colors:JSON): void {
      let obj = {
        "MyScore" : score,
        "Colors" : colors
      }
      dispatch1({
        type: 'set_update_user_estimatedscores_and_colors',
        user_estimated_score : obj
       })
    }
   
    /**
     Updates the User Chance data, opponent chance data and opponent scores infromation on UI.
    */
    function Update_opponent_score_mychance_oppchance (updated_chances : string,
      updated_oppchances:string,score: JSON): void {
      let obj = {
        "OppScore" :score
      }
      dispatch1({
        type: 'set_update_opponentscore_mychance_oppchance',
        opponent_chances : updated_oppchances,
        user_chances : updated_chances,
        opponent_score : obj,
       })
    }
   
    /**
     Here the dices present on the UI are rolled and stores the new dices infromation.
     The Infromation was send to the server.
    */
    function DiceRoll (): void {
      var list = []
      if(state1.user_chances != 'Opponent Turn' && state1.user_chances != "Over")
      {
      
      for(let i = 0; i<=4;i++)
      {
        if (user_dice_status[i] != 1)
        {
        let res = random(1,6);
        list.push(res);
        if(res == 1)
        {
         state1.user_dices[i] = 5;
        }
        else if(res == 2)
        {
          state1.user_dices[i] = 10;
        }
        else if(res == 3)
        {
          state1.user_dices[i] = 15;
        }
        else if(res == 4)
        {
          state1.user_dices[i] = 20;
        }
        else if(res == 5)
        {
          state1.user_dices[i] = 25;
        }
        else if(res == 6)
        {
          state1.user_dices[i] = 30;
        }
        }
        else
        {
          if(state1.user_dices[i] == 5)
          {
            list.push(1);
          }
          else if(state1.user_dices[i] == 10)
          {
            list.push(2);
          }
          else if(state1.user_dices[i] == 15)
          {
            list.push(3);
          }
          else if(state1.user_dices[i] == 20)
          {
            list.push(4);
          }
          else if(state1.user_dices[i] == 25)
          {
            list.push(5);
          }
          else if(state1.user_dices[i] == 30)
          {
            list.push(6);
          }
        }
      }
      if (state1.user_chances == 'Roll Dice')
      {
        Update_ChanceData_and_Dices(state1.user_dices,'Second Chance');
      }
      else if (state1.user_chances == 'Second Chance')
      {
        Update_ChanceData_and_Dices(state1.user_dices,'Final Chance');
        
      }
      else if (state1.user_chances == 'Final Chance')
      {
        Update_ChanceData_and_Dices(state1.user_dices,'Over');

      }
      let obj = {
        "Method" : "Dicerolling",
        "chance" : state1.user_chances,
        "Dices" : list
      }
      websocket.send(JSON.stringify(obj));
    }}


  /**
     
    Here opponet dices infromation was recieved from the server and updated that one on the UI.
  */
  function DiceRollOpp (Dicelist: number[]): void {
      
     if(state1.opponent_chances != 'Opponent Turn' )
     {
      for(let i = 0; i<=4;i++)
      {
        let res = Dicelist[i];
        if(res == 1)
        {
         state1.opponent_dices[i] = 5;
        }
        else if(res == 2)
        {
          state1.opponent_dices[i] = 10;
        }
        else if(res == 3)
        {
          state1.opponent_dices[i] = 15;
        }
        else if(res == 4)
        {
          state1.opponent_dices[i] = 20;
        }
        else if(res == 5)
        {
          state1.opponent_dices[i] = 25;
        }
        else if(res == 6)
        {
          state1.opponent_dices[i] = 30;
        }
     }
     if (state1.opponent_chances == 'Roll Dice')
     {
      Update_ChanceData_and_Dices_Opponent(state1.opponent_dices,'Second Chance');
       
     }
     else if (state1.opponent_chances == 'Second Chance')
     {
      Update_ChanceData_and_Dices_Opponent(state1.opponent_dices,'Final Chance');
      
     }
     else if (state1.opponent_chances == 'Final Chance')
     {
      Update_ChanceData_and_Dices_Opponent(state1.opponent_dices,'Opponent Turn');
     }
  }}



 /**
   This is a Side Navigation drawer where the user scoreboard and opponent score present.
  */
  const SideNav = () => {
      return(
        <Scoreboard score={state1.user_estimated_score.MyScore}
        oppscore = {state1.opponent_score.OppScore}
        originalscores = {state1.user_original_score.MyScore} 
        colors = {state1.user_estimated_score.Colors}
        websocket = {websocket}
        Turn = {state1.user_chances}
        Ok = {Ok}> </Scoreboard>
      )
    }

  /**
  This Function recieves the messages from the server.
*/

const recieve_messages_from_server = (websocket : any, drawer: any) => {

  try {
      websocket.onmessage = async(e:any) => {
      // a message was received
      let recieved_message : any;
      recieved_message = JSON.parse(e.data);
      //console.log(recieved_message)
      if(recieved_message.Method == "Estimated_MyScore")
      {
        Update_estimated_score_and_colors(recieved_message.MyScore,recieved_message.Colors)
      }
      else if (recieved_message.Method == "Update_MyScore")
      {
        let obj = {
          "MyScore" : recieved_message.MyScore,
           "Colors" : recieved_message.Colors
        }
        Update_myoriginalscore_mychance_oppchance('Opponent Turn','Roll Dice',obj)
      }
      else if(recieved_message.Method == "OpponentDices")
      {
        DiceRollOpp(recieved_message.Dices);
      }
      else if(recieved_message.Method == "Update_OppScore")
      {
        //console.log(recieved_message)
        Update_opponent_score_mychance_oppchance('Roll Dice','Opponent Turn',recieved_message.Score)
        
      }
    };
  } catch (error) {
    console.log(error)
  }
}
   /**
    This is useEffect fuction calls the repective function for the first time when the screen loads.
  */

  useEffect(() => {
    recieve_messages_from_server(websocket,drawer);
    // BackHandler.addEventListener("hardwareBackPress", backAction);
    // return () => {
    // BackHandler.removeEventListener("hardwareBackPress", backAction);
    //}
  }, [recieve_messages_from_server]);


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
                  user_dice_status.map((rowData, index) => {
                    if (rowData == 1)
                    {
                    return (
                      <Text onPress={() => Save_and_Release(user_dice_status,index)} 
                      style = {styles.sectionButtonSpace} key = {index}>
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
                        <Text onPress={() => Save_and_Release(user_dice_status,index)} 
                        key = {index}  style = {styles.sectionButtonSpace} >
                        <SafeAreaView  key = {index} style = {styles.sectionProfile} >
                        <LottieView
                          key = {index}
                          source={require('../Assets/dice.json')}
                          ref={animation => animation?.play(state1.user_dices[index],state1.user_dices[index])}
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
                  Update Score
                  </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.sectionButtonMain}>
              <TouchableOpacity style = {styles.sectionButoon} onPress={() => DiceRoll()}>
                  <Text  style = {styles.sectionButtonData}>
                   {state1.user_chances}
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
                  opponent_dice_status.map((rowData, index) => {
                    if (rowData == 1)
                    {
                    return (
                      <Text  style = {styles.sectionButtonSpace} key = {index}>
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
                          ref={animation => animation?.play(state1.opponent_dices[index],
                            state1.opponent_dices[index])}
                          style = {styles.ImageData} autoPlay = {opponent_autoplay[index]} 
                          loop = {opponent_autoplay[index]}>
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
                    Update
                  </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.sectionButtonMain}>
              <TouchableOpacity style = {styles.sectionButoon} >
                  <Text  style = {styles.sectionButtonData}>
                   {state1.opponent_chances}
                  </Text>
              </TouchableOpacity>
            </View>
        </View>
        </View>
        </DrawerLayoutAndroid>

    );
};


const Main = (props:any) => {
  const {navigation,route} = props;
  const {MyTurn} = route.params;
  const {OppTurn} = route.params;
  const { state, dispatch } = React.useContext(DataContext);
  return (
        <View style = {styles.main}>
         <GameBoard websocket = {state.ws} MyTurn = {MyTurn} OppTurn = {OppTurn}></GameBoard>
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
    backgroundColor : '#adff2f'
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