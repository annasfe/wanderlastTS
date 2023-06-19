import React from "react";
import "../App.css";
import Form from "./Form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formatDate from "../utilities/utilities";
import Timeline from "./Timeline";
//TODO: unify icons used, all from same source
//TODO: mark some as confirmed and the rest as potential or "ideas"

const tagColor = {
  family: "coral",
  ae: "turquoise",
  girls: "green",
  other: "grey"
};

export default function TripList() {
  const navigate = useNavigate();
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
    <div>
      <h3>Upcoming</h3>
      <div className="imgGrid">
        {trips
          .filter(trip => !trip.done)
          .sort(function(a, b) {
            return (
              (a.from_date === null) - (b.from_date === null) ||
              +(a.from_date > b.from_date) ||
              -(a.from_date < b.from_date)
            );
          }) //sort so that trip with no dates comes last
          .map(trip => (
            <div className="card" key={trip.id}>
              <img
                className="card-img-top"
                src={trip.img}
                alt="Card image cap"
                onClick={() => navigate(`/trips/${trip.id}`)}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {trip.location.charAt(0).toUpperCase() +
                    trip.location.slice(1)}
                </h5>
                <p className="card-text">
                  {trip.from_date
                    ? formatDate(trip.from_date, trip.to_date)
                    : "No dates yet"}
                </p>
                <div className="icons">
                  <div
                    className="tags"
                    style={{ backgroundColor: tagColor[trip.withwho] }}
                  >
                    {trip.withwho}
                  </div>
                  <div className="icons-buttons">
                    <button
                      title="Been there!"
                      className="btn btn-outline-dark bi bi-check2-square"
                      style={{ color: "green" }}
                      onClick={() => markTripDone(trip.id)}
                    ></button>
                    <button
                      title="Delete trip"
                      className="btn btn-outline-dark bi bi-trash"
                      style={{ color: "red" }}
                      onClick={() => deleteTrip(trip.id)}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="card d-flex">
          <div className="card-body align-items-center d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-success bi bi-plus"
              style={{ fontSize: "1.2rem" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></button>
          </div>
        </div>
      </div>

      <Timeline
        pastTrips={trips.filter(trip => trip.done)}
        deleteTrip={deleteTrip}
      />

      {/*  <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a new trip
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Form updateTripStateCb={setTrips} />
          </div>
        </div>
      </div>
      {/* Modal ends here */}
    </div>
  );
}

/* <h3>Past</h3>
        <ul className="mt-4 list-group">
          {trips
            .filter((trip) => trip.done)
            .map((trip) => (
              <li
                key={trip.id}
                className="list-group-item d-flex align-item-center justify-content-between"
              >
                <img src={trip.img} alt={trip.location} width="10%" />
                <div>
                  <h5 className="flex-grow-1">{trip.location}</h5>
                  <p>{trip.from_date
                    ? formatDate(trip.from_date, trip.to_date)
                    : "No dates given"} </p>
                </div>
                <span
                  role="button"
                  className="material-symbols-outlined"
                  onClick={() => deleteTrip(trip.id)}
                >
                  close
                </span>
              </li>
            ))}
        </ul> */
