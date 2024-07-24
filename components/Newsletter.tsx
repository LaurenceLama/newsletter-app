"use client"; // everything here is server component by default, so it does not support useState, and so does on change. that's where this guy comes in, 'use client' converts this component into a client component to basically support useState and onChange

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FormEvent, useRef, useState } from "react";
import { gsap } from "gsap";
import { getPlaneKeyframes } from "@/lib/getPlaneKeyframes";
import { getTrailsKeyframes } from "@/lib/getTrailsKeyframes";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

function Newsletter() {
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { to, fromTo, set } = gsap;
  const [successMessage, setSuccessMessage] =
    useState<MembersSuccessResponse>();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = input;
    const button = buttonRef.current;

    if (!email || !button) return;

    if (!active) {
      setActive(true);

      // Plane animation
      to(button, {
        keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setInput),
      });

      // Trails animation
      to(button, { keyframes: getTrailsKeyframes(button) });
    }

    // Post request
    const res = await fetch('/api/addSubscription', {
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = await res.json();

    if (data.error) { // sooo, now 'data' is now debugged, but new bug appeared. basically the json file does not consist of my MembersSuccessResponse(this is inside typings.d.ts) when console logging
      console.log(data.error) // and if i put this out of the if statement, it logs 'undefined'
      setErrorMessage("You're already subscribed!");
      setSuccessMessage(undefined);
      return;
      // so I guess it means the commands of creating new Response for json on route.ts does not mount properly, or my approach is wrong 
    }
    
    console.log(data)

    setSuccessMessage(data);
    setErrorMessage("");
  };

  const dismissMessages = () => {
    setSuccessMessage(undefined);
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col space-y-8 md:w-[400px]">
      <form
        className="newsletter-form mt-10 animate-fade-in-3"
        onSubmit={handleSubmit}
      >
        {/*do this: "onSubmit={e => handleSubmit}" to see this if you hover in e: "e: FormEvent<HTMLFormElement>", exclude "this part" */}
        <div
          className="group flex items-center gap-x-4 py-1 pl-4 pr-1 rounded-[9px]
        bg-[#090D11] hover:bg-[#15141B] shadow-outline-gray hover:shadow-transparent 
        focus-within:bg-[#15141B] focus-within:!shadow-outline-gray-focus 
        transition-all duration-300"
        >
          <EnvelopeIcon
            className="hidden sm:inline w-6 h-6 text-[#4B4C52] 
          group-focus-within:text-white group-hover:text-white 
          transition-colors duration-300"
          />
          <input
            type="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="email@example.com"
            className="flex-1 text-white text-sm sm:text-base outline-none 
            placeholder-[#4B4C52] group-focus-within:placeholder-white 
            bg-transparent placeholder:transition-colors placeholder:duration-400"
            required // transition animation not working
          />
          <button
            ref={buttonRef}
            className={`${
              active && "active"
            } disabled:!bg-[#17141F] disabled:grayscale-[65%] disabled:opacity-50 
            disabled:cursor-not-allowed text-sm md:text-base`}
            disabled={!input}
            type="submit"
          >
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

      <div className="relative">
        {(successMessage || errorMessage) && (
          <div
            className="flex items-start space-x-2 bg-[#0A0E12] 
          shadow-outline-gray text-white rounded-[9px] py-4 px-6 
          animate-fade-bottom absolute"
          >
            <div
              className="h-6 w-6 bg-[#1B2926] flex items-center 
            justify-center rounded-full border border-[#273130] 
            flex-shrink-0"
            >
              <CheckIcon className="h-4 w-4 text-[#81A89A]" />
            </div>
            <div className="text-xs sm:text-sm text-[#4B4C52]">
              {successMessage ? (
                <p>
                  We&apos;ve added{" "}
                  <span className="text-[#ADB0B1]">
                    {successMessage.email_address}
                  </span>{" "}
                  to our waitlist. We&apos;ll let you know when we launch!
                </p>
              ) : (
                <p>
                  You are already added to our waitlist. We&apos;ll let you know
                  when we launch!
                </p>
              )}
            </div>
            <XMarkIcon
              className="h-5 w-5 cursor-pointer flex-shrink-0 text-[#4A4B55]"
              onClick={dismissMessages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
