import moment from "moment";
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const DEFAULT_IMG = import.meta.env.VITE_DEFAULT_IMG;

const formatDate = (fromD: string, toD: string): string => {
  if (!fromD && !toD) return "Dates TBD";
  if (!fromD) return `Until ${moment(toD).format("MMM Do")}`;
  if (!toD) return `From ${moment(fromD).format("MMM Do")}`;
  return `${moment(fromD).format("MMM Do")} - ${moment(toD).format("MMM Do")}`;
};

const getPhotoByLocation = async (location: string): Promise<string> => {
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
};

export { formatDate, getPhotoByLocation };
