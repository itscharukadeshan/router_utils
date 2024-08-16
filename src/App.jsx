/** @format */

import "./index.css";
import NavBar from "./components/NavBar";
import HutchCard from "./components/HutchCard";
import DialogCard from "./components/DialogCard";

function App() {
  // TODO Refactor card to be separate components (dynamically pass data).
  // TODO Implement the table with status and other data.
  // TODO Add Legacy restart
  // TODO Add dns_2 of and on flow

  return (
    <>
      <NavBar />
      <div className='flex flex-col lg:flex-row w-full'>
        <DialogCard />
        <HutchCard />
      </div>
    </>
  );
}

export default App;
