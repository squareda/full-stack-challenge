import * as React from "react";
import { useEffect, useState } from "react";
import { Container, Typography, Theme, styled, Grid } from "@mui/material";
import { useRouter } from "next/router";
import CardImage from "../components/CardImage";

interface Design {
  _id: string;
  name: string;
  caption: string;
  // Add other fields as needed
}

const cardStyle = ({ theme }: { theme: Theme }) =>
  ({
    maxWidth: "100%",
    borderStyle: "solid",
    borderColor: theme.palette.grey[100],
    boxSizing: "border-box",
    aspectRatio: "4/5",
    display: "block",
    marginBottom: 4,
    width: "100%",
    "&:hover": {
      borderColor: theme.palette.grey[200],
      cursor: "pointer",
    },
  } as const);

const StyledCardImage = styled(CardImage)(cardStyle);

const HomePage: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5001/designs")
      .then((response) => response.json())
      .then((data) => setDesigns(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Trending Leaving Cards
      </Typography>
      <Grid container spacing={2}>
        {designs.map((design) => (
          <Grid item xs={12} sm={6} md={3} key={design._id}>
            <StyledCardImage id={design._id} alt={design.name} small />
            <Typography variant="h6">{design.name}</Typography>
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
