import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Current playback position
  const audioPlayerRef = useRef(null);

  const playAudio = () => {
    const audioPlayer = audioPlayerRef.current;

    if (audioFile && audioPlayer) {
      if (!isPlaying) {
        audioPlayer.src = URL.createObjectURL(audioFile);
        audioPlayer.currentTime = currentTime; // Set the current time before playing
        audioPlayer.play();
        setIsPlaying(true);
      } else {
        setCurrentTime(audioPlayer.currentTime); // Store the current playback position
        audioPlayer.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleFileChange = (file) => {
    setAudioFile(file);
    setIsPlaying(false);
    setCurrentTime(0); // Reset playback position when a new file is selected
  };

  const handleAudioEnded = () => {
    // Handle audio playback end
    setIsPlaying(false);
    setCurrentTime(0); // Reset playback position
  };

  return (
    <div className="flex justify-between">
      <div className="w-full h-screen bg-slate-900">
        <Header onFileChange={handleFileChange} />
        <Main
          audioFile={audioFile}
          isPlaying={isPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          onAudioEnded={handleAudioEnded}
          audioPlayerRef={audioPlayerRef}
        />
        {/* Define the audio player */}
        <audio
          ref={audioPlayerRef}
          onEnded={handleAudioEnded}
          onPause={() => setIsPlaying(false)}
        />
      </div>
      <Sidebar onPlayAudio={playAudio} isPlaying={isPlaying} />
    </div>
  );
}
