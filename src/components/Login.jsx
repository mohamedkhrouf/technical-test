import Box from "@mui/material/Box";
import AutenthicationButton from "./AuthenticationButton";

export default function Login() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} mt={16}>
      <AutenthicationButton></AutenthicationButton>
    </Box>
  );
}
