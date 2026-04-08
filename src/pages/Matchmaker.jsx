import { useMemo, useRef, useState } from "react";
import boysData from "../data/boys.json";
import girlsData from "../data/girls.json";

const ITEM_HEIGHT = 120;
const REEL_REPEATS = 5;

function buildDisplayList(list) {
  const base = list.length ? list : ["Empty"];
  return Array.from({ length: REEL_REPEATS }, () => base).flat();
}

function Matchmaker() {
  const [boys, setBoys] = useState(
    () => boysData.boys?.map((entry) => entry.name) ?? [],
  );
  const [girls, setGirls] = useState(
    () => girlsData.girls?.map((entry) => entry.name) ?? [],
  );

  const [boyInput, setBoyInput] = useState("");
  const [girlInput, setGirlInput] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [buttonState, setButtonState] = useState("idle"); // idle | calculating | match
  const [showNotif, setShowNotif] = useState(false);

  const boyReelRef = useRef(null);
  const girlReelRef = useRef(null);
  const boyViewportRef = useRef(null);
  const girlViewportRef = useRef(null);

  const boyDisplay = useMemo(() => buildDisplayList(boys), [boys]);
  const girlDisplay = useMemo(() => buildDisplayList(girls), [girls]);

  async function startMatching() {
    if (isSpinning || !boys.length || !girls.length) return;

    setIsSpinning(true);
    setButtonState("calculating");

    await spinReel("boy", boys);
    await new Promise((resolve) => setTimeout(resolve, 400));
    await spinReel("girl", girls);

    setButtonState("match");
    setShowNotif(true);
    createConfetti();

    setTimeout(() => {
      setButtonState("idle");
      setShowNotif(false);
      setIsSpinning(false);
    }, 3000);
  }

  function spinReel(type, list) {
    return new Promise((resolve) => {
      const reel = type === "boy" ? boyReelRef.current : girlReelRef.current;
      const viewport =
        type === "boy" ? boyViewportRef.current : girlViewportRef.current;

      if (!reel || !viewport || !list.length) {
        resolve();
        return;
      }

      viewport.classList.add("mm-active-reel");

      const targetIndex = Math.floor(Math.random() * list.length);
      const finalPosition =
        ((REEL_REPEATS - 1) * list.length + targetIndex) * ITEM_HEIGHT;

      reel.style.transition = "none";
      reel.style.transform = "translateY(0)";
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      reel.offsetHeight;

      reel.style.transition = "transform 2.5s cubic-bezier(0.15, 0, 0.15, 1)";
      reel.style.transform = `translateY(-${finalPosition}px)`;

      setTimeout(() => {
        viewport.classList.remove("mm-active-reel");
        resolve();
      }, 2500);
    });
  }

  function addName(type) {
    const value = type === "boy" ? boyInput.trim() : girlInput.trim();
    if (!value) return;

    if (type === "boy") {
      setBoys((prev) => [...prev, value]);
      setBoyInput("");
    } else {
      setGirls((prev) => [...prev, value]);
      setGirlInput("");
    }
  }

  function removeName(index, type) {
    if (type === "boy") {
      setBoys((prev) => prev.filter((_, i) => i !== index));
    } else {
      setGirls((prev) => prev.filter((_, i) => i !== index));
    }
  }

  function createConfetti() {
    for (let index = 0; index < 40; index += 1) {
      const piece = document.createElement("div");
      piece.className = "mm-confetti";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor = Math.random() > 0.5 ? "#00d2ff" : "#ff007a";
      document.body.appendChild(piece);

      const horizontal = Math.random() * 100 - 50;

      piece.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(100vh) translateX(${horizontal}px) rotate(720deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1500 + Math.random() * 1500,
          easing: "ease-out",
        },
      ).onfinish = () => {
        piece.remove();
      };
    }
  }

  const buttonLabel =
    buttonState === "idle"
      ? "Initiate sequence"
      : buttonState === "calculating"
      ? "Calculating..."
      : "Match found";

  const buttonIcon =
    buttonState === "idle" ? "▶" : buttonState === "calculating" ? "⌛" : "✓";

  return (
    <div className="page matchmaker">
      <header className="page-header">
        <div>
          <p className="eyebrow">Bonus Game</p>
          <h1>Matchmaker Pro – Reel Edition</h1>
          <p className="subtitle">
            Spin the reels to randomly pair a boy and a girl. Perfect for fun
            team ups and challenges.
          </p>
        </div>
      </header>

      <section className="card mm-main">
        <div className="mm-header">
          <p className="mm-title">Matchmaking system</p>
          <div className="mm-status-row">
            <span className="mm-status mm-status-blue">SERVER: ONLINE</span>
            <span className="mm-status mm-status-pink">ALGORITHM: V2.0</span>
          </div>
        </div>

        <div className="mm-reels">
          <div className="mm-reel-block">
            <p className="mm-reel-label mm-reel-label-blue">
              Subject Alpha (M)
            </p>
            <div ref={boyViewportRef} className="mm-reel-viewport">
              <div ref={boyReelRef} className="mm-reel-strip">
                {boyDisplay.map((name, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${name}-${index}`}
                    className="mm-reel-item mm-reel-item-blue"
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div className="mm-highlight-bar" />
              <div className="mm-scanline" />
            </div>
          </div>

          <div className="mm-reel-block">
            <p className="mm-reel-label mm-reel-label-pink">Subject Beta (F)</p>
            <div ref={girlViewportRef} className="mm-reel-viewport">
              <div ref={girlReelRef} className="mm-reel-strip">
                {girlDisplay.map((name, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${name}-${index}`}
                    className="mm-reel-item mm-reel-item-pink"
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div className="mm-highlight-bar" />
              <div className="mm-scanline" />
            </div>
          </div>
        </div>

        <div className="mm-controls">
          <button
            type="button"
            disabled={isSpinning}
            onClick={startMatching}
            className="mm-main-button"
          >
            <span className="mm-main-button-icon">{buttonIcon}</span>
            <span>{buttonLabel}</span>
          </button>

          <div className="mm-manage">
            <div className="mm-manage-column">
              <div className="mm-input-row">
                <input
                  type="text"
                  value={boyInput}
                  onChange={(event) => setBoyInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addName("boy");
                  }}
                  placeholder="New Alpha name..."
                  className="mm-input"
                />
                <button
                  type="button"
                  className="mm-input-add mm-input-add-blue"
                  onClick={() => addName("boy")}
                >
                  +
                </button>
              </div>
              <div className="mm-tags">
                {boys.map((name, index) => (
                  <button
                    type="button"
                    key={name + index}
                    className="mm-tag mm-tag-blue"
                    onClick={() => removeName(index, "boy")}
                  >
                    {name} ×
                  </button>
                ))}
              </div>
            </div>

            <div className="mm-manage-column">
              <div className="mm-input-row">
                <input
                  type="text"
                  value={girlInput}
                  onChange={(event) => setGirlInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addName("girl");
                  }}
                  placeholder="New Beta name..."
                  className="mm-input"
                />
                <button
                  type="button"
                  className="mm-input-add mm-input-add-pink"
                  onClick={() => addName("girl")}
                >
                  +
                </button>
              </div>
              <div className="mm-tags">
                {girls.map((name, index) => (
                  <button
                    type="button"
                    key={name + index}
                    className="mm-tag mm-tag-pink"
                    onClick={() => removeName(index, "girl")}
                  >
                    {name} ×
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`mm-toast ${showNotif ? "mm-toast-visible" : ""}`}>
          MATCH SECURED
        </div>
      </section>
    </div>
  );
}

export default Matchmaker;
