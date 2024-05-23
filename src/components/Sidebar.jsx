import React from "react";
import { uploadAudio } from "../utils/uploadAudio";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  onPlayAudio,
  onPlaySecondAudio,
  audioFile,
  secondAudioFile,
  isPlaying,
  setIsPlaying,
  isRegion,
  setIsRegion,
  playRegion,
  setPlayRegion,
  playCrampedRegion,
  setPlayCrampedRegion,
  secondFile,
  setSecondFile,
  handleStopPlayingAudio,
  selectedRegion,
  secondSelectedRegion,
  requestId,
}) => {
  const navigate = useNavigate();

  const handleSecondAudio = () => {
    setSecondFile(true);
    setIsPlaying(false);
    setIsRegion(true);
    handleStopPlayingAudio();
  };

  const sendToServer2 = async () => {
    try {
      await uploadAudio(
        requestId,
        2,
        secondAudioFile,
        secondSelectedRegion?.start,
        secondSelectedRegion?.end
      );
      navigate("/report");
    } catch (error) {
      console.error("Failed to upload second audio:", error);
    }
  };

  const sendToServer1 = async () => {
    try {
      await uploadAudio(
        requestId,
        1,
        audioFile,
        selectedRegion?.start,
        selectedRegion?.end
      );
      handleSecondAudio();
    } catch (error) {
      console.error("Failed to upload first audio:", error);
    }
  };

  return (
    <div className="max-w-72 bg-slate-950 w-72 h-screen">
      <div className="flex flex-col items-center gap-y-10 my-10">
        {secondFile ? (
          <div>
            {isPlaying ? (
              <button
                disabled={!isRegion}
                className={
                  !isRegion
                    ? ""
                    : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
                }
                onClick={onPlaySecondAudio}
              >
                Pause Audio
              </button>
            ) : (
              <button
                className={
                  !isRegion || !secondAudioFile
                    ? "w-48 h-12 border  rounded-full text-gray-500 border-gray-500 flex items-center justify-center"
                    : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
                }
                onClick={onPlaySecondAudio}
                disabled={!isRegion || !secondAudioFile}
              >
                Play Audio
              </button>
            )}
          </div>
        ) : (
          <div>
            {isPlaying ? (
              <button
                disabled={!isRegion}
                className={
                  !isRegion
                    ? ""
                    : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
                }
                onClick={onPlayAudio}
              >
                Pause Audio
              </button>
            ) : (
              <button
                className={
                  !isRegion || !audioFile
                    ? "w-48 h-12 border  rounded-full text-gray-500 border-gray-500 flex items-center justify-center"
                    : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
                }
                onClick={onPlayAudio}
                disabled={!isRegion || !audioFile}
              >
                Play Audio
              </button>
            )}
          </div>
        )}

        {playCrampedRegion ? (
          <button
            onClick={() => setPlayCrampedRegion(false)}
            disabled={isRegion}
            className={
              isRegion
                ? "w-48 h-12 border  rounded-full text-gray-500 border-gray-500 flex items-center justify-center"
                : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
            }
          >
            Pause Selection
          </button>
        ) : (
          <button
            onClick={() => setPlayCrampedRegion(true)}
            disabled={isRegion}
            className={
              isRegion
                ? "w-48 h-12 border  rounded-full text-gray-500 border-gray-500 flex items-center justify-center"
                : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
            }
          >
            Play Selection
          </button>
        )}

        {secondFile ? (
          <button
            onClick={sendToServer2}
            className={
              !secondAudioFile
                ? "w-48 h-12 border  rounded-full text-gray-500 border-gray-500 flex items-center justify-center"
                : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
            }
            disabled={!secondAudioFile}
          >
            Next
          </button>
        ) : (
          <button
            onClick={sendToServer1}
            className={
              !audioFile
                ? "w-48 h-12 border  rounded-full text-gray-500 border-gray-500 flex items-center justify-center"
                : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
            }
            disabled={!audioFile}
          >
            Next
          </button>
        )}

        <button className="w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center">
          Detect Deep Fake
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
