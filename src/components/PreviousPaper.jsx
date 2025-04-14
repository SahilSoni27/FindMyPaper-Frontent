import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import * as React from "react";
import { useEffect, useState } from "react";

import { Card, CardContent, Link, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import api from "../utils/api";
import Footer from "./Footer";


export default function PreviousPaper() {
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("");

  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [years, setYears] = useState([]);
  const [examTypes, setExamTypes] = useState([]);

  const [papers, setPapers] = useState([]);

  useEffect(() => {
    api.get("/colleges").then((response) => {
      setColleges(response.data);
    });
  }, []);

  useEffect(() => {
    if (college) {
      api.get("/branches", { params: { college } }).then((response) => {
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
        .get("/semesters", { params: { college, branch } })
        .then((response) => {
          setSemesters(response.data);
        });
    } else {
      setSemesters([]);
      setSemester("");
    }
  }, [branch, college]);

  useEffect(() => {
    if (college && branch && semester) {
      api
        .get("/years", { params: { college, branch, semester } })
        .then((response) => {
          setYears(response.data);
        });
    } else {
      setYears([]);
      setYear("");
    }
  }, [branch, college, semester]);

  useEffect(() => {
    if (college && branch && semester && year) {
      api
        .get("/exams", { params: { college, branch, semester, year } })
        .then((response) => {
          setExamTypes(response.data);
        });
    } else {
      setExamTypes([]);
      setExamType("");
    }
  }, [branch, college, semester, year]);

  // useEffect(() => {
  //   console.log(college, branch, semester, year, examType);
  //   if (college && branch && semester && year && examType) {
  //     api
  //       .get("/papers-search", {
  //         params: { college, branch, semester, year, exam_type: examType },
  //       })
  //       .then((response) => {
  //         setPapers(response.data);
  //         console.log(response.data);
  //       });
  //   }
  // }, [college, branch, semester, year, examType]);
useEffect(() => {
  console.log(college, branch, semester, year, examType);
  if (college && branch && semester && year && examType) {
    api
      .get("/papers-search", {
        params: { college, branch, semester, year, exam_type: examType },
      })
      .then((response) => {
        const data = response.data;
        console.log("Paper response:", data);

        // Defensive check to ensure it's an array
        if (Array.isArray(data)) {
          setPapers(data);
        } else {
          setPapers([]); // or handle this gracefully
          console.warn("Expected an array but got:", typeof data, data);
        }
      })
      .catch((err) => {
        console.error("Error fetching papers:", err);
        setPapers([]); // fail gracefully
      });
  }
}, [college, branch, semester, year, examType]);

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

          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl
              sx={{ minWidth: 200, width: "100%" }}
              disabled={!semester}
            >
              <InputLabel>Year</InputLabel>
              <Select value={year} onChange={(e) => setYear(e.target.value)}>
                {years.map((yr) => (
                  <MenuItem key={yr} value={yr}>
                    {yr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl sx={{ minWidth: 200, width: "100%" }} disabled={!year}>
              <InputLabel>Exam Type</InputLabel>
              <Select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              >
                {examTypes.map((exam) => (
                  <MenuItem key={exam} value={exam}>
                    {exam}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 3 }}>
        <Grid2 container spacing={3} justifyContent="center">
          {papers.map((paper) => (
            <Grid2
              item
              key={paper.id}
              sx={{ width: 250 }} // 👈 Fixed width
            >
              <Card
                onClick={() => window.open(paper.drive_link)}
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
                  {paper.subject_name}
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
