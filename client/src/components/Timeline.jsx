import "./Timeline.css";
import formatDate from "../utilities/utilities";

export default function Timeline({ pastTrips, deleteTrip }) {
  // // define variables
  // var items = document.querySelectorAll(".timeline li");

  // // check if an element is in viewport
  // // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  // function isElementInViewport(el) {
  //   var rect = el.getBoundingClientRect();
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <=
  //       (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // }

  // function callbackFunc() {
  //   for (var i = 0; i < items.length; i++) {
  //     if (isElementInViewport(items[i])) {
  //       items[i].classList.add("in-view");
  //     }
  //   }
  // }

  // // listen for events
  // window.addEventListener("load", callbackFunc);
  // window.addEventListener("resize", callbackFunc);
  // window.addEventListener("scroll", callbackFunc);

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
                {/* <span
                role="button"
                className="material-symbols-outlined corner"
                onClick={() => deleteTrip(trip.id)}
              >
                close
              </span> */}
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
