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
import { API_URL } from "../config";
import moment from "moment";

function DialogCard() {
  const dialog_stats_url = `${API_URL}/api/status/dialog`;
  const dialog_reboot = `${API_URL}/api/restart_dialog`;
  const dialog_legacy_reboot = `${API_URL}/api/legacy/restart_dialog`;
  const [data, setData] = useState({
    service_status: "Loading ...",
    sim_status: "Loading ...",
    plmn: "Unknown Network",
    rsrp: "Loading ...",
    rsrq: "Loading ...",
    uplink_rate: "Loading ...",
    downlink_rate: "Loading ...",
    uplink_traffic: "Loading ...",
    downlink_traffic: "Loading ...",
    web_signal: "Loading ...",
    online_time: "Loading ...",
  });
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
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [dialog_stats_url]);

  const handleButtonClick = async (endpoint) => {
    try {
      await axios.get(endpoint);
      if (endpoint === dialog_reboot) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await axios.get(endpoint);
      }
    } catch (error) {
      console.error("Unable to restart");
    }
  };

  return (
    <div className='card lg:card-normal bg-pink-950 shadow-2xl flex-1 m-6 ml-6'>
      <div className='card-title text-3xl mt-6 mx-auto font-serif font-extrabold text-warning '>
        Dialog
      </div>
      <div className='card-body m-auto'>
        <div className='flex flex-col lg:flex-row '>
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
        <div className='overflow-x-auto'></div>
      </div>
    </div>
  );
}

export default DialogCard;
