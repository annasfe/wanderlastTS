import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
const ACCESS_KEY = "BaXlkcyzx-Yqm2rDsLROqZ4sJuorABsyRvqkoizc-DQ";

//add possible dates and plane offers, add ticket price
//add tags of "with who" (with Noah, with mum, with Edu, or family, couple etc)
//add default price for hotel
//mark price evolution?
//mark as done and show in past timeline
//drag and drop to re-arrange cards

export default function App() {
  let [tripInput, setInput] = useState("");
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

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    addTrip();
    setInput("");
  };

  const getPhotoByLocation = async location => {
    try {
      let options = {
        headers: {
          Authorization: "Client-ID " + ACCESS_KEY
        }
      };
      let results = await fetch(
        `https://api.unsplash.com/search/photos?page=1&per_page=3&orientation=landscape&query=${location}`,
        options
      );
      let data = await results.json();
      console.log(data);
      return data.results[0].urls.small;
    } catch (error) {
      console.log(error);
    }
  };

  const addTrip = async () => {
    try {
      let tripImg = await getPhotoByLocation(tripInput);
      let results = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ location: tripInput, img: tripImg })
      });
      let data = await results.json();
      setTrips(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = id => {
    // update task from database
    // upon success, update tasks
    // upon failure, show error message
  };

  const deleteTrip = async id => {
    try {
      let results = await fetch(`/api/trips/${id}`, {
        method: "DELETE"
      });
      let data = await results.json();
      setTrips(data);
    } catch (error) {
      console.log(error);
    }
  };

  const markTripDone = async id => {
    try {
      let results = await fetch(`/api/trips/${id}`, {
        method: "PUT"
      });
      let data = await results.json();
      setTrips(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div>
          <div className="imgGrid">
            {trips.map(trip => (
              <div className="card" key={trip.id}>
                <img
                  className="card-img-top"
                  src={trip.img}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {trip.location.charAt(0).toUpperCase() +
                      trip.location.slice(1)}
                  </h5>
                  <p className="card-text">Your next destination.</p>
                  {/* <a href="#" className="btn btn-primary" onClick={()=>deleteTrip(trip.id)}>
                  Delete
                </a> */}
                  <div className="icons">
                    <button
                      className="btn btn-outline-dark bi bi-check2-square"
                      style={{ fontSize: "1.2rem" }}
                      onClick={() => markTripDone(trip.id)}
                    ></button>
                    <button
                      className="btn btn-outline-dark bi bi-trash"
                      style={{ fontSize: "1.2rem" }}
                      onClick={() => deleteTrip(trip.id)}
                    ></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right mt-5">
          <form onSubmit={e => handleSubmit(e)}>
            <input
              type="text"
              name="tripInput"
              value={tripInput}
              placeholder="Next trip idea"
              onChange={e => handleChange(e)}
            />
            <button className="btn btn-primary ml-2">Add to wishlist</button>
          </form>
        </div>
      </div>
    </>
  );
}
