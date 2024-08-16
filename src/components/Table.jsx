/** @format */

/* eslint-disable react/prop-types */

import prettyBytes from "pretty-bytes";

function Table({ data }) {
  let total_traffic = data.uplink_traffic + data.downlink_traffic;
  return (
    <div className='overflow-x-auto m-auto'>
      <table className='table font-bold font-mono '>
        <thead>
          <tr>
            <th>Stats</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RSRP</td>
            <td>{data.rsrp}</td>
          </tr>
          <tr>
            <td>RSRQ</td>
            <td>{data.rsrq}</td>
          </tr>

          <tr>
            <td>Down Link</td>
            <td>{prettyBytes(data.downlink_rate)}</td>
          </tr>
          <tr>
            <td>Up Link</td>
            <td>{prettyBytes(data.uplink_rate)}</td>
          </tr>
          <tr>
            <td>Up Traffic</td>
            <td>{prettyBytes(data.uplink_traffic)}</td>
          </tr>
          <tr>
            <td>Down Traffic</td>
            <td>{prettyBytes(data.downlink_traffic)}</td>
          </tr>
          <tr>
            <td>Total Traffic</td>
            <td>{prettyBytes(total_traffic)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { Table };
