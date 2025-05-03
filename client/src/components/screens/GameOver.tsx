import { useNavigate } from 'react-router-dom';
import "../../styles/codezilla.css";


const GameOverPage = ({
  avatarUrl     = '/avatars/michael.png',
  codezillaUrl  = '/minions/codezilla2.png',
}) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    // back to the question map
    navigate('/map');
  };

  const handleMainMenu = () => {
    // back to your overall main menu/home
    navigate('/');
  };

  return (
    <div
      className="game-over-page"
      // style={{ backgroundImage: `url(${backgroundUrl})` }}
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
