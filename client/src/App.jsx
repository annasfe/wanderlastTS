import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TripList from "./components/TripList";
import TripDetails from "./components/TripDetails";
import { Routes, Route } from "react-router-dom";

//add possible dates and plane offers, add ticket price
//add tags of "with who" (with Noah, with mum, with Edu, or family, couple etc)
//mark price evolution?
//drag and drop to re-arrange cards (or update date and short by date?)
//offer possibility for trips with no dates? just ideas?

export default function App() {
  let [trips, setTrips] = useState([]);

  useEffect(() => {
    getMyTrips();
  }, []);

  const getMyTrips = () => {
    fetch("/api/trips")
      .then(res => res.json())
      .then(data => {
        // upon success, update tasks
        setTrips(data);
        console.log(data);
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error);
      });
  };

  const updateTripState = data => {
    setTrips(data);
  };

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <TripList trips={trips} updateTripStateCb={updateTripState} />
            }
          />
          <Route path="/trips/:id" element={<TripDetails />} />
        </Routes>
      </div>
    </>
  );
}
