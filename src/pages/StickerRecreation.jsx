function StickerRecreation() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Game 03</p>
          <h1>Sticker Recreation</h1>
          <p className="subtitle">
            One person sees the original sticker or drawing. Everyone else has
            to recreate it only from their description.
          </p>
        </div>
      </header>

      <section className="card card-large">
        <h2>How to play</h2>
        <ol className="steps">
          <li>
            Pick a sticker or simple drawing and show it to one “describer”.
          </li>
          <li>
            Other players get paper or a whiteboard but can&apos;t see the
            original.
          </li>
          <li>
            The describer explains shapes, positions and colors (no naming!).
          </li>
          <li>Reveal all drawings and compare them to the original for fun.</li>
        </ol>
      </section>
    </div>
  );
}

export default StickerRecreation;
