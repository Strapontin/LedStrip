#include <FastLED.h>
//----- Partie Led -----

#define LED_PIN     7
#define COLOR_ORDER GRB
#define CHIPSET     WS2812
#define NUM_LEDS    300

#define FRAMES_PER_SECOND 60

int brightness = 150;
int red = 0;
int green = 0;
int blue = 0;

CRGB leds[NUM_LEDS];
CRGB color;





//----- Partie communication -----
const byte numChars = 32;
char receivedChars[numChars];
char tempChars[numChars];        // temporary array for use when parsing

// variables to hold the parsed data
char commandFromPC[numChars] = {0};
int integerFromPC = 0;
float floatFromPC = 0.0;

boolean newData = false;

//============

void setup() {
  delay(3000); // sanity delay
  FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );
  FastLED.setBrightness( brightness );
  
  Serial.begin(9600);
//    Serial.println("This demo expects 3 pieces of data - text, an integer and a floating point value");
//    Serial.println("Enter data in this style <HelloWorld, 12, 24.7>  ");
    Serial.println("GO");

}

//============

void loop() {
  
    // Coupe ce que le Serial recoit selon les delimiters
    recvWithStartEndMarkers();
    
    if (newData == true) {
      
        strcpy(tempChars, receivedChars);
            // this temporary copy is necessary to protect the original data
            //   because strtok() used in parseData() replaces the commas with \0
        parseData();
        
        showParsedData();
        
        ExecuteAction();
        newData = false;
    }
}

//============

void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;

    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

//============

void parseData() {      // split the data into its parts

    char * strtokIndx; // this is used by strtok() as an index

    strtokIndx = strtok(tempChars,";");      // get the first part - the string
    strcpy(commandFromPC, strtokIndx); // copy it to commandFromPC
    
    // Si on a eu "RGB" en commande alors on récupère les valeurs des couleurs
    if (stringEqualsChar("RGB", commandFromPC)) {

      strtokIndx = strtok(NULL, ";"); // this continues where the previous call left off
      red = atoi(strtokIndx);     // convert this part to an integer

      strtokIndx = strtok(NULL, ";"); 
      green = atoi(strtokIndx);

      strtokIndx = strtok(NULL, ";"); 
      blue = atoi(strtokIndx);
    }
 
//    strtokIndx = strtok(NULL, ";"); // this continues where the previous call left off
//    integerFromPC = atoi(strtokIndx);     // convert this part to an integer
//
//    strtokIndx = strtok(NULL, ";");
//    floatFromPC = atof(strtokIndx);     // convert this part to a float

}

//============

void ExecuteAction() {

  if (stringEqualsChar("RGB", commandFromPC)) {

    color.red = red;
    color.green = green;
    color.blue = blue;
    
    // On allume toutes les leds avec la même couleur
    for( int i = 0; i < NUM_LEDS; i++) {      
      leds[i] = color;
    }
    
    FastLED.show(); // display this frame
    FastLED.delay(1000 / FRAMES_PER_SECOND);
  }
}

//============

void showParsedData() {
    Serial.print("Message ");
    Serial.println(commandFromPC);
    Serial.print("red ");
    Serial.println(red);
    Serial.print("green ");
    Serial.println(green);
    Serial.print("blue ");
    Serial.println(blue);
//    Serial.print("Integer ");
//    Serial.println(integerFromPC);
//    Serial.print("Float ");
//    Serial.println(floatFromPC);
}

//============

int VerifyColor(int color) {
  if (color > 255) {
    return 255;
  }
  else if (color < 0) {
    return 0;
  }
  else {
    return color;
  }
}

//============

boolean stringEqualsChar(String s, char c[]) {
  
  if (s.length() != strlen(c)){    
    return false;
  }
  
  for (int i = 0; i < s.length(); i++) {
   
    if (s[i] != c[i]){     
     return false;
    } 
  }
  
  return true;
}
