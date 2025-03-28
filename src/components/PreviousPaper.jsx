import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Footer from "./Footer";
import api from "../utils/api";
import { Card } from "@mui/material";
import UpdateButton from "./UpdateButton";

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
  }, [branch]);

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
  }, [semester]);

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
  }, [year]);

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
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>
        </Grid>

        {/* <Card>
          {papers.map((paper)=>())}
          
          </Card> */}
      </Box>
      <UpdateButton/>
      
      <Footer />
    </>
  );
}
