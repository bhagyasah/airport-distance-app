import DistanceCalculator from "./components/distance-calculator";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {},
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <DistanceCalculator />
    </div>
  );
}
export default App;
