import React from "react";
import "../App.css";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../hooks/useTrips";
import { formatDate } from "../utilities/utilities";
import Timeline from "./Timeline";
//TODO: unify icons used, all from same source
//TODO: mark some as confirmed and the rest as potential or "ideas"

type TripTag = "family" | "ae" | "girls" | "other";

const tagColor: Record<TripTag, string> = {
  family: "coral",
  ae: "turquoise",
  girls: "green",
  other: "grey"
};

export default function TripList() {
  const navigate = useNavigate();
  const {
    trips,
    loading,
    error,
    deleteTrip,
    markTripDone,
    addTrip
  } = useTrips();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Upcoming</h3>
      <div className="imgGrid">
        {trips
          .filter(trip => !trip.done)
          .sort(function(a, b) {
            return (
              +(a.from_date === "") - +(b.from_date === "") ||
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
                    style={{
                      backgroundColor:
                        tagColor[trip.withwho as TripTag] || tagColor.other
                    }}
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

      <Timeline pastTrips={trips.filter(trip => trip.done)} />

      {/*  <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
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
            <Form addTrip={addTrip} />
          </div>
        </div>
      </div>
      {/* Modal ends here */}
    </div>
  );
}
