import React from 'react';

const DonatePage = () => {
  return (
    <div className="page-wrapper">
      <style>{`
        /* 1. Global Setup */
        .page-wrapper {
          background-color: #000;
          color: #fff;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          position: relative;
          font-family: 'Inter', -apple-system, sans-serif;
          margin: 0;
          overflow: hidden; 
        }

        /* 2. Vector Background (Blueprint) */
        .vector-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/donors/Group%20671%20(2).svg');
          background-size: 55%; 
          background-repeat: no-repeat;
          background-position: 70% center; 
          opacity: 0.6; 
          z-index: 1;
          pointer-events: none;
        }

        /* 3. Navigation */
        .nav {
          display: flex;
          justify-content: space-between;
          padding: 40px 80px;
          z-index: 10;
        }
        .logo { 
          font-weight: 800; 
          letter-spacing: 5px; 
          font-size: 14px;
          text-transform: uppercase;
        }

        /* 4. Main Content Area */
        .main-content {
          flex: 1;
          display: flex;
          justify-content: center; 
          align-items: center;
          z-index: 5;
        }

        /* 5. THE GRAY TRANSPARENT GRADIENT BOX (No Borders) */
        .donation-box {
          /* Top: Light Metallic Gray | Bottom: Fully Transparent Black */
          background: linear-gradient(
            180deg, 
            rgba(130, 130, 130, 0.25) 0%,   
            rgba(0, 0, 0, 0) 100%    
          );
          
          /* Blur defines the glass shape instead of a border */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          
          border-radius: 4px;
          border: none; /* Borders removed */
          
          width: 520px;
          max-width: 90%;
          padding: 60px 50px;
          text-align: center;
          
          /* Shadow provides the necessary depth/separation */
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.7);
        }

        .donation-box h1 { 
          font-size: 32px; 
          font-weight: 700; 
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .donation-box p { 
          font-size: 14px; 
          opacity: 0.7; 
          margin-bottom: 40px; 
          line-height: 1.6;
        }

        /* Form Elements (No Borders) */
        .field { text-align: left; margin-bottom: 25px; }
        .field label { 
          display: block; 
          margin-bottom: 10px; 
          font-size: 10px; 
          color: rgba(255, 255, 255, 0.5); 
          text-transform: uppercase; 
          letter-spacing: 2px;
        }
        
        .field input {
          width: 100%;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05); 
          border: none; /* Borders removed */
          color: #fff;
          border-radius: 2px;
          font-size: 15px;
          outline: none;
        }

        .action-btn {
          width: 100%;
          padding: 20px;
          background: #fff;
          color: #000;
          font-weight: 800;
          border: none;
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: background 0.3s;
        }
        
        .action-btn:hover {
          background: #d4d4d4;
        }
      `}</style>

      <div className="vector-bg" />

      <nav className="nav">
        <div className="logo">Moon Miners</div>
        <div style={{fontSize: '11px', opacity: 0.4, letterSpacing: '3px'}}>SECURE ACCESS</div>
      </nav>

      <main className="main-content">
        <div className="donation-box">
          <h1>Support the Mission</h1>
          <p>The technical drawing behind this terminal represents the hardware your contribution will fund.</p>
          
          <div className="field">
            <label>Full Name</label>
            <input type="text" placeholder="Mission Member Name" />
          </div>

          <div className="field">
            <label>Email Address</label>
            <input type="email" placeholder="contact@agency.gov" />
          </div>

          <button className="action-btn">Initialize Transfer</button>
        </div>
      </main>
    </div>
  );
};

export default DonatePage;