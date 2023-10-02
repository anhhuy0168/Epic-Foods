import { useRef, useState, useEffect, useContext } from "react";
import DeckGL from "deck.gl";
import { Map, Marker } from "react-map-gl";
import Wrapper from "./MapDeliveryStyle";
import axios from "axios";
import { PathLayer } from "@deck.gl/layers";
import mapboxgl from "mapbox-gl";
import { AiOutlineCar } from "react-icons/ai";

import { AuthContext } from "../../../src/contexts/AuthContext";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmFubWluaGxlIiwiYSI6ImNsODFlcnJtbDBmZWczdnQ5c20wOWdvdzgifQ.zIQ4DC5dVzV0v5NQR9O6eQ";

const MapDelivery = ({ customerAddress }) => {
  const restaurantAddress =
    "553000, Hòa Cường Bắc, Quận Cẩm Lệ, Da Nang, Vietnam";

  const [coorCus, setCoorCus] = useState(null);
  const [coorRes, setCoorRes] = useState(null);
  const [dirCoor, setDirCoor] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const data = [
    {
      name: "shipping-route",
      color: [101, 147, 245],
      path: dirCoor,
    },
  ];

  const layer = [
    new PathLayer({
      id: "path-layer",
      data,
      getWidth: (data) => 7,
      getColor: (data) => data.color,
      widthMinPixels: 7,
    }),
  ];

  useEffect(() => {
    getCoordinatesCustomer();
    getCoordinatesRestaurant();
  }, []);

  useEffect(() => {
    if (!coorCus || !coorRes) return;
    checkDirection();
  }, [coorCus, coorRes]);

  //get lag lat customer address
  const getCoordinatesCustomer = async () => {
    const res = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${customerAddress}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${mapboxgl.accessToken}`
    );

    setCoorCus(res.data.features[0].center);
  };

  //get lag lat restaurant address
  const getCoordinatesRestaurant = async () => {
    const res = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${restaurantAddress}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${mapboxgl.accessToken}`
    );

    setCoorRes(res.data.features[0].center);
  };

  //check coordinates direction
  const checkDirection = async () => {
    const res = await axios(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${coorRes[0]}%2C${coorRes[1]}%3B${coorCus[0]}%2C${coorCus[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`
    );

    const data = res.data.routes[0];
    const route = data.geometry.coordinates;
    setDistance(res.data.routes[0].distance.toFixed(0));
    setDuration(res.data.routes[0].duration.toFixed(0));
    setDirCoor(route);
  };

  console.log(distance, duration);

  return (
    <>
      <div style={{ position: "relative", top: -210, right: 160 }}>
        <AiOutlineCar size={30} />
      </div>
      <p style={{ position: "relative", top: -237, right: 110 }}>
        Distance {distance && distance}m / in{" "}
        {duration && Math.floor(duration / 60)} mins
      </p>
      <Wrapper>
        <div style={{ margin: "0 0 0 0" }}></div>
        <DeckGL
          initialViewState={{
            longitude: dirCoor ? dirCoor[7][0] : -122.481132,
            latitude: dirCoor ? dirCoor[7][1] : 37.698203,
            zoom: 12.5,
          }}
          height="400px"
          width="700px"
          controller={true}
          layers={layer} // layers here!
        >
          <Map
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={mapboxgl.accessToken}
          ></Map>
        </DeckGL>
      </Wrapper>
    </>
  );
};

export default MapDelivery;
