import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Grid2,
  Container,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import Footer from "./Footer";


const Alumini = () => {
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/alumni-list")
      .then((res) => setAlumni(res.data))
      .catch((err) => console.error(err));
  }, []);

  const parseExperience = (experienceJson) => {
    try {
      const parsed = JSON.parse(experienceJson);
      return parsed.slice(0, 2);
    } catch (err) {
      return [];
    }
  };

  const parseEducation = (edu) => {
    try {
      const parsed = JSON.parse(edu);
      if (!Array.isArray(parsed) || parsed.length === 0) return null;

      parsed.sort((a, b) => {
        const aYear = a.timePeriod?.startDate?.year || 0;
        const bYear = b.timePeriod?.startDate?.year || 0;
        return bYear - aYear;
      });

      return parsed[0];
    } catch {
      return null;
    }
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return "";
    const month = dateObj.month?.toString().padStart(2, "0");
    const year = dateObj.year;
    return `${month}/${year}`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // const cuss = WORDS.some((name) => {
  //   return searchTerm.includes(atob(name));
  // });

  const filteredAlumni = alumni.filter((alum) => {
    const experiences = parseExperience(alum.experience);
    const education = parseEducation(alum.education);

    const valuesToSearch = [
      alum.first_name,
      alum.last_name,
      alum.skills,
      alum.headline,
      education?.schoolName,
      education?.timePeriod?.startDate?.year?.toString(),
      education?.timePeriod?.endDate?.year?.toString(),
      ...experiences.map((exp) => exp.companyName),
      ...experiences.map((exp) => exp.title),
    ];

    return valuesToSearch
      .filter(Boolean)
      .some(
        (val) =>
          val.toLowerCase().includes(searchTerm) ||
          (cuss && alum.first_name.toLowerCase() === atob(MATCH_WORD))
      );
  });

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ mt: 4, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" gutterBottom>
          Alumni Network
        </Typography>
        <Box
          mb={3}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            label="Search alumni by name, college, skills, year, or company"
            variant="outlined"
            fullWidth
            sx={{ mb: 4 }}
            onChange={handleSearchChange}
          />
        </Box>

        <Grid2
          container
          spacing={3}
          sx={{
            width: "100%",
            mb: 7,
          }}
        >
          {filteredAlumni.map((alum, index) => {
            const experiences = parseExperience(alum.experience);
            const education = parseEducation(alum.education);

            return (
              <Grid2
                item
                size={{
                  lg: 4,
                  xs: 12,
                  md: 6,
                }}
                key={index}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: 380, // Optional for equal height
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar
                        src={alum.profile_picture_url}
                        alt={alum.first_name}
                        sx={{ width: 70, height: 70 }}
                      />
                      <Box>
                        <Typography variant="h6">
                          {alum.first_name} {alum.last_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {alum.headline}
                        </Typography>
                        {alum.user?.linkedin_url && (
                          <Typography variant="body2">
                            <a
                              href={alum.user.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              LinkedIn
                            </a>
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body2" gutterBottom>
                      <strong>Skills:</strong> {alum.skills}
                    </Typography>

                    {education && (
                      <>
                        <Typography variant="body2" gutterBottom>
                          <strong>College:</strong>{" "}
                          {education.schoolName || "N/A"}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Start Year:</strong>{" "}
                          {education.timePeriod?.startDate?.year || "N/A"}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>End Year:</strong>{" "}
                          {education.timePeriod?.endDate?.year || "Present"}
                        </Typography>
                      </>
                    )}

                    {experiences.length > 0 && (
                      <Box mt={2}>
                        <Typography variant="subtitle2" gutterBottom>
                          Past Experiences:
                        </Typography>
                        {experiences.map((exp, i) => (
                          <Box key={i} mb={1}>
                            <Typography variant="body2">
                              <strong>{exp.title}</strong> at{" "}
                              {exp.companyName || "N/A"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {formatDate(exp.timePeriod?.startDate)} -{" "}
                              {formatDate(exp.timePeriod?.endDate)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
      <Footer />
    </>
  );
};

export default Alumini;
