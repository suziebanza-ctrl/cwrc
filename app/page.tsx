import Link from "next/link";

export default function EntrancePage() {
  return (
    <main className="entrance">
      <section className="content">
        <p className="eyebrow">Welcome to</p>

        <h1>
          The Cathy Was Right
          <br />
          Research Center
        </h1>

        <p className="values">Humour • Kindness • Curiosity</p>

        <Link href="/home" className="imageLink">
          <img
            src="/images/facade.png"
            alt="The Cathy Was Right Research Center facade"
            className="facade"
          />
        </Link>

        <p className="tagline">Where evidence catches up with Cathy.</p>

        <Link href="/home" className="enterButton">
          Enter the Center
        </Link>
      </section>

      <style>{`
        .entrance {
          min-height: 100vh;
          background: radial-gradient(circle at top, #f7f1e6 0%, #102a4c 100%);
          color: #f7f1e6;
          font-family: Georgia, serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          overflow: hidden;
        }

        .content {
          max-width: 1180px;
          width: 100%;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 1.8s ease forwards;
        }

        .eyebrow {
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #d8c49a;
          font-size: 0.9rem;
          margin-bottom: 14px;
        }

        h1 {
          font-size: clamp(2.7rem, 7vw, 6rem);
          line-height: 0.95;
          margin: 0 0 16px;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }

        .values {
          font-size: 1.25rem;
          margin-bottom: 28px;
          color: #f7f1e6;
        }

        .imageLink {
          display: block;
          text-decoration: none;
        }

        .facade {
          width: 100%;
          max-height: 60vh;
          object-fit: cover;
          border-radius: 28px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.42);
          border: 1px solid rgba(247, 241, 230, 0.5);
          cursor: pointer;
          opacity: 0;
          transform: scale(0.97);
          animation: imageReveal 2.2s ease 0.6s forwards;
          transition: transform 0.8s ease, filter 0.8s ease;
        }

        .facade:hover {
          transform: scale(1.02);
          filter: brightness(1.08);
        }

        .tagline {
          font-size: 1.35rem;
          color: #d8c49a;
          margin: 28px 0 22px;
          opacity: 0;
          animation: fadeInOnly 1.4s ease 1.6s forwards;
        }

        .enterButton {
          display: inline-block;
          padding: 16px 36px;
          border-radius: 999px;
          background-color: #f7f1e6;
          color: #102a4c;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1rem;
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.32);
          opacity: 0;
          transform: translateY(10px);
          animation: buttonReveal 1.2s ease 2.2s forwards, pulse 2.6s ease-in-out 3.6s infinite;
        }

        .enterButton:hover {
          background-color: #ffffff;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageReveal {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInOnly {
          to {
            opacity: 1;
          }
        }

        @keyframes buttonReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 16px 42px rgba(0, 0, 0, 0.32);
          }
          50% {
            box-shadow: 0 18px 55px rgba(247, 241, 230, 0.65);
          }
        }
      `}</style>
    </main>
  );
}