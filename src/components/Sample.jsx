import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const Main = ({ audioFile, isPlaying, currentTime, audioPlayerRef }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [loop, setLoop] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(10);

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

      // Initialize the Regions plugin
      const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());

      // Give regions a random color when they are created
      const random = (min, max) => Math.random() * (max - min) + min;
      const randomColor = () =>
        `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

      // Create some regions at specific time ranges
      wavesurfer.on("decode", () => {
        // Regions
        // wsRegions.addRegion({
        //   start: 0,
        //   end: 8,
        //   content: "Resize me",
        //   color: randomColor(),
        //   drag: false,
        //   resize: true,
        // });

        wsRegions.addRegion({
          start: 9,
          end: 10,
          // content: "Cramped region",
          color: randomColor(),
          minLength: 1,
          maxLength: 10,
        });

        wsRegions.addRegion({
          start: 12,
          end: 17,
          content: "Drag me",
          color: randomColor(),
          resize: false,
        });

        // Markers (zero-length regions)
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
        console.log("Updated region", region);
      });

      {
        let activeRegion = null;
        wsRegions.on("region-in", (region) => {
          console.log("region-in", region);
          activeRegion = region;
        });
        wsRegions.on("region-out", (region) => {
          console.log("region-out", region);
          if (activeRegion === region) {
            if (loop) {
              region.play();
            } else {
              activeRegion = null;
            }
          }
        });
        wsRegions.on("region-clicked", (region, e) => {
          e.stopPropagation(); // prevent triggering a click on the waveform
          activeRegion = region;
          region.play();
          region.setOptions({ color: randomColor() });
        });

        // Reset the active region when the user clicks anywhere in the waveform
        wavesurfer.on("interaction", () => {
          activeRegion = null;
        });
      }

      // Update the zoom level on slider change
      wavesurfer.once("decode", () => {
        wavesurfer.zoom(zoomLevel);
      });

      wavesurferRef.current = wavesurfer;

      return () => {
        wavesurfer.destroy();
      };
    }
  }, [audioFile, loop, zoomLevel]);

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

  const handleZoomLevelChange = (event) => {
    setZoomLevel(event.target.value);
  };

  return (
    <div className="bg-gray-600 mx-5 my-8 h-2/6 flex items-center">
      <div className="flex-grow relative">
        <div ref={waveformRef} className="waveform w-full" />
        {/* <div>
          <label>
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => setLoop(e.target.checked)}
            />
            Loop regions
          </label>
          <label style={{ marginLeft: "2em" }}>
            Zoom:{" "}
            <input
              type="range"
              min="10"
              max="1000"
              value={zoomLevel}
              onChange={handleZoomLevelChange}
            />
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default Main;
