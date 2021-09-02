import React, { useState, useEffect } from 'react';
import ChallengeOverview from './challengeOverview';
import ChallengeGallery from './challengeGallery';
import Box from '@material-ui/core/Box';
import Auth from '@aws-amplify/auth';
const ChallengeView = () => {

  const [error, setError] = useState(null);
  const [group, setGroup] = useState("");
  useEffect(() => {
    try {
      setError(null);
      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
        setGroup(user.signInUserSession.accessToken.payload["cognito:groups"]);
        console.log(`Load additional settings for user: ${user.signInUserSession.accessToken.payload["cognito:groups"]}`);
      }).catch(err => setError(err));
    }
    catch (e) {
      setError(e);
    }
  }, []);

  return (
    <div>
      {group == "admin" && <Box>
        <ChallengeOverview />
      </Box>}
      {group == "common" && <Box>
        <ChallengeGallery />
      </Box>}
    </div>
  );
}

export default ChallengeView;