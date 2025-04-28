import "../../styles/codezilla.css";

export default function VictoryPage({
  backgroundUrl   = 'client/background/codezilla_bkgd.png',
  avatarUrl       = 'client/avatars/avatar4.png',
  confettiUrl     = 'client/background/confetti_image.jpg',
}) {
  return (
    <div
      className="victory-page"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >

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

