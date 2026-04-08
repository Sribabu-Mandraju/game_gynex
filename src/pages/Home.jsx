import { Link } from "react-router-dom";

function Home() {
  const games = [
    {
      id: "group-poses",
      number: "01",
      title: "Group Poses",
      description:
        "Strike creative poses together based on prompts. Great icebreaker for any group.",
    },
    {
      id: "letter-gambling",
      number: "02",
      title: "Letter Gambling",
      description:
        "Bet on letters and form words under pressure. A fast-paced word challenge.",
    },
    {
      id: "sticker-recreation",
      number: "03",
      title: "Sticker Recreation",
      description:
        "Recreate a hidden sticker or drawing using only descriptions from your team.",
    },
    {
      id: "saamethalu",
      number: "04",
      title: "Saamethalu",
      description:
        "Guess the proverb from clues and finish the line correctly. Perfect for language lovers.",
    },
    {
      id: "no-audio",
      number: "05",
      title: "No Audio",
      description:
        "Watch mystery clips with no sound, then reveal the audio to see who guessed right.",
    },
    {
      id: "hook-step",
      number: "06",
      title: "Hook Step",
      description:
        "Generate 6 random numbers over 60 with no repeats for assigning hook steps.",
    },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Party Games Hub</p>
          <h1>Game Night – Dark Edition</h1>
          <p className="subtitle">
            Choose a game card to get started. Fun, fast and perfect for groups.
          </p>
        </div>
      </header>

      <main className="games-grid">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="game-card game-card-link"
          >
            <div className="pill">{game.number}</div>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
          </Link>
        ))}
      </main>

      <footer className="app-footer">
        <span>Ready when you are. Pick any card to continue.</span>
      </footer>
    </div>
  );
}

export default Home;
