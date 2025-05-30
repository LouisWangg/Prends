import React, { useState, useEffect } from "react";
import { cards } from "../data/Cards"; // Importing the card data
import { Button, Typography, Box } from "@mui/material";
import SingleCard from "../components/SingleCard.js";
import { fetchArticles } from "../services/ArticleService.js";
import "./Article.css";

const ITEMS_PER_PAGE = 6;

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices for the cards to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Sort the cards in descending order by their index (or a relevant property)
  const sortedCards = [...cards].reverse();

  // Slice the cards array to get only the cards for the current page
  const currentCards = sortedCards.slice(startIndex, endIndex);

  // Handle page changes
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedCards.length / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getArticles = async () => {
    const datas = await fetchArticles();
    setArticles(datas);
  };

  useEffect(() => {
    getArticles();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Box sx={{ padding: 2, margin: "0px 40px 0 40px" }}>
      <h1 className="pageTitle">#Prendsight!</h1>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
        }}
      >
        {articles.map((article) => (
          <SingleCard type={"Article"} data={article} />
        ))}
      </Box>

      {/* Pagination Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography sx={{ marginX: 2 }}>
          Page {currentPage} of {Math.ceil(sortedCards.length / ITEMS_PER_PAGE)}
        </Typography>
        <Button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(sortedCards.length / ITEMS_PER_PAGE)
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Article;
