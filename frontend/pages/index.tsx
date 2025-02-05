import * as React from "react";
import { Container, Typography, Grid2 as Grid } from "@mui/material";
import CardImage from "../components/CardImage";
import { useAxios } from "../api";

interface Design {
  _id: string;
  name: string;
  caption: string;
  // Add other fields as needed
}

const HomePage: React.FC = () => {
  const [{ data: designs }] = useAxios<Design[]>("/designs");

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Leaving Card Designs
      </Typography>
      <Grid container spacing={2}>
        {designs?.map((design) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
            key={design._id}
          >
            <CardImage id={design._id} alt={design.name} small />
            <Typography variant="body2" color="text.secondary">
              {design.caption}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
