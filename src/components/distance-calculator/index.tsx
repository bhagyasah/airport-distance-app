import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";
import MainController from "./MainController";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  calculator: {
    width: "90%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 5,
    },
  },
  calculatorHeader: {
    background: theme.palette.primary.main,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

function DistanceCalculator() {
  const classes = useStyles();
  return (
    <Box className={classes.calculator}>
      <Box className={classes.calculatorHeader}>
        <h1>Airport Distance Calculator</h1>
      </Box>
      <MainController />
    </Box>
  );
}
export default DistanceCalculator;
