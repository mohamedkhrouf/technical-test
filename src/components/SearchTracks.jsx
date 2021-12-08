import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef, useCallback } from "react";
import useSearch from "../hooks/useSearch";
import { CardContent } from "@mui/material";

export default function SearchTracks() {
  const [search, setSearch] = useState("");
  const [numberElements, setNumberElements] = useState(0);
  const [input, setInput] = useState("");
  const { loading, error, tracks } = useSearch(
    search,
    localStorage.getItem("token").toString(),
    50,
    numberElements
  );

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setNumberElements((prev) => {
            return prev + 50;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );
  return (
    <Grid container mt={0} mb={4} flexDirection="column">
      <Grid item container mb={2} mt={2}>
        <TextField
          mt={2}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          onClick={() => {
            setSearch(input.replace(" ", "%20"));
            setNumberElements(0);
          }}
        >
          Search
        </Button>
      </Grid>
      <Grid item container spacing={4}>
        {tracks.map((track) => (
          <Grid ref={lastElementRef} item key={track.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "200px",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  width: 200,
                }}
                image={track.album.images[0].url}
                alt={track.album.name}
              ></CardMedia>
              <CardContent sx={{ fontSize: 10, height: 100 }}>
                <div style={{ fontWeight: "bold" }}>
                  <span
                    style={{ color: "#1976d2", paddingRight: 10, fontSize: 9 }}
                  >
                    Track:
                  </span>
                  {track.name}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  <span
                    style={{ color: "#1976d2", paddingRight: 4.5, fontSize: 9 }}
                  >
                    Album:{" "}
                  </span>
                  {track.album.name}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  <span
                    style={{ color: "#1976d2", paddingRight: 10, fontSize: 9 }}
                  >
                    Artist:
                  </span>
                  {track.artists[0].name}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
    </Grid>
  );
}
