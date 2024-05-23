import React, { useRef, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import SecondMain from "./components/SecondMain";
import Sidebar from "./components/Sidebar";

// New
export default function Home({ requestId }) {
  const [audioFile, setAudioFile] = useState(null);
  const [secondAudioFile, setSecondAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioPlayerRef = useRef(null);
  const secondAudioPlayerRef = useRef(null);
  const [isRegion, setIsRegion] = useState(true);
  const [playRegion, setPlayRegion] = useState(false);
  const [playCrampedRegion, setPlayCrampedRegion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [secondFile, setSecondFile] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [secondSelectedRegion, setSecondSelectedRegion] = useState(null);

  const handleStopPlayingAudio = () => {
    const audioPlayer = audioPlayerRef.current;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  };

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

  const playSecondAudio = () => {
    const audioPlayer = secondAudioPlayerRef.current;

    if (audioFile && audioPlayer) {
      if (!isPlaying) {
        audioPlayer.src = URL.createObjectURL(secondAudioFile);
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

  const handleSecondFileChange = (file) => {
    setSecondAudioFile(file);
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
        <Header
          onFileChange={handleFileChange}
          requestId={requestId}
          secondFile={secondFile}
          setSecondFile={setSecondFile}
          onSecondFileChange={handleSecondFileChange}
        />
        {!secondFile ? (
          <Main
            audioFile={audioFile}
            isPlaying={isPlaying}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            onAudioEnded={handleAudioEnded}
            audioPlayerRef={audioPlayerRef}
            setIsPlaying={setIsPlaying}
            isRegion={isRegion}
            setIsRegion={setIsRegion}
            playRegion={playRegion}
            setPlayRegion={setPlayRegion}
            playCrampedRegion={playCrampedRegion}
            setPlayCrampedRegion={setPlayCrampedRegion}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            isLoading={isLoading}
          />
        ) : (
          <SecondMain
            audioFile={secondAudioFile}
            isPlaying={isPlaying}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            onAudioEnded={handleAudioEnded}
            audioPlayerRef={secondAudioPlayerRef}
            setIsPlaying={setIsPlaying}
            isRegion={isRegion}
            setIsRegion={setIsRegion}
            playRegion={playRegion}
            setPlayRegion={setPlayRegion}
            playCrampedRegion={playCrampedRegion}
            setPlayCrampedRegion={setPlayCrampedRegion}
            secondSelectedRegion={secondSelectedRegion}
            setSecondSelectedRegion={setSecondSelectedRegion}
            isLoading={isLoading}
          />
        )}

        {/* Define the audio player */}
        <audio
          ref={audioPlayerRef}
          onEnded={handleAudioEnded}
          onPause={() => setIsPlaying(false)}
        />
        <audio
          ref={secondAudioPlayerRef}
          onEnded={handleAudioEnded}
          onPause={() => setIsPlaying(false)}
        />
      </div>
      <Sidebar
        onPlayAudio={playAudio}
        onPlaySecondAudio={playSecondAudio}
        audioFile={audioFile}
        secondAudioFile={secondAudioFile}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isRegion={isRegion}
        setIsRegion={setIsRegion}
        playRegion={playRegion}
        setPlayRegion={setPlayRegion}
        playCrampedRegion={playCrampedRegion} // Pass the new state
        setPlayCrampedRegion={setPlayCrampedRegion} // Pass the function to set the new state
        secondFile={secondFile}
        setSecondFile={setSecondFile}
        handleStopPlayingAudio={handleStopPlayingAudio}
        selectedRegion={selectedRegion}
        secondSelectedRegion={secondSelectedRegion}
        requestId={requestId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
