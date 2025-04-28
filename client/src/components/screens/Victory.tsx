import "../../styles/codezilla.css";

export default function VictoryPage({
  backgroundUrl   = '/assets/background.jpg',
  logoUrl         = '/assets/codezilla-logo.png',
  avatarUrl       = '/assets/player-avatar.png',
  confettiUrl     = '/assets/confetti.png',
}) {
  return (
    <div
      className="victory-page"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <img
        className="victory-logo"
        src={logoUrl}
        alt="Codezilla Logo"
      />

      <div className="victory-container">
        {/* Confetti overlay */}
        <div
          className="victory-confetti"
          style={{ backgroundImage: `url(${confettiUrl})` }}
        />

        <h1 className="victory-title">Congratulations!</h1>

        <img
          className="victory-avatar"
          src={avatarUrl}
          alt="Player Avatar"
        />

        <h2 className="victory-subtitle">
          You defeated Codezilla!
        </h2>

        <p className="victory-cta">
          you are a coding master!
        </p>
      </div>
    </div>
  );
}

