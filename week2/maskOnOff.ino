int ledPin1 = 2;
int ledPin2 = 3;
//int ledPin3 = 4;

void setup() {
  pinMode(ledPin1, OUTPUT);  // sets the pin as output
  pinMode(ledPin2, OUTPUT);
  //pinMode(ledPin3, OUTPUT);
  Serial.begin(9600);        // initialize serial communications
}
 
void loop() {
 if (Serial.available() > 0) { // if there's serial data available
   int inByte = Serial.read();// read it
   
   if (inByte == 1) {
     digitalWrite(ledPin1, HIGH);  // use it to turn on the LED 1
     digitalWrite(ledPin2, LOW);
     //digitalWrite(ledPin3, LOW);
   } else if (inByte == 0) {
     digitalWrite(ledPin2, HIGH);  // use it to turn on the LED 2
     digitalWrite(ledPin1, LOW);
     //digitalWrite(ledPin3, LOW);
 } 
 //else {
//     digitalWrite(ledPin1, LOW);  // sets the LED off
//     digitalWrite(ledPin2, LOW);  // sets the LED off
//     digitalWrite(ledPin3, HIGH);
//   }
   delay(200);                // waits
 }
}