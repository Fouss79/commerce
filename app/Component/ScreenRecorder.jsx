"use client";

import { useRef, useState } from "react";

export default function ScreenRecorder() {
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedUrl(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Erreur de capture :", err);
    }
  };

  const stopCapture = () => {
    mediaRecorderRef.current.stop();

    const tracks = mediaRecorderRef.current.stream?.getTracks();
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }

    setIsRecording(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Capture d’écran vidéo</h2>

      <div className="flex gap-4 mb-4">
        {!isRecording ? (
          <button
            onClick={startCapture}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Démarrer
          </button>
        ) : (
          <button
            onClick={stopCapture}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Arrêter
          </button>
        )}
      </div>

      {recordedUrl && (
        <div>
          <h3 className="font-semibold">Vidéo enregistrée :</h3>
          <video src={recordedUrl} controls className="w-full mt-2" />
          <a
            href={recordedUrl}
            download="capture.webm"
            className="block mt-2 text-blue-500 underline"
          >
            Télécharger
          </a>
        </div>
      )}
    </div>
  );
}
