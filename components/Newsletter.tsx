"use client"; // everything here is server component by default, so it does not support useState, and so does on change. that's where this guy comes in, 'use client' converts this component into a client component to basically support useState and onChange

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Newsletter() {
  const [input, setInput] = useState("");

  console.log(input);
  return (
    <div className="flex flex-col space-y-8 md:w-[400px]">
      <form className="newsletter-form mt-10 animate-fade-in-3">
        <div
          className="group flex items-center gap-x-4 py-1 pl-4 pr-1 rounded-[9px]
        bg-[#090D11] hover:bg-[#15141B] shadow-outline-gray hover:shadow-transparent 
        focus-within:bg-[#15141B] focus-within:!shadow-outline-gray-focus 
        transition-all duration-300"
        >
          <EnvelopeIcon className="hidden sm:inline w-6 h-6 text-[#4B4C52] 
          group-focus-within:text-white group-hover:text-white 
          transition-colors duration-300"/>
          <input
            type="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="email@example.com"
            className="flex-1 text-white text-sm sm:text-base outline-none 
            placeholder-[#4B4C52] group-focus-within:placeholder-white 
            bg-transparent placeholder:transition placeholder:duration-400"
            required // transition animation not working
          />
          <button>
            <span className="default">Subscribe</span>
            <span className="success">
              <svg viewBox="0 0 16 16">
                <polyline points="3.75 9 7 12 13 5"></polyline>
              </svg>
              Done
            </span>
            <svg className="trails" viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className="plane">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
