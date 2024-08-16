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
import { Table } from "./Table";
import moment from "moment";

function HutchCard() {
  const hutch_stats_url = `${API_URL}/api/status/hutch`;
  const hutch_reboot = `${API_URL}/api/restart_hutch`;
  const hutch_legacy_reboot = `${API_URL}/api/legacy/restart_hutch`;

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
        const response = await axios.get(hutch_stats_url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        notify("Hutch router restarting", { type: "success" });
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [hutch_stats_url]);

  const handleButtonClick = async (endpoint) => {
    try {
      await axios.get(endpoint);
      notify("Restarting router", { type: "info" });
    } catch (error) {
      console.error("Unable to restart");
      notify("Unable to restart", { type: "error" });
    }
  };

  return (
    <div className='card lg:card-normal bg-pink-950 shadow-2xl flex-1 m-6 ml-6'>
      <div className='card-title text-3xl mt-6 mx-auto font-serif font-extrabold text-warning '>
        Hutch - {data.network_type}
      </div>
      <div className='card-body m-auto'>
        <div className='flex flex-col lg:flex-row '>
          <button
            onClick={() => handleButtonClick(hutch_reboot)}
            className='btn btn-sm btn-outline btn-warning w-fit m-auto my-2 lg:mx-2'>
            Reboot Hutch
          </button>
          <button
            onClick={() => handleButtonClick(hutch_legacy_reboot)}
            className='btn btn-sm btn-outline btn-warning w-fit m-auto my-2 lg:mx-2 '>
            Reboot Hutch - Legacy
          </button>
        </div>
        <div className='stats shadow stats-vertical bg-transparent my-6 lg:w-fit lg:mx-auto '>
          <div className='stat place-items-center'>
            <div className='stat-title text-gray-400 font-bold font-mono mb-2'>
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
            <div className='stat-title text-gray-400 font-mono mb-2'>
              Uptime
            </div>
            <div className='stat-value '>{formatUptime(data.online_time)}</div>
          </div>
        </div>
        <Table data={data} />
      </div>
    </div>
  );
}

export default HutchCard;
