import { useState } from "react";

const MAX_NUMBER = 60;
const NUMBERS_PER_ROUND = 6;
const MAX_ROUNDS = Math.floor(MAX_NUMBER / NUMBERS_PER_ROUND);

function getNextSet(used) {
  const remaining = [];

  for (let value = 1; value <= MAX_NUMBER; value += 1) {
    if (!used.has(value)) remaining.push(value);
  }

  if (!remaining.length) return [];

  // Shuffle remaining numbers
  for (let index = remaining.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = remaining[index];
    remaining[index] = remaining[swapIndex];
    remaining[swapIndex] = temp;
  }

  const sliceSize = Math.min(NUMBERS_PER_ROUND, remaining.length);
  const slice = remaining.slice(0, sliceSize);
  slice.sort((a, b) => a - b);

  return slice;
}

function HookStep() {
  const [usedNumbers, setUsedNumbers] = useState(() => new Set());
  const [currentSet, setCurrentSet] = useState([]);
  const [rounds, setRounds] = useState(0);

  const remainingCount = MAX_NUMBER - usedNumbers.size;
  const canGenerate = remainingCount >= NUMBERS_PER_ROUND;

  function generate() {
    setCurrentSet((previous) => {
      const baseUsed = new Set(usedNumbers);
      // Remove previous set from used if we want strict global uniqueness?
      // For this game, we keep global uniqueness across all rounds.
      const nextSet = getNextSet(baseUsed);
      if (!nextSet.length) return previous;

      setUsedNumbers((prevUsed) => {
        const merged = new Set(prevUsed);
        nextSet.forEach((value) => merged.add(value));
        return merged;
      });
      setRounds((prev) => prev + 1);
      return nextSet;
    });
  }

  function reset() {
    setUsedNumbers(new Set());
    setCurrentSet([]);
    setRounds(0);
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Game 06</p>
          <h1>Hook Step Numbers</h1>
          <p className="subtitle">
            Generate six random numbers between 1 and 60 with no repeats across
            rounds. Perfect for choosing dancers or hook steps.
          </p>
        </div>
      </header>

      <section className="card card-large">
        <h2>How to play</h2>
        <ol className="steps">
          <li>Press &quot;Generate numbers&quot; to get six unique numbers.</li>
          <li>
            Call out these numbers for hook steps or team members. No number
            will repeat until you reset.
          </li>
          <li>
            You can generate up to {MAX_ROUNDS} rounds in one session
            (that&apos;s up to {MAX_ROUNDS * NUMBERS_PER_ROUND} unique numbers).
          </li>
        </ol>
      </section>

      <section className="card hook-card">
        <div className="hook-header-row">
          <div>
            <p className="hook-label">Current numbers</p>
            <p className="hook-sub">
              Round {rounds + 1} of {MAX_ROUNDS}
            </p>
          </div>
          <div className="hook-meta">
            <span>Used: {usedNumbers.size}</span>
            <span>Remaining: {remainingCount}</span>
          </div>
        </div>

        <div className="hook-grid">
          {currentSet.length ? (
            currentSet.map((value) => (
              <div key={value} className="hook-number">
                {value}
              </div>
            ))
          ) : (
            <p className="hook-placeholder">
              Press &quot;Generate numbers&quot; to start.
            </p>
          )}
        </div>

        <div className="hook-actions">
          <button
            type="button"
            className="hook-generate"
            disabled={!canGenerate}
            onClick={generate}
          >
            {rounds === 0 ? "Generate numbers" : "Next numbers"}
          </button>
          <button
            type="button"
            className="hook-reset"
            onClick={reset}
            disabled={usedNumbers.size === 0 && !currentSet.length}
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
}

export default HookStep;
