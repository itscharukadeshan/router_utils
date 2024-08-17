/** @format */

import "./index.css";
import NavBar from "./components/NavBar";
import HutchCard from "./components/HutchCard";
import DialogCard from "./components/DialogCard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "./components/toastNotifications";

import axios from "axios";
import { API_URL } from "./config";

function App() {
  // TODO Docker image / way to host in sever

  const dialog_legacy_reboot = `${API_URL}/api/legacy/restart_dialog`;
  const hutch_legacy_reboot = `${API_URL}/api/legacy/restart_hutch`;

  const handleButtonClick = async () => {
    try {
      notify("Restart network", { type: "info" });
      await axios.get(dialog_legacy_reboot);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.get(hutch_legacy_reboot);
    } catch (error) {
      console.error("Unable to restart network");
      notify("Unable to restart network", { type: "error" });
    }
  };

  return (
    <div className=' bg-slate-800'>
      <NavBar />
      <button
        onClick={() => handleButtonClick()}
        className='btn btn-lg btn-warning btn-outline flex flex-col m-auto my-6'>
        Reboot Network
      </button>
      <div className='flex flex-col lg:flex-row w-full my-6'>
        <DialogCard />
        <HutchCard />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
