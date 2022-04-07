import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { ComponentStory } from "@storybook/react";
import { ProfileLoader } from "./ProfileLoader";
import { Profile } from "../../types";
import { CeramicContext } from "../../contexts/";

export default {
  title: "Profiles",
  component: ProfileLoader,
};


const Template: ComponentStory<typeof ProfileLoader>  = () => {
  const [did, setDid] = React.useState<string|undefined>('');
  const [loading, setLoading] = React.useState(true);
  const { ensureConnected, userDid, getUserData} = React.useContext(CeramicContext);
  ensureConnected();


  React.useEffect(() =>{
    setDid(userDid?.toString());
    setLoading(false);
  }, [userDid, getUserData])


  if (loading) {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div>
        ceramic DID: <input type="text" value={did} onChange={(e) => setDid(e.target.value)} />
        <br />
      </div>
      {did && <ProfileLoader did={did} />}
    </>
  );
};

export const profileLoader = Template.bind({});
profileLoader.storyName = "ProfileLoader";
