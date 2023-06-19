import moment from "moment";

const formatDate = (fromD, toD) =>
  `${moment(fromD).format("MMM Do")} - ${moment(toD).format("MMM Do")}`;

export default formatDate;
