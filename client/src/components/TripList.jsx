import "../App.css";
import Form from "./Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const icons = {
  noah: "family_restroom",
  ae: "favorite",
  alone: "hiking",
  niki: "sports_bar",
  other: "face_2"
};

export default function TripList({ trips, updateTripStateCb }) {
  const navigate = useNavigate();

  const deleteTrip = async id => {
    try {
      let results = await fetch(`/api/trips/${id}`, {
        method: "DELETE"
      });
      let data = await results.json();
      updateTripStateCb(data);
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
      updateTripStateCb(data);
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
          .map(trip => (
            //add condition here, if trip done = TRUE then don't show here
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
                  {moment(trip.from_date).format("MMM Do")} -{" "}
                  {moment(trip.to_date).format("MMM Do")}
                </p>

                {/* <a href="#" className="btn btn-primary" onClick={()=>deleteTrip(trip.id)}>
                  Delete
                </a> */}
                <div className="icons">
                  <span className="material-symbols-outlined">
                    {icons[trip.withwho]}
                  </span>
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
        {/** this card should be there to open form in modal, for now just show or hide form on top */}
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

      <div className="mt-5">
        <h3>Past</h3>
        <ul className="mt-4 list-group">
          {trips
            .filter(trip => trip.done)
            .map(trip => (
              <li
                key={trip.id}
                className="list-group-item d-flex align-item-center justify-content-between"
              >
                <img src={trip.img} alt={trip.location} width="10%" />
                <div>
                  <h5 className="flex-grow-1">{trip.location}</h5>
                  <p>{moment(trip.from_date).format("MMM YYYY")} </p>
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
        </ul>
      </div>

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
            <Form updateTripStateCb={updateTripStateCb} />
          </div>
        </div>
      </div>
      {/* Modal ends here */}
    </div>
  );
}
