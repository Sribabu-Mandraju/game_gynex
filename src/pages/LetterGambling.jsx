import { useState } from "react";
import letterSentences from "../data/letterSentences";

function twistText(value) {
  if (!value) return "";

  // Use grapheme clusters so Telugu vowel signs (like 'ో') stay attached
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("te", { granularity: "grapheme" });
    const graphemes = [...segmenter.segment(value)].map(
      (segment) => segment.segment,
    );
    return graphemes.reverse().join("");
  }

  // Fallback if Segmenter is not available
  return [...value].reverse().join("");
}

function LetterGambling() {
  const [activeSentence, setActiveSentence] = useState(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Game 02</p>
          <h1>Letter Gambling</h1>
          <p className="subtitle">
            Only numbers are shown on the cards. Tap a number to reveal the full
            Telugu line in a twisted mirrored view.
          </p>
        </div>
      </header>

      <section className="card card-large">
        <h2>How to play with these sentences</h2>
        <ol className="steps">
          <li>Pick any numbered card from the grid below.</li>
          <li>
            When it opens full screen, players read the twisted mirrored line
            and use it for your letter or guessing game.
          </li>
          <li>
            You can time each round and give points for correct guesses or
            fastest answers.
          </li>
        </ol>
      </section>

      <section className="card sentence-grid-card">
        <h2>Telugu sentences ({letterSentences.length})</h2>
        <div className="sentence-grid">
          {letterSentences.map((item, index) => {
            const [id, text] = Object.entries(item)[0];

            return (
              <button
                key={id}
                type="button"
                className="sentence-card"
                onClick={() => {
                  setActiveSentence(text);
                  setRevealed(false);
                }}
              >
                <span className="sentence-index">{index + 1}</span>
              </button>
            );
          })}
        </div>
      </section>

      {activeSentence && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveSentence(null)}
        >
          <div className="overlay-backdrop" aria-hidden="true" />

          <div
            className="overlay-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="overlay-close"
              onClick={() => setActiveSentence(null)}
            >
              Close
            </button>

            <div className="overlay-actions">
              <button
                type="button"
                className="overlay-reveal"
                onClick={() => setRevealed((current) => !current)}
              >
                {revealed ? "Hide answer" : "Reveal answer"}
              </button>
            </div>

            <div className="overlay-text-wrapper">
              <p
                className={
                  revealed ? "overlay-text overlay-text-answer" : "overlay-text"
                }
              >
                {revealed ? activeSentence : twistText(activeSentence)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LetterGambling;
