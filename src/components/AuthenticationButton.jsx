import Button from "@mui/material/Button";
import config from "../config";

export default function AuthenticationButton() {
  const spotifyApi = "https://accounts.spotify.com";

  const authenticateUser = async () => {
    const authOptions = {
      client_id: config.client_id,
      response_type: "code",
      redirect_uri: "http://localhost:1234/callback",
    };

    (window.location.href = `${spotifyApi}/authorize?${new URLSearchParams(
      authOptions
    )}`),
      { mode: "no-cors", redirect: "follow" };
  };

  return (
    <Button variant="contained" onClick={authenticateUser}>
      Login with Spotify
    </Button>
  );
}
