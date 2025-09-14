#include <ESP32Servo.h>


// Create servo objects for each degree of freedom
Servo servo1, servo2, servo3, servo4, gripper;

// Initial positions for servos
int pos1 = 90, pos2 = 90, pos3 = 90, pos4 = 90, gripperPos = 90;

// Step size for each increment or decrement
const int stepSize = 5;

void setup() {
  Serial.begin(115200); // Serial communication setup

  // Attach the servos to their respective pins
  servo1.attach(2);    // Attach servo1 to pin 12
  servo2.attach(4);    // Attach servo2 to pin 13
  servo3.attach(16);    // Attach servo3 to pin 14
  servo4.attach(17);    // Attach servo4 to pin 15
  gripper.attach(5);   // Attach gripper to pin 16

  // Initialize all servos to their default positions
  updateAllServos();
}

void loop() {
  // Check if there's incoming data from serial
  if (Serial.available() > 0) {
    char command = Serial.read(); // Read the incoming command

    // Process the command to adjust servo positions
    processCommand(command);

    // Update the servos after receiving a new command
    updateAllServos();
  }

  // Continuously update servos in case of mechanical drift
  maintainServoPositions();
  delay(10); // Small delay to avoid excessive CPU usage
}

// Function to process incoming commands and adjust servo positions
void processCommand(char command) {
  switch (command) {
    case 'a': pos1 = constrain(pos1 + stepSize, 0, 180); break; // Servo 1 up
    case 'z': pos1 = constrain(pos1 - stepSize, 0, 180); break; // Servo 1 down
    case 'e': pos2 = constrain(pos2 + stepSize, 0, 180); break; // Servo 2 up
    case 'r': pos2 = constrain(pos2 - stepSize, 0, 180); break; // Servo 2 down
    case 't': pos3 = constrain(pos3 + stepSize, 0, 180); break; // Servo 3 up
    case 'y': pos3 = constrain(pos3 - stepSize, 0, 180); break; // Servo 3 down
    case 'u': pos4 = constrain(pos4 + stepSize, 0, 180); break; // Servo 4 up
    case 'i': pos4 = constrain(pos4 - stepSize, 0, 180); break; // Servo 4 down
    case 'o': gripperPos = constrain(gripperPos + stepSize, 0, 180); break; // Gripper open
    case 'p': gripperPos = constrain(gripperPos - stepSize, 0, 180); break; // Gripper close
  }
}

// Function to update all servos to their respective positions
void updateAllServos() {
  servo1.write(pos1);
  servo2.write(pos2);
  servo3.write(pos3);
  servo4.write(pos4);
  gripper.write(gripperPos);
}

// Function to maintain current positions (helpful for torque handling)
void maintainServoPositions() {
  servo1.write(pos1);
  servo2.write(pos2);
  servo3.write(pos3);
  servo4.write(pos4);
  gripper.write(gripperPos);
}
