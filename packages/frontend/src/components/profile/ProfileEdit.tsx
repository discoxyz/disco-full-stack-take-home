import * as React from "react";
import { Profile } from "../../types";
import { CeramicContext } from "../../contexts/";
import { Box, Button, FormControl, TextField, Typography, CircularProgress } from "@mui/material";
import { DidView } from "../DidView";

export interface ProfileEditProps {
  onSaveComplete?(userDid : string): Promise<boolean>;
}

const SAVE_DEFAULT_STATUS = 0;
const SAVE_LOADING_STATUS = 1;
const SAVE_SUCCESS_STATUS = 2;
const SAVE_ERROR_STATUS = 3;

export const ProfileEdit: React.FC<ProfileEditProps> = (props) => {
  const { ensureConnected, userDid, userData, updateUserData, isConnected, isLoadingUserData } =
    React.useContext(CeramicContext);
  ensureConnected();
  const [profile, setProfile] = React.useState<Profile>({});
  const [saveSuccessStatus, setSaveSuccess] = React.useState(SAVE_DEFAULT_STATUS);

  React.useEffect(() => {
    setProfile(userData.profile || {});
  }, [userData]);

  async function saveProfile() {
    try {
      setSaveSuccess(SAVE_LOADING_STATUS)
      await updateUserData({ profile });
      userDid && props.onSaveComplete && await props.onSaveComplete(userDid);
      setSaveSuccess(SAVE_SUCCESS_STATUS)
      console.log("[ProfileEdit] Successfully updated user data for DID", userDid);
    } catch (e) {
      console.error("saveProfile error caught!", e)
      setSaveSuccess(SAVE_ERROR_STATUS)
    }
  }

  if (isLoadingUserData) {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  const isLoading = saveSuccessStatus === SAVE_LOADING_STATUS

  return (
    <Box>
      {userDid &&
        <Box mb={3}>
          <Typography variant="h4">Edit Profile</Typography>
          <DidView did={userDid} typographyVariant="body2" copy dontTruncate />
        </Box>
      }
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography variant="h6">Add a profile image</Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Recommended size: 400x400px. 1MB max size. JPG, PNG, or GIF.
        </Typography>
        {profile.avatar && (
          <Box mb={1}>
            <img src={profile.avatar} alt="avatar" style={{ width: "100%", height: "auto", maxWidth: "200px" }} />
          </Box>
        )}
        <Typography variant="body2" sx={{ marginBottom: 1, marginTop: 1 }}>
          Profile image URL
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          disabled={isLoadingUserData}
          value={profile.avatar || ""}
          onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography variant="h6">Enter Display Name</Typography>
        <TextField
          variant="outlined"
          type="text"
          disabled={isLoadingUserData}
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography variant="h6">Write a short bio</Typography>
        <Typography variant="body2">Please limit to 200 characters.</Typography>
        <TextField
          disabled={isLoadingUserData}
          inputProps={{ maxLength: 200 }}
          minRows={3}
          multiline
          variant="outlined"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />
      </FormControl>

      <Box>
        <Button onClick={saveProfile} disabled={isLoading || !isConnected} variant="contained">
          {isLoading ? <CircularProgress size="20px" /> : "Save Profile"}
        </Button>
        {saveSuccessStatus === SAVE_ERROR_STATUS && <p style={{color: "red" }} >There was an error saving the profile! Please try again later.</p>}
        {saveSuccessStatus === SAVE_SUCCESS_STATUS && <p style={{color: "green" }} >Profile saved successfully!</p>}
      </Box>
    </Box>
  );
};
