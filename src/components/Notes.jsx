import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Footer from "./Footer";
import api from "../utils/api";
import { Card, CardContent, Link, Typography } from "@mui/material";


export default function Notes() {
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get("/notescolleges").then((response) => {
      setColleges(response.data);
    });
  }, []);

  useEffect(() => {
    if (college) {
      api.get("/notesbranches", { params: { college } }).then((response) => {
        setBranches(response.data);
      });
    } else {
      setBranches([]);
      setBranch("");
    }
  }, [college]);

  useEffect(() => {
    if (college && branch) {
      api
        .get("/notessemesters", { params: { college, branch } })
        .then((response) => {
          setSemesters(response.data);
        });
    } else {
      setSemesters([]);
      setSemester("");
    }
  }, [branch]);

  useEffect(() => {
    console.log(college, branch, semester);
    if (college && branch && semester) {
      api
        .get("/notes-search", {
          params: { college, branch, semester },
        })
        .then((response) => {
          setNotes(response.data);
          console.log(response.data);
        });
    }
  }, [college, branch, semester]);

  return (
    <>
      <Box sx={{ flexGrow: 1, my: 3, px: 2 }}>
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl sx={{ minWidth: 200, width: "100%" }}>
              <InputLabel>College</InputLabel>
              <Select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              >
                {colleges.map((col) => (
                  <MenuItem key={col} value={col}>
                    {col}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl
              sx={{ minWidth: 200, width: "100%" }}
              disabled={!college}
            >
              <InputLabel>Branch</InputLabel>
              <Select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                {branches.map((br) => (
                  <MenuItem key={br} value={br}>
                    {br}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl
              sx={{ minWidth: 200, width: "100%" }}
              disabled={!branch}
            >
              <InputLabel>Semester</InputLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                {semesters.map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    Semester {sem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 3 }}>
        <Grid2 container spacing={3} justifyContent="center">
          {notes.map((note) => (
            <Grid2
              item
              key={note.id}
              sx={{ width: 250 }} // 👈 Fixed width
            >
              <Card
                onClick={() => window.open(note.drive_link)}
                sx={{
                  height: 150, // 👈 Fixed height
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  sx={{
                    fontWeight: 600,
                    wordWrap: "break-word",
                    whiteSpace: "normal", // 👈 Allow multi-line
                    overflow: "hidden",
                  }}
                >
                  {note.subject_name}
                </Typography>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Footer />
    </>
  );
}
