"use client";
// app/loading.jsx   or   pages/loading.jsx
// app/loading.jsx   or   pages/loading.jsx
export default function Loading() {
  return (
    <>
      {/* Global styles for the animation */}
      <style jsx global>{`
        /* Full-screen flex container */
        .loader-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;          /* full viewport height */
          width: 100vw;           /* full viewport width  */
          background: #ffffff;    /* change if you want a bg color */
        }

        .loader {
          font-family: system-ui, sans-serif;
          font-size: 2rem;
          letter-spacing: 0.5em;
        }

        /* Common styles for every letter/dot */
        .loader span {
          display: inline-block;
          color: black;
          opacity: 0;
          text-shadow: 2px 2px 3px #919191;
        }

        /* Each letter */
        .l { animation: pass 2s ease-in-out infinite 0.2s;  }
        .o { animation: pass 2s ease-in-out infinite 0.3s;  }
        .a { animation: pass 2s ease-in-out infinite 0.4s;  }
        .d { animation: pass 2s ease-in-out infinite 0.5s;  }
        .i { animation: pass 2s ease-in-out infinite 0.6s;    }
        .n { animation: pass 2s ease-in-out infinite 0.7s;  }
        .g { animation: pass 2s ease-in-out infinite 0.8s;  }

        /* Dots */
        .d1 { animation: pass1 2s ease-in-out infinite 0.9s; }
        .d2 { animation: pass1 2s ease-in-out infinite 1s;   }

        @keyframes pass {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }

        @keyframes pass1 {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>

      {/* Markup */}
      <div className="loader-wrapper">
        <div className="loader">
          <span className="l">L</span>
          <span className="o">o</span>
          <span className="a">a</span>
          <span className="d">d</span>
          <span className="i">i</span>
          <span className="n">n</span>
          <span className="g">g</span>
          <span className="d1">.</span>
          <span className="d2">.</span>
        </div>
      </div>
    </>
  );
}