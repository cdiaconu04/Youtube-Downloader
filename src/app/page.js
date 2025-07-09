"use client";
import Image from "next/image";
import { Search } from 'lucide-react';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);

  const [file, setFile] = useState(null);

  const [title, setTitle] = useState("N/A");
  const [length, setLength] = useState("N/A");
  const [channel, setChannel] = useState("N/A");
  const [gotVideo, setGotVideo] = useState(true);

  const [hasError, setHasError] = useState(false);

  const handleAudioDownload = async () => {
    if (!query.trim()) return;

    const res = await fetch("/api/convert-audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: query })
    });

    setGotVideo(true);

    const data = await res.blob();

    const url = URL.createObjectURL(data);
    const a = document.createElement("a");

    a.href = url;
    a.download = "audio.webm";

    setFile(a);
    a.click();
  }

  const handleVideoDownload = async () => {
    if (!query.trim()) return;

    const res = await fetch("/api/convert-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: query })
    });

    setGotVideo(true);

    const data = await res.blob();

    const url = URL.createObjectURL(data);
    const a = document.createElement("a");

    a.href = url;
    a.download = "video.mp4";

    setFile(a);
    a.click();
  }

  const handleGetVideo = async () => {
    if (!query.trim()) {
      setHasError(true);
      return;
    }
    try {
      const res = await fetch(`/api/metadata?url=${encodeURIComponent(query)}`);

      if (!res.ok) {
        setHasError(true);
        return;
      }

      const data = await res.json();

      setTitle(data.videoDetails.title);
      setChannel(data.videoDetails.author.name);
      setLength(`${Math.floor(data.videoDetails.lengthSeconds / 60)}:${data.videoDetails.lengthSeconds % 60} minutes`);

      setHasError(false);
      return data;
    } catch (error) {
      setHasError(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 space-y-5">
      <h1 className="text-3xl font-bold text-white">Youtube Downloader</h1>

      <div className="flex flex-col gap-4">

        <div className="flex flex-row rounded-md bg-gray-800 border border-gray-700">
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-3 pr-20 py-2"
          />
            
          <div className="flex item-center justify-center rounded-md px-3 bg-sky-800 hover:bg-sky-700">
            <button onClick={handleGetVideo}>
              <Search/>
            </button>
          </div>


        </div>

        <div className="flex flex-col gap-3 bg-gray-800 p-3 rounded-md">
          <p className="text-lg">Video Details</p>
          <p> Title: {title}</p>
          <p> Channel: {channel}</p>
          <p> Length: {length}</p>

          <button 
            onClick={handleAudioDownload}
            className="bg-sky-800 hover:bg-sky-700 rounded-md p-3 text-md">
            Download Audio
          </button>
          <button 
            onClick={handleVideoDownload}
            className="bg-sky-800 hover:bg-sky-700 rounded-md p-3 text-md">
            Download Video
          </button>
        </div>
      </div>
    </div>
  );
}
