import "../App.css";
import { useState } from "react";
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const DEFAULT_IMG = import.meta.env.VITE_DEFAULT_IMG;

const emptyTrip = {
  location: "",
  from_date: "",
  to_date: "",
  withwho: "",
  description: ""
};

export default function Form({ updateTripStateCb }) {
  let [trip, setTrip] = useState(emptyTrip);

  const handleChange = event => {
    let { name, value } = event.target;
    setTrip(prevTrip => ({ ...prevTrip, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addTrip(trip);
    setTrip(emptyTrip);
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
      if (data.results.length > 0) return data.results[0].urls.small; //.thumb or .small
      return DEFAULT_IMG; //if no image found
    } catch (error) {
      console.log(error);
    }
  };

  const addTrip = async trip => {
    console.log(trip);
    try {
      let img = await getPhotoByLocation(trip.location);
      console.log(img);
      let results = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...trip, img })
      });
      let data = await results.json();
      updateTripStateCb(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal-body">
        <div className="mt-5 row">
          <form className="col">
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className="col-sm-5">
                <input
                  type="date"
                  className="form-control"
                  id="to_date"
                  name="to_date"
                  value={trip.to_date}
                  onChange={e => handleChange(e)}
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
                    onChange={e => handleChange(e)}
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
                    onChange={e => handleChange(e)}
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
                    value="niki"
                    name="withwho"
                    onChange={e => handleChange(e)}
                  />
                  <label className="form-check-label" htmlFor="radio3">
                    Niki
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="radio4"
                    value="alone"
                    name="withwho"
                    onChange={e => handleChange(e)}
                  />
                  <label className="form-check-label" htmlFor="radio4">
                    alone!
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="radio5"
                    value="other"
                    name="withwho"
                    onChange={e => handleChange(e)}
                  />
                  <label className="form-check-label" htmlFor="radio5">
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
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={e => handleSubmit(e)}
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
    </>
  );
}
