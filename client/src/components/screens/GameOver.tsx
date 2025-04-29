import { useNavigate } from 'react-router-dom';
import "../../styles/codezilla.css";

const GameOverPage = ({
  backgroundUrl = 'client/background/codezilla_bkgd.png',
  avatarUrl     = 'client/avatars/avatar4.png',
  codezillaUrl  = 'client/minions/codezilla2.png',
}) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    // navigate to your game-start route
    navigate('/game');
  };

  const handleMainMenu = () => {
    // navigate back to your main menu/home route
    navigate('/');
  };

  return (
    <div
      className="game-over-page"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
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

        <div className="game-over-actions">
          <button
            className="btn play-again-btn"
            onClick={handlePlayAgain}
          >
            Play Again!
          </button>

          <button
            className="btn main-menu-btn"
            onClick={handleMainMenu}
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverPage;