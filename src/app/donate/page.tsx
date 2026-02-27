'use client';

import React from 'react';

export default function DonatePage() {
  return (
    <main className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      {/* Main Container: pt-[120px] gives space for the Navbar from layout.tsx */}
      <div className="relative pt-[120px] pb-20 px-4 flex flex-col items-center">
        
        {/* The "Rectangle 21" Card from Figma */}
        <div className="w-full max-w-[1062px] bg-[#D9D9D9]/10 backdrop-blur-md rounded-[2px] p-12 md:p-20 border border-white/10 shadow-2xl">
          
          {/* Header Section (Frame 2 in your CSS) */}
          <div className="flex flex-col gap-4 text-center mb-16 max-w-[959px] mx-auto">
            <h1 className="text-[42px] md:text-[56px] font-semibold leading-tight tracking-tight font-['Noto_Sans_Display',_sans-serif]">
              Support Moon Miners
            </h1>
            <p className="text-[18px] md:text-[20px] font-light text-white/80 leading-relaxed font-['Noto_Sans_Display',_sans-serif]">
              Your donation helps us push the boundaries of planetary robotics. 
              Please fill out the form below before proceeding to the donation page.
            </p>
          </div>

          {/* Form Inputs (Grouped logically) */}
          <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
            
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em] ml-1">
                Full Name
              </label>
              <input 
                type="text"
                placeholder="Enter your name"
                className="w-full h-[70px] bg-white/5 border border-white/20 rounded-[2px] px-6 text-lg focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em] ml-1">
                Email Address
              </label>
              <input 
                type="email"
                placeholder="email@example.com"
                className="w-full h-[70px] bg-white/5 border border-white/20 rounded-[2px] px-6 text-lg focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
              />
            </div>

            {/* Continue Button (The "Frame 60" style) */}
            <button className="w-full h-[80px] bg-white text-black hover:bg-white/90 rounded-[2px] transition-all flex items-center justify-center mt-6 group">
              <span className="text-[20px] font-bold uppercase tracking-widest">
                Continue to donation
              </span>
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}