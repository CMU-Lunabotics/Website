import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <style>{`
        .footer-wrapper {
          background: rgba(217, 217, 217, 0.16); 
          width: 100%;
          position: relative;
          color: #FFFFFF;
          font-family: 'Noto Sans Display', sans-serif;
          padding: 40px 5.56%;
          box-sizing: border-box;
          margin-top: 60px;
          overflow: hidden;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 30px;
        }

        .link-grid {
          display: flex;
          gap: 32px;
          flex: 1;
        }

        .link-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 100px;
        }

        .link-column h3 {
          font-weight: 700;
          font-size: 20px;
          line-height: 1.2;
          margin: 0 0 4px 0;
        }

        .link-column a {
          color: #FFFFFF;
          text-decoration: underline;
          font-size: 14px;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .newsletter-box {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid #747474;
          border-radius: 7px;
          padding: 25px 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 380px;
          box-sizing: border-box;
        }

        .newsletter-text h2 {
          font-weight: 700;
          font-size: 24px;
          margin: 0;
          text-align: center;
        }

        .newsletter-text p {
          font-weight: 400;
          font-size: 14px;
          margin: 4px 0 0 0;
          text-align: center;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
        }

        .email-input-wrapper {
          flex: 1;
          border: 1px solid #949494;
          border-radius: 7px;
          padding: 8px 15px;
          background: transparent;
          height: 38px;
          display: flex;
          align-items: center;
        }

        .email-input-wrapper input {
          background: transparent;
          border: none;
          color: #FFFFFF;
          width: 100%;
          outline: none;
          font-size: 14px;
        }

        .signup-btn {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 50px;
          height: 38px;
          padding: 0 20px;
          color: #FFFFFF;
          font-size: 14px;
          border: none;
          cursor: pointer;
        }

        .footer-bottom {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .contact-info h3 {
          font-weight: 700;
          font-size: 20px;
          margin: 0;
        }

        .contact-info p {
          font-size: 14px;
          margin: 4px 0 0 0;
        }

        /* Updated Social Frame Section */
        .social-frame {
          margin-top: 16px;
          width: 155px; /* Width from Figma Frame 621 */
          height: 36px;
          background-image: url('https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/footer/Frame%20621%20(2).svg');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left center;
        }

        .nasa-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nasa-logo {
          width: 28px;
          height: 28px;
          background: url('https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg') no-repeat center;
          background-size: contain;
        }

        .copyright {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          opacity: 0.6;
          width: 100%;
        }
      `}</style>

      <div className="footer-top">
        <div className="link-grid">
          <div className="link-column">
            <h3>Home</h3>
            <a href="#about">About</a>
          </div>
          <div className="link-column">
            <h3>Team</h3>
            <a href="#story">Our story</a>
            <a href="#team">Our team</a>
          </div>
          <div className="link-column">
            <h3>Sponsors</h3>
            <a href="#partner">Partner</a>
            <a href="#donate">Donate</a>
          </div>
          <div className="link-column">
            <h3>Updates</h3>
            <a href="#news">News</a>
          </div>
        </div>

        <div className="newsletter-box">
          <div className="newsletter-text">
            <h2>Mailing List</h2>
            <p>Stay informed on our mission.</p>
          </div>
          <div className="newsletter-form">
            <div className="email-input-wrapper">
              <input type="email" placeholder="Email Address" />
            </div>
            <button className="signup-btn">Join</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="contact-info">
          <h3>Contact</h3>
          <p>cmumoonminers@gmail.com</p>
          {/* New SVG Frame Replacement */}
          <div className="social-frame" title="Social Links"></div>
        </div>

        <div className="nasa-section">
          <div className="nasa-logo"></div>
          <p style={{fontSize: '14px'}}>NASA Lunabotics Challenge</p>
        </div>
      </div>

      <div className="copyright">
        Moon Miners © 2026
      </div>
    </footer>
  );
};