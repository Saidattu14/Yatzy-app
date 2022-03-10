export const opponent_score_object = {
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
        "Yatzy": 0,
    },
}
export const user_estimated_score_and_colors_object = {
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
            "Yatzy": 0,
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
  }
export const original_score_object = {
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
            "Yatzy": 0,
           
           
        }
  }

  export interface Score_Data_interface {
    Ones: Number;
    Twos: Number;
    Threes:Number;
    Fours:Number;
    Fives:Number;
    Sixs:Number;
    Pair:Number;
    TwoPair:Number;
    ThreeofKind:Number;
    FourofKind:Number;
    FullHouse:Number;
    SmallStraight:Number;
    LargeStraight:Number;
    Chance:Number;
   
  }
  export interface Colors_interface  {
    Ones: string;
    Twos: string;
    Threes: string;
    Fours: string;
    Fives: string;
    Sixs: string;
    Pair: string;
    TwoPair: string;
    ThreeofKind: string;
    FourofKind: string;
    FullHouse: string;
    SmallStraight: string;
    LargeStraight: string;
    Chance: string;
    Yatzy : string;
  }