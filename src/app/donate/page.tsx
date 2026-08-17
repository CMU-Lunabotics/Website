'use client';
import React, { useState } from 'react';

const DonatePage = () => {
  const donationLink =
    'https://givenow.cmu.edu/campaigns/42968/donations/new?a=9031589&designation=planetaryroboticsfund&amt=';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    window.open(donationLink, '_blank');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Cosmic backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(51,32,79,0.5) 0%, rgba(196,18,48,0.12) 55%, transparent 80%)',
        }}
        aria-hidden
      />

      <main className="relative flex justify-center items-start px-5 pt-36 pb-24">
        <div className="w-full max-w-3xl card-cosmic clip-corner-sm backdrop-blur-md px-7 py-14 sm:px-14 sm:py-16">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4 flex items-center justify-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              Fuel The Mission
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-starlight mb-4">
              Support Moon Miners
            </h1>
            <p className="text-lg text-moon-dust leading-relaxed max-w-xl mx-auto">
              Your donation helps us push the boundaries of planetary robotics.
              Please fill out the form below before proceeding to the donation page.
            </p>
          </div>

          <div className="w-full max-w-xl mx-auto">
            <div className="mb-8">
              <label htmlFor="fullName" className="block mb-3 text-sm font-medium text-starlight">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-14 px-5 bg-void/70 border border-titanium/40 text-starlight text-base outline-none transition-colors focus:border-supernova/70 placeholder:text-titanium"
              />
            </div>

            <div className="mb-10">
              <label htmlFor="email" className="block mb-3 text-sm font-medium text-starlight">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-5 bg-void/70 border border-titanium/40 text-starlight text-base outline-none transition-colors focus:border-supernova/70 placeholder:text-titanium"
              />
            </div>

            <button
              onClick={handleContinue}
              className="w-full h-14 bg-tartan text-starlight text-base font-semibold uppercase tracking-wider transition-all hover:bg-supernova glow-supernova-hover cursor-pointer"
            >
              Continue to donation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonatePage;
