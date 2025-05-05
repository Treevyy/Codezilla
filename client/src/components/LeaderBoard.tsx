import "../styles/leaderboard.css";
import "../styles/codezilla.css"
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries";
import { useNavigate } from "react-router-dom";

function LeaderBoard() {
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USERS);

  const allUsers = data?.getAllUsers || [];

  if (loading) return <p>Loading...</p>;

  console.log(allUsers);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <h2 className="leaderboard-subtitle">Leaderboard</h2>
        <div className="leaderboard-actions">
          {allUsers.map((user: any, index: number) => {
            if (index < 5) {
              return (
                <div className="player-info">
                  <img src={user.selectedAvatar} />
                  <p>{user.username}</p>
                  <img src="/src/assets/dans_gold_star.png" />
                  <p>{user.correctAnswers}</p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>

        <br />
      <button
        className="btn main-menu-btn"
        onClick={() => {
          navigate("/map");
        }}
      >
        Main Menu
      </button>
      </div>

    </div>
  );
}

export default LeaderBoard;
