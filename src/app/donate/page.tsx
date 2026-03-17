'use client';
import React, { useState } from 'react';

const DonatePage = () => {
  const donationLink =
    'https://givenow.cmu.edu/campaigns/42968/donations/new?a=9031589&designation=planetaryroboticsfund&amt=';

  const backgroundPhoto =
    'https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/sponsors/robot%20background%20photo.png';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    window.open(donationLink, '_blank');
  };

  return (
    <div className="page-wrapper">
      <style>{`

        .page-wrapper {
          background: #000;
          color: #fff;
          min-height: 100vh;
          width: 100%;
          position: relative;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin: 0;
          overflow: hidden;
        }

        .background-photo {
          position: absolute;
          inset: 0;

          background-image: url('${backgroundPhoto}');
          background-repeat: no-repeat;

          /* KEY CHANGES */
          background-size: 80%; 
          background-position: right bottom; 

          /* add subtle dark overlay manually */
        }

        .background-photo::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.55) 0%,
            rgba(0,0,0,0.3) 40%,
            rgba(0,0,0,0.55) 100%
          );
        }

        .main-content {

          display: flex;
          justify-content: center;
          align-items: flex-start; 
          padding-top: 80px;
        }


        .donation-box {
          width: min(760px, 78%);
          min-height: 500px;
          padding: 72px 56px 58px;
          background: linear-gradient(
            90deg,
            rgba(70, 70, 70, 0.20) 0%,
            rgba(40, 40, 40, 0.13) 48%,
            rgba(70, 70, 70, 0.10) 100%
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 25px 90px rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .heading-block {
          text-align: center;
          margin-bottom: 72px;
        }

        .heading-block h1 {
          margin: 0 0 18px 0;
          font-size: clamp(20px, 2.5vw, 36px);
          font-weight: 600;
        }

        .heading-block p {
          font-size: 18px;
          opacity: 0.7;
          line-height: 1.5;
        }

        .form-area {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .field {
          margin-bottom: 44px;
        }

        .field label {
          display: block;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
        }

        .field input {
          width: 100%;
          height: 68px;
          padding: 0 24px;
          background: rgba(32, 32, 32, 0.42);
          border: none;
          outline: none;
          color: #fff;
          font-size: 18px;
          border-radius: 0;
          box-sizing: border-box;
        }

        .field input::placeholder {
          color: rgba(255, 255, 255, 0.82);
        }

        .action-btn {
          width: 100%;
          height: 64px;
          margin-top: 12px;
          background: rgba(106, 106, 106, 0.48);
          color: #fff;
          border: none;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(130, 130, 130, 0.6);
        }

        .action-btn:active {
          transform: translateY(1px);
        }

        @media (max-width: 900px) {
          .donation-box {
            padding: 64px 28px 48px;
            min-height: auto;
          }

          .heading-block {
            margin-bottom: 48px;
          }

          .field {
            margin-bottom: 30px;
          }

          .field label {
            font-size: 15px;
          }

          .field input {
            height: 58px;
            font-size: 16px;
          }

          .action-btn {
            height: 58px;
            font-size: 16px;
          }
        }
      `}</style>

      <div className="background-photo" />

      <main className="main-content">
        <div className="donation-box">
          <div className="heading-block">
            <h1>Support Moon Miners</h1>
            <p>
              Your donation helps us push the boundaries of planetary robotics.
              Please fill out the form below before proceeding to the donation page.
            </p>
          </div>

          <div className="form-area">
            <div className="field">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="action-btn" onClick={handleContinue}>
              Continue to donation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonatePage;