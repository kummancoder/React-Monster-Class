import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
// import instruction from "./instruction.js";
import instruction from "./upscin.js";

const execAsync = promisify(exec);

const ai = new GoogleGenAI({
  apiKey: "API KEY",
});

// Initialize Google Cloud TTS client
const ttsClient = new TextToSpeechClient({
  // If you're using a service account key file:
  keyFilename: './upsc-mock-interview-7fcfcd4ecd73.json',
  
  // Or if you're using Application Default Credentials (ADC):
  // Make sure to set GOOGLE_APPLICATION_CREDENTIALS environment variable
});

const History = [];

// Text-to-Speech function
async function textToSpeech(text, outputFile = 'output.mp3') {
  try {
    // Construct the request
    const request = {
      input: { text: text },
      voice: {
        languageCode: 'hi-IN', // Change to your preferred language
        name: 'hi-IN-Wavenet-B', // Change to your preferred voice
        ssmlGender: 'female',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        effectsProfileId: ['small-bluetooth-speaker-class-device'],
        pitch: 0,
        speakingRate: 1,
      },
    };

    // Performs the text-to-speech request
    const [response] = await ttsClient.synthesizeSpeech(request);
    
    // Write the binary audio content to a local file
    const writeFile = promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');
    
    console.log(`Audio content written to file: ${outputFile}`);
    
    // Play the audio file (works on most systems)
    await playAudio(outputFile);
    
  } catch (error) {
    console.error('Error in text-to-speech:', error);
  }
}

// Function to play audio file
async function playAudio(audioFile) {
  try {
    // Different commands for different operating systems
    let command;
    
    if (process.platform === 'win32') {
      // Windows
      command = `powershell -c "(New-Object Media.SoundPlayer '${audioFile}').PlaySync()"`;
    } else if (process.platform === 'darwin') {
      // macOS
      command = `afplay ${audioFile}`;
    } else {
      // Linux
      command = `mpg123 ${audioFile} || aplay ${audioFile} || paplay ${audioFile}`;
    }
    
    await execAsync(command);
    console.log('Audio playback completed');
  } catch (error) {
    console.log('Could not play audio automatically. Please play the audio file manually.');
    console.log('Audio file saved as:', audioFile);
  }
}

async function Chatting(userProblem) {
  History.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: History,
    config: {
      systemInstruction: instruction,
    },
  });

  History.push({
    role: "model",
    parts: [{ text: response.text }],
  });

  console.log("\n");
  console.log(response.text);
  
  // Ask user if they want to hear the response
  // const wantTTS = readlineSync.question("Do you want to hear the response? (y/n): ");
  
  if ('y' === 'y' ) {
    console.log("Converting to speech...");
    await textToSpeech(response.text);
  }
}

async function main() {
  console.log("Chat with TTS enabled!");
  console.log("Type 'exit' to quit the chat.");
  
  while (true) {
    const userProblem = readlineSync.question("Kumman : ");
    
    if (userProblem.toLowerCase() === 'exit') {
      console.log("Goodbye!");
      break;
    }
    
    await Chatting(userProblem);
  }
}

main().catch((error) => {
  console.error('Error in main:', error);
});