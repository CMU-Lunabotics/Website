import React from 'react';
import Link from 'next/link';

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

        .link-column a:hover {
          opacity: 1;
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

        .social-links {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
        }

        .social-links a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        .social-links a:hover {
          opacity: 1;
        }

        .social-links img {
          width: 24px;
          height: 24px;
          display: block;
          filter: brightness(0) invert(1);
        }

        .nasa-section {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #FFFFFF;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        .nasa-section:hover {
          opacity: 1;
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
            <Link href="/about">About</Link>
          </div>

          <div className="link-column">
            <h3>Team</h3>
            <Link href="/team">Our story</Link>
            <Link href="/team">Our team</Link>
          </div>

          <div className="link-column">
            <h3>Sponsors</h3>
            <Link href="/sponsors">Partner</Link>
            <Link href="/donate">Donate</Link>
          </div>

          <div className="link-column">
            <h3>Updates</h3>
            <Link href="/updates">News</Link>
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

          <div className="social-links">
            <a
              href="https://www.instagram.com/cmumoonminers"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg"
                alt="Instagram"
              />
            </a>

            <a
              href="https://www.youtube.com/@cmumoonminers"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg"
                alt="YouTube"
              />
            </a>

            <a
              href="https://www.linkedin.com/company/cmu-moon-miners/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>

        <a
          href="https://www.nasa.gov/learning-resources/for-colleges-universities/nasa-launches-2026-lunabotics-challenge/"
          target="_blank"
          rel="noopener noreferrer"
          className="nasa-section"
        >
          <div className="nasa-logo" />
          <p style={{ fontSize: '14px', margin: 0 }}>
            NASA Lunabotics Challenge
          </p>
        </a>
      </div>

      <div className="copyright">
        Moon Miners © 2026
      </div>
    </footer>
  );
};