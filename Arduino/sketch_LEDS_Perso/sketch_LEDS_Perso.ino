#include <FastLED.h>

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

enum ActionToExecute { ATEUnknown, ATERGB };



void setup() {
  delay(3000); // sanity delay
  FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );
  FastLED.setBrightness( brightness );
  
  Serial.begin(9600);
}

void loop()
{
  String message = "";
  String fullMessage = "";
  byte byteReceived;
  ActionToExecute action = ATEUnknown;
  
  int serialRead = 0;
  
  if (true) {
//    delay(500);
    
    // On lit les infos reçues
    while (Serial.available()) {
      
//      Serial.println(Serial.readString());
      
      byteReceived = Serial.read();
      fullMessage += (char)byteReceived;
      
      // Si on a un ';'
      if (byteReceived == 59){
        
        // Si on ne connais pas déjà l'action a exécuter
        if (action == ATEUnknown) {
  
          // Si on a reçu RGB on doit afficher une couleur
          if (message = "RGB") {
            
            action = ATERGB;
            
            // On met les variables à une valeur par défaut
            red = -1;
            green = -1;
            blue = -1;
          }
        }
        // Si on doit afficher une couleur
        else if (action == ATERGB) {
          
          // Si le rouge est à -1 on lui enregistre sa nouvelle valeur
          if (red = -1) {
            red = message.toInt();
          }
          else if (green = -1) {
            green = message.toInt();
          }
          else if (blue = -1) {
            blue = message.toInt();
          }
        }
        
        message = "";
      }
      // Si on a eu autre chose que ';'
      else {
        message += byteReceived;
      }
    }
  }
  
  // Si on doit afficher une couleur
  if (action == ATERGB) {
    
    red = VerifyColor(red);
    green = VerifyColor(green);
    blue = VerifyColor(blue);
    
    Serial.println("red = '" + String(red) + "'");
    Serial.println("green = '" + String(green) + "'");
    Serial.println("blue = '" + String(blue) + "'");
    Serial.println("fullMessage = '" + fullMessage + "'");
    Serial.println();
    
    CRGB color;      
    color.red = red;
    color.green = green;
    color.blue = blue;
    
    // On allume toutes les leds avec la même couleur
    for( int i = 0; i < NUM_LEDS; i++) {      
      leds[i] = color;
    }
  }
  
  FastLED.show(); // display this frame
  FastLED.delay(1000 / FRAMES_PER_SECOND);
}

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

