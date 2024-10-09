# Text-to-Speech Web Application

This is a simple Text-to-Speech (TTS) web application built using Flask and Edge TTS. It allows users to input text, select different voices, adjust pitch and rate, and then play or download the synthesized audio in real-time.

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

## Environment Variables

To avoid storing sensitive data in the code, make sure to use environment variables where necessary (e.g., for API keys or deployment settings).

## Deployment

If you plan to deploy this application to services like **Koyeb** using a GitHub repository, follow these steps:

1. **Make the repository public** (optional):  
   This can be useful for portfolio purposes, but make sure to keep sensitive information out of the public repository (such as API keys, database credentials, etc.).

2. **Configure Environment Variables**:  
   Set up environment variables (such as API tokens) via the platform's dashboard (e.g., Koyeb) instead of hardcoding them.

3. **Deployment command**:  
   If using a service like Koyeb, simply link your GitHub repository and the platform will handle the deployment based on your code and configurations.

## Notes

- Ensure that the directory `static/audio/` exists, as this is where generated audio files are saved.
- Old audio files are automatically deleted after 30 seconds to save space on the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues or pull requests if you find any bugs or want to improve the application.
