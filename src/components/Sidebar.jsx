import React from "react";

const Sidebar = ({ onPlayAudio, isPlaying }) => {
  return (
    <div className="max-w-72 bg-slate-950 w-72 h-screen">
      <div className="flex flex-col items-center gap-y-10 my-10">
        {isPlaying ? (
          <div
            className="w-48 h-12 border cursor-pointer  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
            onClick={onPlayAudio}
          >
            Pause Audio
          </div>
        ) : (
          <div
            className="w-48 h-12 border cursor-pointer  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center"
            onClick={onPlayAudio}
          >
            Play Audio
          </div>
        )}

        <div className="w-48 h-12 border cursor-pointer  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center">
          Play Selection
        </div>

        <div className="w-48 h-12 border cursor-pointer  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center">
          Next
        </div>

        <div className="w-48 h-12 border cursor-pointer  rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center">
          Detect Deep Fake
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
