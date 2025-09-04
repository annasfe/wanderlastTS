import "./Timeline.css";
import { formatDate } from "../utilities/utilities";
import { Trip } from "../types/Trip";

export default function Timeline({ pastTrips }: { pastTrips: Trip[] }) {
  return (
    <section className="timeline">
      <h3 className="timeline-start">Past Trips</h3>
      <ul>
        {pastTrips
          .sort(function(a, b) {
            return +(b.from_date > a.from_date) || -(b.from_date < a.from_date);
          })
          .map(trip => (
            <li key={trip.id}>
              <div>
                <img
                  className="card-img-top-small"
                  src={trip.img}
                  alt={trip.location}
                />
                <h4 className="mt-3">{trip.location}</h4>
                <time>
                  {trip.from_date
                    ? formatDate(trip.from_date, trip.to_date)
                    : "No dates given"}
                </time>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
