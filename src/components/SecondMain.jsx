import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const SecondMain = ({
  audioFile,
  isPlaying,
  setIsPlaying,
  currentTime,
  audioPlayerRef,
  isRegion,
  setIsRegion,
  setCurrentTime,
  playCrampedRegion,
  setPlayCrampedRegion,
  secondSelectedRegion,
  setSecondSelectedRegion,
}) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [crampedRegion, setCrampedRegion] = useState(null);
  console.log(secondSelectedRegion);

  const handleUpdateRegion = (region) => {
    setSecondSelectedRegion({
      start: region.start,
      end: region.end,
    });
  };

  const handleSelectRegion = () => {
    setIsPlaying(false);
    setPlayCrampedRegion(false);
    setCurrentTime(0);
    setIsRegion((prev) => !prev);
    if (isRegion) {
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
          url: URL.createObjectURL(audioFile),
        });

        const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());

        const random = (min, max) => Math.random() * (max - min) + min;
        const randomColor = () =>
          `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

        wavesurfer.on("decode", () => {
          const cramped = wsRegions.addRegion({
            start: 0,
            end: 2,
            color: randomColor(),
            minLength: 1,
            maxLength: 10,
          });
          setCrampedRegion(cramped);

          wsRegions.addRegion({
            start: 12,
            end: 17,
            content: "Drag me",
            color: randomColor(),
            resize: false,
          });

          wsRegions.addRegion({
            start: 19,
            content: "Marker",
            color: randomColor(),
          });

          wsRegions.addRegion({
            start: 20,
            content: "Second marker",
            color: randomColor(),
          });
        });

        wsRegions.enableDragSelection({
          color: "rgba(255, 0, 0, 0.1)",
        });

        wsRegions.on("region-updated", (region) => {
          // console.log("Updated region", region);
          handleUpdateRegion(region);
        });

        let activeRegion = null;
        wsRegions.on("region-in", (region) => {
          console.log("region-in", region);
          activeRegion = region;
        });
        wsRegions.on("region-out", (region) => {
          console.log("region-out", region);
          if (activeRegion === region) {
            region.play();
            activeRegion = null;
          }
        });
        wsRegions.on("region-clicked", (region, e) => {
          e.stopPropagation();
          activeRegion = region;
          region.play();
          region.setOptions({ color: randomColor() });
        });

        wavesurfer.on("interaction", () => {
          activeRegion = null;
        });

        wavesurferRef.current = wavesurfer;

        return () => {
          wavesurfer.destroy();
        };
      }
    } else {
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
          url: URL.createObjectURL(audioFile),
        });

        wavesurferRef.current = wavesurfer;

        return () => {
          wavesurfer.destroy();
        };
      }
    }
  };

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
        url: URL.createObjectURL(audioFile),
      });

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

  useEffect(() => {
    const wavesurfer = wavesurferRef.current;
    if (playCrampedRegion && crampedRegion && wavesurfer) {
      wavesurfer.play(crampedRegion.start, crampedRegion.end);
    } else if (!playCrampedRegion && wavesurfer) {
      wavesurfer.pause();
    }
  }, [playCrampedRegion, crampedRegion]);

  return (
    <>
      <div className="bg-gray-600 mx-5 my-8 h-2/6 flex items-center">
        <div className="flex-grow relative">
          <div ref={waveformRef} className="waveform w-full" />
        </div>
      </div>
      {audioFile && (
        <div className="flex justify-center">
          <button
            onClick={handleSelectRegion}
            type="button"
            className="py-2 w-36 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 "
          >
            {isRegion ? "Add Region" : "Remove Region"}
          </button>
        </div>
      )}
    </>
  );
};

export default SecondMain;
