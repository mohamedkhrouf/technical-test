import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import config from "../config";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(async () => {
    if (location.pathname === "/callback") {
      const code = location.search.match(/code=(.*)/)[1];

      const body = new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:1234/callback",
      });

      const response = await fetch("https://accounts.spotify.com/api/token", {
        body,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${config.client_id}:${config.client_secret}`
          )}`,
        },
      });

      const data = await response.json();

      if (data.access_token) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setExpiresIn(data.expires_in);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh", data.refresh_token);
      }

      navigate("/");

      return;
    }

    if (!localStorage.getItem("token") && location.pathname !== "/login") {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        mode: "cors",
        body: `grant_type=refresh_token&refresh_token=${localStorage.getItem(
          "refresh"
        )}&valid_for=${1}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${config.client_id}:${config.client_secret}`
          )}`,
        },
        method: "POST",
      });
      if (response) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);

        setAccessToken(data.access_token);
        setExpiresIn(data.expires_in);
      }
    }, (expiresIn - 100) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
}
