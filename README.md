# Text-to-Speech Web Application

This is a simple Text-to-Speech (TTS) web application built using Flask and Edge TTS. It allows users to input text, select different voices, adjust pitch and rate, and then play or download the synthesized audio in real-time. [Check site](https://freettsapp.koyeb.app/)

## Features

- Choose from a variety of voices.
- Adjust tone and speech speed using sliders.
- Play generated speech directly on the webpage.
- Download the generated audio in MP3 format.
- Automatically deletes old audio files to save space.

## Technologies Used

- **Flask**: Backend framework to handle web requests.
- **Edge TTS**: Used to synthesize text into speech.
- **HTML, CSS, JS**: For the frontend of the web application.
- **asyncio**: Asynchronous Python library for handling TTS requests.

## How to Run the Project

1. **Clone the repository**:

    ```bash
    git clone https://github.com/justoperator/tts-web-app.git
    cd tts-web-app
    ```

2. **Install dependencies**:  
   Make sure you have Python installed. Then install the required Python libraries by running:

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the Flask server**:

    ```bash
    python app.py
    ```

4. **Access the application**:  
   Open your browser and go to `http://127.0.0.1:5000`.

## File Structure

- `app.py`: Main Flask application file that handles routing and synthesizes text.
- `templates/index.html`: HTML file for the frontend interface.
- `static/style.css`: CSS file for styling the frontend.
- `static/script.js`: JavaScript file for client-side interaction, including text input, button handling, and audio player functionality.
- `static/audio/`: Directory for storing synthesized audio files.

## Notes

- Old audio files are automatically deleted after 30 seconds to save space on the server.
