import React from "react";

const Sidebar = ({
  onPlayAudio,
  isPlaying,
  isRegion,
  setIsRegion,
  playRegion,
  setPlayRegion,
  playCrampedRegion,
  setPlayCrampedRegion,
}) => {
  return (
    <div className="max-w-72 bg-slate-950 w-72 h-screen">
      <div className="flex flex-col items-center gap-y-10 my-10">
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
              !isRegion
                ? "w-48 h-12 border  rounded-full text-gray-500 border-gray-500 flex items-center justify-center"
                : "w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
            }
            onClick={onPlayAudio}
            disabled={!isRegion}
          >
            Play Audio
          </button>
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

        <button className="w-48 h-12 border rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center">
          Next
        </button>

        <button className="w-48 h-12 border  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center">
          Detect Deep Fake
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
