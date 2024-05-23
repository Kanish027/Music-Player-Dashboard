import React, { useState, useEffect } from "react";

const Report = ({ requestId }) => {
  const [pitch1, setPitch1] = useState("");
  const [pitch2, setPitch2] = useState("");
  const [audioWaveform1, setAudioWaveform1] = useState("");
  const [audioWaveform2, setAudioWaveform2] = useState("");
  const [matchingProbability, setMatchingProbability] = useState("");

  useEffect(() => {
    if (requestId) {
      fetchPitchValues();
      fetchAudioImages();
      fetchPrediction();
    }
  }, [requestId]);

  const fetchPitchValues = async () => {
    try {
      const response = await fetch(
        `http://speakerid.iphipi.com/get_pitch?request_id=${requestId}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setPitch1(data.pitch1);
        setPitch2(data.pitch2);
      }
    } catch (error) {
      console.error("Error fetching pitch values:", error);
    }
  };

  const fetchAudioImages = async () => {
    try {
      const response = await fetch(
        `http://speakerid.iphipi.com/images?request_id=${requestId}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setAudioWaveform1(data.image1);
        setAudioWaveform2(data.image2);
      }
    } catch (error) {
      console.error("Error fetching audio images:", error);
    }
  };

  const fetchPrediction = async () => {
    try {
      const response = await fetch(
        `http://speakerid.iphipi.com/predict?request_id=${requestId}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setMatchingProbability(data.score);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-3 bg-slate-900 text-white">
        <div>Requested Id: {requestId}</div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={handlePrint}
        >
          Download Report
        </button>
      </div>
      <div className="bg-slate-800 flex gap-5">
        <div className="flex flex-col gap-5 w-full">
          <div>
            {audioWaveform1 && (
              <img
                src={`data:image/jpeg;base64,${audioWaveform1}`}
                alt="Audio Waveform 1"
              />
            )}
          </div>
          <div>
            {audioWaveform2 && (
              <img
                src={`data:image/jpeg;base64,${audioWaveform2}`}
                alt="Audio Waveform 2"
              />
            )}
          </div>
        </div>
        <div className="text-white w-full max-w-sm my-5">
          <div className="text-xl font-semibold text-center">Report</div>
          <ul className="mx-5">
            <li className="my-2 list-disc">Request Id: {requestId}</li>
            <li className="my-2 list-disc">Pitch of File 1: {pitch1}</li>
            <li className="my-2 list-disc">Pitch of File 2: {pitch2}</li>
            <li className="my-2 list-disc">
              Audio Files Matching with probability {matchingProbability}
            </li>
            <li className="my-2 list-disc">
              Pitch: How high or low a person's voice sounds.
            </li>
            <li className="my-2 list-disc">
              Timbre: The unique quality or color of a person's voice.
            </li>
            <li className="my-2 list-disc">
              Prosody: The rhythm, stress, and intonation patterns of speech.
            </li>
            <li className="my-1 list-disc">
              Articulation: How clearly someone pronounces words.
            </li>
            <li className="my-1 list-disc">
              Consonant Clarity: The distinctness of consonant sounds in speech.
            </li>
            <li className="my-2 list-disc">
              Vowel Pronunciation: How vowels are articulated by a person.
            </li>
            <li className="my-2 list-disc">
              Nasality: The amount of nasal resonance in someone's voice.
            </li>
            <li className="my-2 list-disc">
              Speech Fluency: The ease and smoothness of speech production.
            </li>
            <li className="my-2 list-disc">
              Sibilance: The clarity and intensity of "s" and "sh" sounds.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Report;
