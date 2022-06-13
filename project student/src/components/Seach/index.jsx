import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getStudentByName } from "../../store/user";
import { useState } from "react";

export const Seach = () => {
  let navigate = useNavigate();
  const { setStudent } = useAuth();
  const [name, setName] = useState("");

  const handleChange = async (name) => {
    try {
      const res = await getStudentByName(name)

      if (res?.statusText === "OK") {
        setStudent(res.data);
      }
      
    } catch (error) {
      throw error;
    }
  }


  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item md={10} xs={12}>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="find by name"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 3,
                    right: 0,
                    top: 0,
                    height: "100%",
                  }}
                  onClick={() => {
                    handleChange(name);
                  }}
                >
                  Search
                </Button>
              </Grid>
              <Grid item md={2} xs={12} alignItems={"end"}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={() => navigate("/student")}
                  >
                    New Student
                  </Button>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
