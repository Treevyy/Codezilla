// MapScreen with clickable monster nodes
//IMPORT LIBRARIES
import React from 'react';
import { useNavigate } from 'react-router-dom';

// ARRAY OF MINIONS: ID,POSITION ON SCREEN??, IMG SRC, QUESTION ID? (TALK 2 BACKEND TEAM, ON HOW TO USE W/ AI)
const minions = [
  { id: 1, name: 'Nullbyte', x: '10%', y: '20%', image: '/clients/minions/nullbyte3.png', questionId: 0 },
  { id: 2, name: 'Typerrorasaurus', x: '30%', y: '50%', image: '/clients/minions/typerrorasaurus.png', questionId: 1 },
  { id: 3, name: 'Dbug', x: '30%', y: '50%', image: '/clients/minions/Dbug2a.png', questionId: 1 },
  { id: 4, name: 'Pie-thon', x: '30%', y: '50%', image: '/clients/minions/pie-thon.png', questionId: 1 },
  { id: 5, name: 'Codezilla', x: '30%', y: '50%', image: '/clients/minions/codezilla2.png', questionId: 1 },

];
// CREATE FUNCTIONAL COMPONENT MAPSCREEN, USENAVIGATE()
// CREATE FUNCTION CALLED GOTOQUESTIONS
// INSIDE GOTOQUESTIONS: IDENTIFY EACH QUESTION WITH A MINION
// ADD BACKGROUND IMG SRC "/clients/backgrounds/codezilla_bkgd.png"
// CREATE A CONTAINER QUIZ-CONTAINER
// INSIDE CONTAINER A MAP THAT HAS CLICKABLE MINIONS ON NODES CONNECTED WITH LINES
// POPUP QUESTION SCREEN FOR EACH QUESTION
// WHEN CLICKED IT TAKES TO GOTOQUESTION ASSCOIATED WITH EACH MINION
// THEN EITHR AUTO MATICALLY GOES TO THE NEXT MINION QUESTIONS OR TAKES BACK TO MAP HANDLERESTART?
// EXPORT TO MAPSCREEN

const MapScreen: React.FC = () => {
  const navigate = useNavigate();

  const goToQuestion = (id: number) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="quiz-container">
      {minions.map((minion) => (
        <div
          key={minion.id}
          style={{ position: 'absolute', top: minion.y, left: minion.x, cursor: 'pointer' }}
          onClick={() => goToQuestion(minion.questionId)}
        >
          <img src={minion.image} alt={minion.name} style={{ width: '80px', height: '80px' }} />
        </div>
      ))}
    </div>
  );
};

export default MapScreen;
