/** @format */

import "./index.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [hutchDhcpDns, setHutchDhcpDns] = useState("192.168.1.1");
  const [dialogDhcpDns, setDialogDhcpDns] = useState("192.168.8.1");

  const handleDhcpToggle = async (routerIp, dhcpDns) => {
    const data = `isTest=false&goformId=DHCP_SETTING&lanIp=${routerIp}&lanNetmask=255.255.255.0&lanDhcpType=SERVER&CSRFToken=78974&dhcpStart=${routerIp.slice(
      0,
      -1
    )}100&dhcpEnd=${routerIp.slice(
      0,
      -1
    )}200&dhcpDns=${dhcpDns}&dhcp2_Enabled=1&dhcp2_Dns=&dhcpLease=24&dhcp_reboot_flag=1`;
    const url = `http://${routerIp}/goform/goform_set_cmd_process`;

    try {
      const response_01 = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(response_01.data);

      await delay(10);

      const response_02 = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(response_02.data);

      alert(`DHCP settings updated for router ${routerIp}`);
    } catch (error) {
      console.error(
        `Error updating DHCP settings for router ${routerIp}:`,
        error
      );
      alert(`Error updating DHCP settings for router ${routerIp}`);
    }
  };

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

      <div className='container mx-fit my-8'>
        <h1 className='text-2xl font-bold mb-4'>DHCP Toggle for Routers</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='card shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title text-warning'>Hutch Router</h2>
              <button
                className='btn btn-outline btn-warning my-4 mx-10'
                onClick={() => handleDhcpToggle("192.168.1.1", hutchDhcpDns)}>
                Set DHCP DNS to {hutchDhcpDns}
              </button>
              <div className='mt-4'>
                <label className='label'>Choose DNS for Hutch Router:</label>
                <select
                  className='select select-bordered w-full'
                  value={hutchDhcpDns}
                  onChange={(e) => setHutchDhcpDns(e.target.value)}>
                  <option value='192.168.1.1'>Power bank</option>
                  <option value='192.168.1.175'>Current</option>
                </select>
              </div>
            </div>
          </div>
          <div className='card shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title text-error'>Dialog Router</h2>
              <button
                className='btn btn-outline btn-error my-4 mx-10'
                onClick={() => handleDhcpToggle("192.168.8.1", dialogDhcpDns)}>
                Set DHCP DNS to {dialogDhcpDns}
              </button>
              <div className='mt-4'>
                <label className='label'>Choose DNS for Dialog Router:</label>
                <select
                  className='select select-bordered w-full'
                  value={dialogDhcpDns}
                  onChange={(e) => setDialogDhcpDns(e.target.value)}>
                  <option value='192.168.8.1'>Power bank</option>
                  <option value='192.168.8.198'>Current</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
