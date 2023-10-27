import React from "react";
import FlexBetween from "../../components/FlexBetween";
// import { PointOfSale } from "@mui/icons-material";
import { Box, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

const Overview = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Transactions Overview"
          subtitle="All active escrow transactions "
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Ongoing"
          increase="3,455"
        />
        <StatBox title="Total Pending Approval" increase="1,967" />
        <StatBox title="Total completed" increase="356,987,979" />
      </Box>
    </Box>
  );
};

export default Overview;
