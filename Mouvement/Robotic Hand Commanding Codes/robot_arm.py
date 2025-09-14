import serial
import keyboard
import time

# Set up serial communication with the ESP32
esp32 = serial.Serial('COM4', 115200, timeout=0.1)  # Replace COM4 with your ESP32 port

# Map keyboard keys to commands
key_mapping = {
    'a': 'a', 'z': 'z',
    'e': 'e', 'r': 'r',
    't': 't', 'y': 'y',
    'u': 'u', 'i': 'i',
    'o': 'o', 'p': 'p'
}

def send_command(key):
    """Send a single character command to the ESP32."""
    esp32.write(key.encode())
    print(f"Sent: {key}")

print("Control the robot arm with the keyboard. Press 'ESC' to exit.")

try:
    while True:
        # Check each key in the key mapping
        for key, command in key_mapping.items():
            if keyboard.is_pressed(key):
                send_command(command)
                time.sleep(0.1)  # Slight delay to avoid duplicate keypresses

        # Check if 'ESC' is pressed to exit
        if keyboard.is_pressed('esc'):
            print("Exiting...")
            break

except KeyboardInterrupt:
    print("Program interrupted by user.")
finally:
    esp32.close()
