/** @format */

import "./index.css";
import NavBar from "./components/NavBar";
import HutchCard from "./components/HutchCard";
import DialogCard from "./components/DialogCard";

function App() {
  // TODO Implement the table with status and other data.
  // TODO Add dns_2 of and on flow
  // TODO find out what browserless resend req setTimeout
  // TODO some notifications

  return (
    <div className=' bg-slate-800'>
      <NavBar />
      <div className='flex flex-col lg:flex-row w-full'>
        <DialogCard />
        <HutchCard />
      </div>
    </div>
  );
}

export default App;
