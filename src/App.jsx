/** @format */

import "./index.css";
import axios from "axios";
import NavBar from "./components/NavBar";

function App() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleRebootRouter1 = async () => {
    const data = `isTest=false&goformId=REBOOT_DEVICE`;
    const url = "http://192.168.8.2/goform/goform_set_cmd_process";

    try {
      const response_01 = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });

      console.log(response_01);

      const response_02 = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      await delay(10);

      console.log(response_02);
    } catch (error) {
      console.error("Error rebooting router 2:", error);
      alert("Request forwarded successfully, but encountered an error");
    }
  };

  const handleRebootRouter2 = async () => {
    const data = `isTest=false&goformId=REBOOT_DEVICE`;
    const url = "http://192.168.8.1/goform/goform_set_cmd_process";

    try {
      const response_01 = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response_01);

      await delay(10);

      const response_02 = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response_02);
    } catch (error) {
      console.error("Error rebooting router 2:", error);
      alert("Request forwarded successfully, but encountered an error");
    }
  };

  return (
    <>
      <NavBar />

      <div className=' card w-96 bg-base-100 shadow-xl m-12'>
        <div className='card-body'>
          <h1 className=' card-title justify-center my-4'>
            Router Control Panel
          </h1>
          <div className='card-actions justify-center'>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
