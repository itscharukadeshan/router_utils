/** @format */

import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

function NavBar() {
  const [browserlessStatus, setBrowserlessStatus] = useState("offline");

  const browserless_url = `${API_URL}/api/status/browserless`;

  useEffect(() => {
    async function checkBrowserlessStatus() {
      try {
        const response = await axios.get(browserless_url);
        if (response.status === 200) {
          setBrowserlessStatus("online");
        } else {
          setBrowserlessStatus("offline");
        }
      } catch (error) {
        console.error("Failed to get browserless status:", error);
        setBrowserlessStatus("offline");
      }
    }

    checkBrowserlessStatus();
    const intervalId = setInterval(checkBrowserlessStatus, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='navbar bg-blue-950 shadow-lg'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>Router Utils</a>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal'>
          <li>
            <button className='btn btn-ghost'>
              browserless
              {browserlessStatus === "online" ? (
                <div className='badge badge-accent'>Online</div>
              ) : (
                <div className='badge badge-error'>Offline</div>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
