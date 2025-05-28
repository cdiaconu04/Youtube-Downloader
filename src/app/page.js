"use client";
import Image from "next/image";
import { Search } from 'lucide-react';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);

  const handleSubmit = async () => {
    if (!query.trim()) return; // Check if empty or whitespace

    const res = await fetch("/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: query })
    });

    // const data = await res.json();
    const data = await res.blob();

    const url = URL.createObjectURL(data);
    const a = document.createElement("a");

    a.href = url;
    a.download = "audio.webm";

    a.click();

    // setVideoInfo(data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 space-y-5">
      <h1 className="text-3xl font-bold text-white">Youtube to mp3</h1>

      {/* Search box */}
      <div className="flex flex-row rounded-full bg-gray-800 border border-gray-700">
        <input
          type="text"
          placeholder="Paste YouTube URL here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-6 pr-20 py-2 rounded-l-full"
        />
        
        <div className="flex item-center justify-center bg-sky-950 rounded-r-full px-3 hover:bg-sky-800">
          <button onClick={handleSubmit}>
            <Search/>
          </button>
        </div>
      
      </div>


    </div>
  );
}
