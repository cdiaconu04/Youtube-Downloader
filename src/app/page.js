"use client";
import Image from "next/image";
import { Search } from 'lucide-react';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 space-y-5">
      <h1 className="text-3xl font-bold text-white">Youtube to mp3</h1>

      <div className="flex flex-row rounded-full bg-gray-800 border border-gray-700 space-x-5">
        <input
          type="text"
          placeholder="Paste YouTube URL here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-6 pr-3 py-2 rounded-l-full"
        />
        
        <div className="flex item-center justify-center">
          {/* <Search/> */}
          <button/>
        </div>
      </div>


    </div>
  );
}
