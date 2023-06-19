import "./App.css";
import Layout from "./components/Layout";
import TripList from "./components/TripList";
import TripDetails from "./components/TripDetails";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TripList />} />
        <Route path="/trips/:id" element={<TripDetails />} />
      </Route>
    </Routes>
  );
}
