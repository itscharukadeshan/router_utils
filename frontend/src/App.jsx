/** @format */

import "./index.css";
import axios from "axios";

function App() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleRebootRouter1 = async () => {
    const data = `isTest=false&goformId=REBOOT_DEVICE`;
    const url = "http://192.168.1.1/goform/goform_set_cmd_process";

    try {
      const response_01 = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
      </div>
    </div>
  );
}

export default App;
