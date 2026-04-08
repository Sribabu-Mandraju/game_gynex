import { useRef, useState } from "react";

const VIDEO_FILES = [
  "vid-1.mp4",
  "vid-2.mp4",
  "vid-3.mp4",
  "vid-4.mp4",
  "vid-5.mp4",
  "vid-6.mp4",
  "vid-7.mp4",
  "vid-8.mp4",
  "vid-9.mp4",
  "vid-10.mp4",
  "vid-11.mp4",
  "vid-12.mp4",
  "vid-13.mp4",
];

function NoAudio() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [audioOn, setAudioOn] = useState(false);
  const videoRef = useRef(null);

  const hasSelection = activeIndex !== null;
  const currentSrc = hasSelection
    ? `/no_audio/${VIDEO_FILES[activeIndex]}`
    : "";

  function closeOverlay() {
    setActiveIndex(null);
    setAudioOn(false);
  }

  function toggleAudio() {
    const video = videoRef.current;
    if (!video) return;
    const next = !audioOn;
    video.muted = !next;
    setAudioOn(next);
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Game 05</p>
          <h1>No Audio</h1>
          <p className="subtitle">
            Choose a silent video, let players guess what&apos;s happening, then
            reveal the audio to see how close they were.
          </p>
        </div>
      </header>

      <section className="card card-large">
        <h2>How to play</h2>
        <ol className="steps">
          <li>Pick any numbered video card from the grid below.</li>
          <li>
            The video plays silently in full screen. Players describe or guess
            the scene.
          </li>
          <li>
            When you&apos;re ready, use &quot;Reveal audio&quot; so everyone
            hears the real sound.
          </li>
        </ol>
      </section>

      <section className="card sentence-grid-card noaudio-grid-card">
        <h2>No-audio clips ({VIDEO_FILES.length})</h2>
        <div className="sentence-grid">
          {VIDEO_FILES.map((_, index) => (
            <button
              key={VIDEO_FILES[index]}
              type="button"
              className="sentence-card"
              onClick={() => {
                setActiveIndex(index);
                setAudioOn(false);
              }}
            >
              <span className="sentence-index">{index + 1}</span>
            </button>
          ))}
        </div>
      </section>

      {hasSelection && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          onClick={closeOverlay}
        >
          <div className="overlay-backdrop" aria-hidden="true" />

          <div
            className="overlay-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="overlay-close"
              onClick={closeOverlay}
            >
              Close
            </button>

            <div className="overlay-actions">
              <button
                type="button"
                className="overlay-reveal"
                onClick={toggleAudio}
              >
                {audioOn ? "Mute audio" : "Reveal audio"}
              </button>
            </div>

            <div className="overlay-media-wrapper">
              <video
                key={currentSrc}
                ref={videoRef}
                className="overlay-video"
                src={currentSrc}
                autoPlay
                loop
                muted={!audioOn}
                playsInline
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoAudio;
