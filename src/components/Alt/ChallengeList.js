import React from 'react';
import ChallengeListItem from './ChallengeListItem';

const ChallengeList = ({ challenges, deleteChallangeFunction, updateChallangeFunction }) => {
  return (
    <div>
      <h2>Your Challenges</h2>
      {challenges.length > 0 ? (
        challenges.map((challenge, index) => (
          <ChallengeListItem
            key={challenge.id ? challenge.id : index}
            challenge={challenge}
            deleteChallangeFunction={deleteChallangeFunction}
            updateChallangeFunction={updateChallangeFunction}
          />
        ))
      ) : (
        <p>No todos available!</p>
      )}
    </div>
  );
};

export default ChallengeList;
