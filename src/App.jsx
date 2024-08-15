/** @format */

import "./index.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className='flex flex-col lg:flex-row w-full'>
        <div className='card lg:card-normal bg-pink-950 shadow-2xl flex-1 m-6 ml-6'>
          <div className='card-title mt-6 mx-auto font-serif font-extrabold text-warning '>
            Dialog
          </div>
          <div className='card-body'>
            <button className='btn btn-sm btn-ghost btn-outline w-fit mx-auto '>
              Reboot Dialog
            </button>
            <div className='stats shadow stats-vertical bg-transparent my-6 lg:w-2/4 lg:mx-auto '>
              <div className='stat place-items-center'>
                <div className='stat-title text-gray-400 font-mono mb-2'>
                  Signal
                </div>
                <div className='stat-value'>1</div>
              </div>

              <div className='stat place-items-center'>
                <div className='stat-title text-gray-400 font-mono mb-2'>
                  Sim status
                </div>
                <div className='stat-value '>4,200</div>
              </div>

              <div className='stat place-items-center'>
                <div className='stat-title text-gray-400 font-mono mb-2'>
                  Sim status
                </div>
                <div className='stat-value '>4,200</div>
              </div>
            </div>
            <div className='overflow-x-auto'></div>
          </div>
        </div>
        <div className='card lg:card-normal bg-orange-950  shadow-2xl flex-1 m-6 ml-6'>
          <div className='card-title mt-6 mx-auto font-serif font-extrabold text-warning'>
            Hutch
          </div>
          <div className='card-body'>
            <button className='btn btn-sm btn-ghost btn-outline  w-fit mx-auto'>
              Reboot Hutch
            </button>
            <div className='stats shadow stats-vertical my-6 bg-transparent lg:w-2/4 lg:mx-auto'>
              <div className='stat place-items-center'>
                <div className='stat-title text-gray-400 font-mono mb-2'>
                  Signal
                </div>
                <div className='stat-value'>1</div>
              </div>

              <div className='stat place-items-center'>
                <div className='stat-title text-gray-400 font-mono mb-2'>
                  Sim status
                </div>
                <div className='stat-value '>4,200</div>
              </div>

              <div className='stat place-items-center'>
                <div className='stat-title text-gray-400 font-mono mb-2'>
                  Sim status
                </div>
                <div className='stat-value '>4,200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
