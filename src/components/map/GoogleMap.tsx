import {
  LoadScript,
  GoogleMap,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { memo } from "react";
import { SelectedCoordinateType } from "../distance-calculator/MainController";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  mapwrapper: {
    textAlign: "center",
    height: "50vh",
    width: "100%",
  },
  mapMain: {
    width: "100%",
    height: "100%",
  },
}));

const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

function GoogleMapComponent({
  polylinePath,
}: {
  polylinePath: SelectedCoordinateType;
}) {
  const { to, from } = polylinePath;
  const classes = useStyles();
  return (
    <div className={classes.mapwrapper}>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAwrVWgTb-pGDno9NrQTQmUVIoFwwPVdUU"
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName={classes.mapMain}
          center={{ lat: 39.5, lng: -98.35 }}
          zoom={3}
        >
          <Polyline path={[from, to]} options={options} />
          <Marker position={from} title={from.name} />
          <Marker position={to} title={to.name} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default memo(GoogleMapComponent);
