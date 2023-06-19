import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import formatDate from "../utilities/utilities";

//TODO: rethink this component, maybe break to a form and a list ones
//separate for hotels, planes, others, or all the same list? use radio button to mark what info you are adding
//mark price evolution?

export default function TripDetails() {
  let { id } = useParams();
  let [trip, setTrip] = useState({});
  let [formInput, setFormInput] = useState({ name: "", url: "", price: 0 });
  let [details, setDetails] = useState([]);

  useEffect(() => {
    getTripDetails();
  }, []);

  const getTripDetails = () => {
    fetch(`/api/trips/${id}`)
      .then(res => res.json())
      .then(data => {
        // upon success, update tasks
        setTrip(data);
        setDetails(data.details);
        console.log(data);
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error);
      });
  };

  const addTripDetails = () => {
    fetch(`/api/trips/${id}/hotels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formInput)
    })
      .then(res => res.json())
      .then(data => {
        // upon success, update tasks
        setDetails(data);
        console.log(data);
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error);
      });
  };

  const deleteLink = async id => {
    try {
      let results = await fetch(`/api/trips/hotels/${id}`, {
        method: "DELETE"
      });
      let data = await results.json();
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = event => {
    let { name, value } = event.target;
    setFormInput(prevDetail => ({ ...prevDetail, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addTripDetails();
    setFormInput({ name: "", url: "", price: 0 });
  };

  return (
    <div className="tripdetails">
      <h3>{trip.location}</h3>
      <h5>{formatDate(trip.from_date, trip.to_date)}</h5>
      <div>
        <p>{trip.description}</p>
        <div className="mt-5 row">
          <form className="col">
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formInput.name}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="url" className="col-sm-2 col-form-label">
                URL
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  name="url"
                  value={formInput.url}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => handleSubmit(e)}
              >
                Add link
              </button>
            </div>
          </form>
        </div>
      </div>

      {details.length > 0 && (
        <div className="mt-5">
          <h3>Things to do and other links!</h3>
          <ul className="mt-4 list-group">
            {details.map(det => (
              <li
                key={det.id}
                className="list-group-item d-flex align-item-center justify-content-between"
              >
                <div>
                  <a href={det.url}>
                    <h5 className="flex-grow-1">{det.name}</h5>
                  </a>
                </div>
                <span
                  role="button"
                  className="material-symbols-outlined"
                  onClick={() => deleteLink(det.id)}
                >
                  close
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
