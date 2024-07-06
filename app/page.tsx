import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] flex flex-col items-center 
    justify-center p-10 min-h-screen">
      <div className="space-y-1">
        <h2 className="z-10 text-3xl font-bold text-center 
        text-transparent duration-1000 bg-white cursor-default 
        text-stroke animate-title sm:text-5xl md:text-6xl whitespace-nowrap
        bg-clip-text" >
          {/* Text is not fully covered in white (like 2-3% black) pls fix */}
          Get updates by subscribing to the
        </h2>
          <h1 className="z-10 text-4xl font-bold text-center
          text-transparent duration-1000 bg-white cursor-default
         bg-gradient-to-r bg-clip-text sm:text-6xl md:text-7xl whitespace-nowrap
         from-purple-400 to-purple-800 animate-fade-in-3">Newsletter</h1>
      </div>
      <Newsletter/> 
      {/* <Socials /> */}
    </main>
  );
}
