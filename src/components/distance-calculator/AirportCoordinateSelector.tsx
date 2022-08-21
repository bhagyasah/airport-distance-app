import { memo } from "react";
import { TextField, Autocomplete, Box } from "@mui/material";
import { FlightTakeoff, FlightLand } from "@mui/icons-material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { airports } from "../../data";
import { CoordinateSelectorType } from "./MainController";

const useStyles = makeStyles((theme: Theme) => ({
  selectorWrapper: {
    display: "flex",
    alignItems: "center",
    margin: 10,
  },
  autoComplete: {
    marginRight: 10,
    width: "30vw",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
}));

type AirportCoordinateSelectorType = {
  type: string;
  updateCoordinate: (param: CoordinateSelectorType) => void;
};

function AirportCoordinateSelector(params: AirportCoordinateSelectorType) {
  const classes = useStyles();
  const { type, updateCoordinate } = params;

  const updateAirportSelector = (name: string | null) => {
    const airportDetails = airports.find(
      (airport) => `${airport.AIRPORT} (${airport.IATA})` === name
    );
    if (airportDetails) {
      updateCoordinate({
        key: type,
        coordinate: {
          lat: airportDetails?.LATITUDE,
          lng: airportDetails?.LONGITUDE,
          name: airportDetails?.AIRPORT,
        },
      });
    }
  };
  return (
    <Box className={classes.selectorWrapper}>
      {type === "from" ? <FlightTakeoff /> : <FlightLand />}
      <Autocomplete
        id="from"
        freeSolo
        className={classes.autoComplete}
        options={airports.map((option) => `${option.AIRPORT} (${option.IATA})`)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              type === "from"
                ? " Select Starting Aiport"
                : "Select Destination Airport"
            }
          />
        )}
        onChange={(op, val) => updateAirportSelector(val)}
      />
    </Box>
  );
}
export default memo(AirportCoordinateSelector);
