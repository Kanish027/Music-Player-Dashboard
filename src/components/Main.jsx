import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const Main = ({ audioFile, isPlaying, currentTime, audioPlayerRef }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    const previousWavesurfer = wavesurferRef.current;
    if (previousWavesurfer) {
      previousWavesurfer.destroy();
    }

    if (audioFile) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#A8A8A8",
        progressColor: "#2D5BFF",
        cursorColor: "#FFFFFF",
        height: 100,
        responsive: true,
      });

      wavesurfer.loadBlob(audioFile);
      wavesurferRef.current = wavesurfer;

      return () => {
        wavesurfer.destroy();
      };
    }
  }, [audioFile]);

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;
    const wavesurfer = wavesurferRef.current;

    if (wavesurfer && audioPlayer) {
      const handleTimeUpdate = () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        if (isFinite(currentTime) && isFinite(duration)) {
          wavesurfer.seekTo(currentTime / duration);
        }
      };

      const handleAudioEnded = () => {
        wavesurfer.seekTo(0);
      };

      audioPlayer.addEventListener("timeupdate", handleTimeUpdate);
      audioPlayer.addEventListener("ended", handleAudioEnded);

      const startAudioPlayback = () => {
        audioPlayer.play();
      };

      const stopAudioPlayback = () => {
        audioPlayer.pause();
      };

      isPlaying ? startAudioPlayback() : stopAudioPlayback();

      return () => {
        audioPlayer.removeEventListener("timeupdate", handleTimeUpdate);
        audioPlayer.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [isPlaying, audioPlayerRef, currentTime]);

  return (
    <div className="bg-gray-600 mx-5 my-8 h-2/6 flex items-center">
      <div className="flex-grow relative">
        <div ref={waveformRef} className="waveform w-full" />
      </div>
    </div>
  );
};

export default Main;
