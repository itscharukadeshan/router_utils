/** @format */

import "./index.css";
import NavBar from "./components/NavBar";
import HutchCard from "./components/HutchCard";
import DialogCard from "./components/DialogCard";
import axios from "axios";
import { API_URL } from "./config";

function App() {
  // TODO find out what browserless resend req setTimeout
  // TODO some notifications

  const dialog_legacy_reboot = `${API_URL}/api/legacy/restart_dialog`;
  const hutch_legacy_reboot = `${API_URL}/api/legacy/restart_hutch`;

  const handleButtonClick = async () => {
    try {
      await axios.get(dialog_legacy_reboot);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.get(hutch_legacy_reboot);
    } catch (error) {
      console.error("Unable to restart");
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
    </div>
  );
}

export default App;
