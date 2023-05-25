import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//TODO: unify icons used, all from same source

export default function TripDetails() {
  let { id } = useParams();
  let [trip, setTrip] = useState({});

  useEffect(() => {
    getTripDetails();
  }, []);

  const getTripDetails = () => {
    fetch(`/api/trips/${id}`)
      .then(res => res.json())
      .then(data => {
        // upon success, update tasks
        setTrip(data);
        console.log(data);
      })
      .catch(error => {
        // upon failure, show error message
        console.log(error);
      });
  };

  return (
    <div>
      <h3>{trip.location}</h3>
      <img src={trip.img} />
      <p>{trip.description}</p>
    </div>
  );
}
