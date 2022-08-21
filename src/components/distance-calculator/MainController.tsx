import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Paper, Button } from "@mui/material";
import { getDistance } from "geolib";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import GoogleMap from "../map/GoogleMap";
import AirportCoordinateSelector from "./AirportCoordinateSelector";

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    // background: theme.palette.primary.main,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      // background: "red",
    },
  },
  filter: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {},
  },
  filterWrapper: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  showDistance: {
    width: "100%",
    height: "200",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  showDistanceContent: {
    dislpay: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  mapContainer: {
    margin: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

export type CoordinateSelectorType = {
  key: string;
  coordinate: { lat: number; lng: number; name: string };
};

export type SelectedCoordinateType = {
  [key: string]: { lat: number; lng: number; name: string };
};

export default function MainController() {
  const classes = useStyles();
  const [showMap, toggleMap] = useState(false);
  const [distance, updateDistance] = useState<number>();
  const [selectedCordinates, updateSelectedCoordinate] =
    useState<SelectedCoordinateType>();

  const calculateHandler = () => {
    if (selectedCordinates?.to && selectedCordinates?.from) {
      const { from, to } = selectedCordinates;
      const distanceResult = getDistance(from, to);
      if (distanceResult) {
        return distanceResult;
      }
    }
  };

  const distanceResultCache = useMemo(
    () => calculateHandler(),
    [selectedCordinates]
  );

  useEffect(() => {
    if (distanceResultCache) {
      updateDistance(Math.floor(distanceResultCache * 0.000621371));
    }
  }, [distanceResultCache]);

  const updateCordinatesHandlerCallback = useCallback(
    (props: CoordinateSelectorType) => updateCordinatesHandler(props),
    [selectedCordinates]
  );

  const updateCordinatesHandler = ({
    key,
    coordinate,
  }: CoordinateSelectorType) => {
    updateSelectedCoordinate({ ...selectedCordinates, [key]: coordinate });
  };

  return (
    <Box className={classes.main}>
      <Paper className={classes.filter}>
        <Box className={classes.filterWrapper}>
          <h3>Select Airports: </h3>
          <AirportCoordinateSelector
            type="from"
            updateCoordinate={updateCordinatesHandlerCallback}
            selectedCoordinates={selectedCordinates}
          />
          <AirportCoordinateSelector
            type="to"
            updateCoordinate={updateCordinatesHandlerCallback}
            selectedCoordinates={selectedCordinates}
          />
        </Box>
      </Paper>
      <Box className={classes.showDistance}>
        {distance && (
          <Box className={classes.showDistanceContent}>
            {" "}
            <h2>{`Distance: ${distance} mi`}</h2>
            <Button
              variant="contained"
              size="medium"
              onClick={() => toggleMap(!showMap)}
            >
              {showMap ? "Hide Map" : "Show Map"}
            </Button>
          </Box>
        )}
        {showMap && (
          <Box className={classes.mapContainer}>
            {selectedCordinates && (
              <GoogleMap polylinePath={selectedCordinates} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
