import "../App.css";
import { useState } from "react";
import { Trip } from "../types/Trip";

const emptyTrip = {
  id: 0,
  location: "",
  from_date: "",
  to_date: "",
  withwho: "",
  description: "",
  done: false,
  img: ""
};

export default function Form({ addTrip }: { addTrip: (trip: Trip) => void }) {
  let [trip, setTrip] = useState<Trip>(emptyTrip);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = event.target;
    // Ensure date fields are always strings, never null
    const sanitizedValue = value || "";
    setTrip(prevTrip => ({ ...prevTrip, [name]: sanitizedValue }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTrip(trip);
    setTrip(emptyTrip);
  };

  return (
    <>
      <div className="modal-body">
        <div className="mt-5 row">
          <form className="col" onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="location" className="col-sm-2 col-form-label">
                Location
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={trip.location}
                  placeholder="I wanna go to..."
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="from_date" className="col-sm-2 col-form-label">
                Dates
              </label>
              <div className="col-sm-5">
                <input
                  type="date"
                  className="form-control"
                  id="from_date"
                  name="from_date"
                  value={trip.from_date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-5">
                <input
                  type="date"
                  className="form-control"
                  id="to_date"
                  name="to_date"
                  value={trip.to_date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">With...</label>
              <div className="col-sm-10">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="radio1"
                    value="ae"
                    name="withwho"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="radio1">
                    ae
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="radio2"
                    value="noah"
                    name="withwho"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="radio2">
                    Edu & Noah
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="radio3"
                    value="girls"
                    name="withwho"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="radio3">
                    girl-time
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="radio4"
                    value="other"
                    name="withwho"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="radio4">
                    other
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={trip.description}
                  placeholder="What's the idea?"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Let's go
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
