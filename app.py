from flask import Flask, render_template, request, jsonify, send_from_directory
import edge_tts
import asyncio
import time
import os

app = Flask(__name__)

AUDIO_DIR = os.path.join(app.root_path, 'static', 'audio')

async def get_available_voices():
    voices = await edge_tts.list_voices()
    return voices

async def synthesize_text(text, voice, pitch, rate):
    timestamp = str(int(time.time()))
    filename = os.path.join(AUDIO_DIR, f"output_audio_{timestamp}.mp3")
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    await communicate.save(filename)
    return filename

def delete_old_files(directory, max_age_seconds):
    if not os.path.exists(directory):
        os.makedirs(directory)

    current_time = time.time()
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            file_age = current_time - os.path.getmtime(filepath)
            if file_age > max_age_seconds:
                os.remove(filepath)

@app.route('/')
async def index():
    voices = await get_available_voices()
    return render_template('index.html', voices=voices)

@app.route('/synthesize', methods=['POST'])
def synthesize():
    data = request.json
    text = data.get('text')
    voice = data.get('voice')
    pitch = data.get('pitch')
    rate = data.get('rate')

    if not text or not voice:
        return jsonify({"error": "Text and voice are required"}), 400

    delete_old_files(AUDIO_DIR, 30)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    try:
        filename = loop.run_until_complete(synthesize_text(text, voice, pitch, rate))
    except edge_tts.exceptions.NoAudioReceived:
        return jsonify({"error": "No audio was received. Please choose a model for your language."}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400 

    return jsonify({"audio_url": f"/static/audio/{os.path.basename(filename)}"})

if __name__ == '__main__':
    app.run(debug=True)
