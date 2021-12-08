import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/ToolBar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SearchTracks from "./components/SearchTracks";
import useAuth from "./hooks/useAuth";

export function App() {
  useAuth();

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <ToolBar>
          <Typography variant="h4" component="h1">
            Tracks
          </Typography>
        </ToolBar>
      </AppBar>
      <Container
        sx={{
          overflow: "auto",
          maxHeight: "calc(100% - 64px)",
        }}
      >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<SearchTracks />} />
        </Routes>
      </Container>
    </>
  );
}
