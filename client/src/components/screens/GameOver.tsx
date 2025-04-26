import './codezilla.css';

const GameOverPage = ({
  backgroundUrl = '/assets/background.jpg',
  logoUrl       = '/assets/codezilla-logo.png',
  avatarUrl     = '/assets/player-avatar.png',
  codezillaUrl  = '/assets/codezilla.png',
}) => {
  return (
    <div
      className="game-over-page"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <img
        className="game-over-logo"
        src={logoUrl}
        alt="Codezilla Logo"
      />

      <div className="game-over-container">
        <h1 className="game-over-title">Game Over!</h1>

        <div className="game-over-images">
          <img
            className="player-avatar"
            src={avatarUrl}
            alt="Player Avatar"
          />
          <img
            className="codezilla-avatar"
            src={codezillaUrl}
            alt="Codezilla"
          />
        </div>

        <h2 className="game-over-subtitle">
          You were defeated by Codezilla!
        </h2>

        <p className="game-over-cta">
          Try again to become a code master
        </p>
      </div>
    </div>
  );
};

export default GameOverPage;
