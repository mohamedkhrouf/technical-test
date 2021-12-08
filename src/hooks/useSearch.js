import { useEffect, useState } from "react";

export default function useSearch(search, token, limit, offset) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(async () => {
    setError(false);
    if (token) {
      if (search != "") {
        setLoading(true);
        const response = await fetch(
          "https://api.spotify.com/v1/search?q=" +
            search +
            "&type=track&limit=" +
            limit +
            "&offset=" +
            offset,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        let res = await response.json();

        if (res.tracks) {
          setLoading(false);

          setTracks((prev) => {
            return [...new Set([...prev, ...res.tracks.items])];
          });
        }
      }
    }
  }, [token, limit, offset]);
  useEffect(async () => {
    setError(false);
    if (token) {
      if (search != "") {
        setTracks([]);
        setLoading(true);
        const response = await fetch(
          "https://api.spotify.com/v1/search?q=" +
            search +
            "&type=track&limit=" +
            limit +
            "&offset=" +
            offset,
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        let res = await response.json();

        if (res.tracks) {
          setLoading(false);

          setTracks([...res.tracks.items]);
        }
      }
    }
  }, [search, token, limit]);
  return { loading, error, tracks };
}
