"use client";

export default function Loading() {
  return (
    <>
      {/* Global styles */}
      <style jsx global>{`
        /* Full-screen flex container */
        .loader-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background: #ffffff; /* white background */
        }

        .loader {
          width: 60px;
          display: flex;
          justify-content: space-evenly;
        }

        .ball {
          list-style: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #0b5e7c; /* requested color */
          gap: 5px;
        }

        .ball:nth-child(1) {
          animation: bounce-1 2.1s ease-in-out infinite;
        }

        .ball:nth-child(2) {
          animation: bounce-2 2.1s ease-in-out 0.3s infinite;
        }

        .ball:nth-child(3) {
          animation: bounce-3 2.1s ease-in-out 0.6s infinite;
        }

        @keyframes bounce-1 {
          50% {
            transform: translateY(-18px);
            width: 6px;
            height: 6px;
          }
        }

        @keyframes bounce-2 {
          50% {
            transform: translateY(-18px);
            width: 6px;
            height: 6px;
          }
        }

        @keyframes bounce-3 {
          50% {
            transform: translateY(-18px);
            width: 6px;
            height: 6px;
          }
        }
      `}</style>

      {/* Markup */}
      <div className="loader-wrapper">
        <ul className="loader">
          <li className="ball" />
          <li className="ball" />
          <li className="ball" />
        </ul>
      </div>
    </>
  );
}