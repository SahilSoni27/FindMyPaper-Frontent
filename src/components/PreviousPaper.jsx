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

  useEffect(() => {
    console.log(college, branch, semester, year, examType);
    if (college && branch && semester && year && examType) {
      api
        .get("/papers-search", {
          params: { college, branch, semester, year, examType },
        })
        .then((response) => {
          setPapers(response.data);
          console.log(response.data);
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
      <Grid2 container spacing={2} sx={{ display: "flex", gap: 2 }}>
        {papers.map((paper) => (
          <Grid2
            item
            size={{
              lg: 3,
            }}
            key={paper.id}
          >
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Link
                  variant="body2"
                  color="text.secondary"
                  sx={{ cursor: "pointer" }}
                  // variant="subtitle1"
                  onClick={() => window.open(paper.drive_link)}
                >
                  {paper.subject_name}
                </Link>
                {/* <Link
                // variant="body2"
                // color="text.secondary"
                // sx={{ cursor: "pointer" }}
                // onClick={() => window.open(paper.drive_link)}
                >
                  {paper.drive_link}
                </Link> */}
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Footer />
    </>
  );
}
