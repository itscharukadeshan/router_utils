/** @format */

import "./index.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [serverStatus, setServerStatus] = useState("Unknown");
  const [statusColor, setStatusColor] = useState("badge-neutral");

  const handleRebootRouter1 = async () => {
    try {
      await axios.get("http://localhost:3000/hutch_reboot");
      alert("Router Reboot");
    } catch (error) {
      console.error("Error rebooting router 1:", error);
      alert("Failed to reboot router 1");
    }
  };

  const handleRebootRouter2 = async () => {
    try {
      await axios.get("http://localhost:3000/dialog_reboot");
      alert("Router Reboot");
    } catch (error) {
      console.error("Error rebooting router 2:", error);
      alert("Failed to reboot router 2");
    }
  };

  const handleStatusRouter1 = async () => {
    try {
      await axios.get("/hutch_dns");
      alert("Status command for Router 192.168.1.1 sent");
    } catch (error) {
      console.error("Error getting status for router 1:", error);
      alert("Failed to get status for router 1");
    }
  };

  const handleStatusRouter2 = async () => {
    try {
      await axios.get("/dialog_dns");
      alert("Status command for Router 192.168.8.1 sent");
    } catch (error) {
      console.error("Error getting status for router 2:", error);
      alert("Failed to get status for router 2");
    }
  };

  const checkServerStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/status");

      const massage = response.data.message;
      console.log(massage);

      setServerStatus("Reachable");
      setStatusColor("badge-success");
    } catch (error) {
      console.error("Error checking server status:", error);
      setServerStatus("Not reachable");
      setStatusColor("badge-error");
    }
  };

  return (
    <div className='text-2xl font-mono font-bold my-14 mx-14'>
      <h1 className='my-8'>Router Control Panel</h1>
      <div className='flex flex-col w-fit'>
        <button
          className='btn btn-outline btn-warning my-4 mx-10'
          onClick={handleRebootRouter1}>
          Reboot Hutch
        </button>
        <button
          className='btn btn-outline btn-error my-4 mx-10'
          onClick={handleRebootRouter2}>
          Reboot Dialog
        </button>
        <button
          className='btn btn-outline btn-warning my-4 mx-10'
          onClick={handleStatusRouter1}>
          Hutch Status
        </button>
        <button
          className='btn btn-outline btn-error my-4 mx-10'
          onClick={handleStatusRouter2}>
          Dialog Router
        </button>
        <button
          className='btn btn-outline btn-info my-4 mx-10'
          onClick={checkServerStatus}>
          Check Server Status
        </button>
        <div className={`badge ${statusColor} my-4 mx-10`}>{serverStatus}</div>
      </div>
    </div>
  );
}

export default App;
