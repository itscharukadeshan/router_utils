/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import {
  MdSignalWifiStatusbarNull,
  MdSignalWifiStatusbar1Bar,
  MdSignalWifiStatusbar2Bar,
  MdSignalWifiStatusbar3Bar,
  MdSignalWifiStatusbar4Bar,
} from "react-icons/md";

import notify from "./toastNotifications";
import { API_URL } from "../config";
import moment from "moment";
import { Table } from "./Table";

function DialogCard() {
  const dialog_stats_url = `${API_URL}/api/status/dialog`;
  const dialog_reboot = `${API_URL}/api/restart_dialog`;
  const dialog_legacy_reboot = `${API_URL}/api/legacy/restart_dialog`;
  const dialog_network_switch = `${API_URL}/api/switch_network/dialog`;
  const dns2_off = `${API_URL}/api/dns2_dialog_disable`;
  const dns2_on = `${API_URL}/api/dns2_dialog_enable`;
  const [data, setData] = useState({
    service_status: "Loading ...",
    sim_status: "Loading ...",
    plmn: "Unknown Network",
    rsrp: "Loading ...",
    rsrq: "Loading ...",
    uplink_rate: 0,
    downlink_rate: 0,
    uplink_traffic: 0,
    downlink_traffic: 0,
    web_signal: "Loading ...",
    online_time: "Loading ...",
    network_type: "Loading ...",
  });
  const [switchChecked, setSwitchChecked] = useState(
    data.ppp_status === "ppp_connected"
  );
  const [isLoading, setIsLoading] = useState(false);
  const formatUptime = (seconds) => {
    return moment.duration(seconds, "seconds").humanize();
  };

  const getSignalIcon = (strength) => {
    switch (parseInt(strength)) {
      case 0:
        return MdSignalWifiStatusbarNull;
      case 1:
        return MdSignalWifiStatusbar1Bar;
      case 2:
        return MdSignalWifiStatusbar2Bar;
      case 3:
        return MdSignalWifiStatusbar3Bar;
      case 4:
        return MdSignalWifiStatusbar4Bar;
      default:
        return MdSignalWifiStatusbarNull;
    }
  };

  const getSimStatusIcon = (status) => {
    return status.toLowerCase() === "normal" ? HiStatusOnline : HiStatusOffline;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(dialog_stats_url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        notify("Dialog router restarting", { type: "success" });
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [dialog_stats_url]);

  useEffect(() => {
    setSwitchChecked(data.ppp_status === "ppp_connected");
  }, [data.ppp_status]);

  const handleButtonClick = async (endpoint) => {
    try {
      if (endpoint === dns2_off) {
        notify("Disabling dns 02", { type: "info" });
      } else if (endpoint === dns2_on) {
        notify("enabling dns 02", { type: "info" });
      } else {
        notify("Restarting router", { type: "info" });
      }

      setIsLoading(true);

      await axios.get(endpoint);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Unable to restart");
      if (endpoint === dns2_off) {
        notify("Unable to disable dns 02", { type: "error" });
      } else if (endpoint === dns2_on) {
        notify(" Unable to enabling dns 02", { type: "error" });
      } else {
        notify("Unable to restart router", { type: "error" });
      }
    }
  };

  const handleSwitchClick = async (endpoint) => {
    let network_status = "on";

    if (switchChecked === true) {
      network_status = "off";
    }

    try {
      setIsLoading(true);
      await axios.get(endpoint);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(`Unable to switch ${network_status} internet connection`);
      notify(`Unable to switch ${network_status} internet connection`, {
        type: "error",
      });
    }
  };

  return (
    <div className='card lg:card-large bg-pink-950 shadow-2xl flex-1 m-6 ml-6'>
      {/* Conditionally render loading spinner */}
      {isLoading ? (
        <span className='loading loading-bars bg-warning loading-md absolute top-6 left-6'></span>
      ) : null}
      <div className='absolute top-6 right-6 mt-1'>
        <input
          type='checkbox'
          className='toggle toggle-warning'
          checked={switchChecked}
          onChange={() => handleSwitchClick(dialog_network_switch)}
        />
      </div>
      <div className='card-title text-3xl mt-6 mx-auto font-serif font-extrabold text-warning '>
        Dialog - {data.network_type}
      </div>
      <div className='card-body m-auto'>
        <div className='flex flex-col lg:flex-row m-auto '>
          <button
            onClick={() => handleButtonClick(dialog_reboot)}
            className='btn btn-sm btn-outline btn-warning w-fit m-auto my-2 lg:mx-2'>
            Reboot Dialog
          </button>
          <button
            onClick={() => handleButtonClick(dialog_legacy_reboot)}
            className='btn btn-sm btn-outline btn-warning w-fit m-auto my-2 lg:mx-2 '>
            Reboot Dialog - Legacy
          </button>
        </div>
        <div className='stats shadow stats-vertical bg-transparent my-6 lg:w-fit lg:mx-auto '>
          <div className='stat place-items-center'>
            <div className='stat-title text-gray-400 font-bold font-mono  mb-2'>
              Signal ({data.web_signal})
            </div>
            <div className='stat-value m-2 '>
              {React.createElement(getSignalIcon(data.web_signal))}
            </div>
          </div>

          <div className='stat place-items-center'>
            <div className='stat-title text-gray-400 font-bold font-mono mb-2'>
              Sim status
            </div>
            <div className='stat-value m-2'>
              {React.createElement(getSimStatusIcon(data.sim_status))}
            </div>
          </div>

          <div className='stat place-items-center'>
            <div className='stat-title text-gray-400 font-bold font-mono mb-2'>
              Uptime
            </div>
            <div className='stat-value '>{formatUptime(data.online_time)}</div>
          </div>
        </div>
        <Table data={data} />
        <div className='flex flex-col lg:flex-row m-auto mt-4 '>
          <button
            onClick={() => handleButtonClick(dns2_on)}
            className='btn btn-sm btn-outline btn-success w-fit m-auto my-2 lg:mx-2'>
            Switch Dns_2 On
          </button>

          <button
            onClick={() => handleButtonClick(dns2_off)}
            className='btn btn-sm btn-outline btn-success w-fit m-auto my-2 lg:mx-2 '>
            Switch Dns_2 Off
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogCard;
