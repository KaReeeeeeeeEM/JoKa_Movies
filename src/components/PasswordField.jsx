import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Lock from  "@mui/icons-material/Lock";
import { useState } from "react";

let PasswordField = ({ hint, id, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = {
    inputStyles: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "orange",
      },
      "& .MuiInputLabel-root": {
        color: "orange",
      },
      "& .transformed .MuiInputLabel-root": {
        color: "orange !important",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "orange !important",
      },
    },
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={hint}
      type={showPassword ? "text" : "password"}
      margin="normal"
      required
      fullWidth
      id={id}
      name={name}
      sx={styles.inputStyles}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              sx={{
                color: "orange",
              }}
            >
              <Lock />
              {"  "}
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {showPassword ? (
                <VisibilityOff />
              ) : (
                <Visibility sx={{ color: "orange" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
