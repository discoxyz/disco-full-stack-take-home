import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

import { ProfileView } from "./ProfileView";
import { ApiService } from "../../utils/ApiService";
import {Profile} from "../../types";

const DEFAULT_LOAD_STATUS = 0;
const LOADING_LOAD_STATUS = 1;
const ERROR_LOAD_STATUS = 2;

export const ProfilesList: React.FC = () => {
  const [loadStatus, setLoadStatus] = React.useState(DEFAULT_LOAD_STATUS);
  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [dids, setDids] = React.useState<string[]>([]);

  const api = React.useMemo(() => new ApiService(), []);

  React.useEffect(() => {
    setLoadStatus(LOADING_LOAD_STATUS)
    api.getAllDids().then((getAllDidsResult) => {
      setDids(getAllDidsResult)
      api.getAllProfiles().then((getAllProfilesResult) => {
        setProfiles(getAllProfilesResult)
        setLoadStatus(DEFAULT_LOAD_STATUS)
      })
    }).catch((e) => {
      console.error("ProfilesList useEffect error caught!", e);
      setLoadStatus(ERROR_LOAD_STATUS)
    })
  }, []);

  if (loadStatus === LOADING_LOAD_STATUS) {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {profiles.length === 0 && <p>No profiles found!</p>}
      {profiles.length > 0 &&
        <ul>
          {profiles.map((profile, index) =>
              <li key={dids[index]}>
                <ProfileView profile={profile} did={dids[index]} />
              </li>
          )}
        </ul>
      }
      {loadStatus === ERROR_LOAD_STATUS && <p style={{color: "red" }} >There was an error loading the saved profiles! Please refresh the page later.</p>}
    </Box>
  );
};
