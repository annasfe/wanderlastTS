import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import { formatDate } from "../utilities/utilities";
import { Trip } from "../types/Trip";
import { Detail } from "../types/Detail";
//TODO: rethink this component, maybe break to a form and a list ones
//separate for hotels, planes, others, or all the same list? use radio button to mark what info you are adding
//mark price evolution?

export default function TripDetails() {
  let { id } = useParams();
  let [trip, setTrip] = useState<Trip>({} as Trip);
  let [formInput, setFormInput] = useState<Detail>({
    id: 0,
    name: "",
    url: "",
    price: 0,
    trip_id: Number(id) || 0
  });
  let [details, setDetails] = useState<Detail[]>([]);

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

  const deleteLink = async (id: number): Promise<void> => {
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = event.target;
    setFormInput(prevDetail => ({ ...prevDetail, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTripDetails();
    setFormInput({
      id: 0,
      name: "",
      url: "",
      price: 0,
      trip_id: Number(id) || 0
    });
  };

  return (
    <div className="tripdetails">
      <h3>{trip.location}</h3>
      <h5>{formatDate(trip.from_date, trip.to_date)}</h5>
      <p>{trip.description}</p>

      <div>
        <div className="mt-5 row">
          <form className="col" onSubmit={handleSubmit}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <button type="submit" className="btn btn-primary">
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
