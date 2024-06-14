/** @format */

function NavBar() {
  return (
    <div className='navbar bg-gray-800'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>Router Utils</a>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a
              className='font-mono font-extrabold'
              href='https://router-utils.vercel.app/'>
              Website
            </a>
          </li>
          <li>
            <details>
              <summary className='font-mono font-extrabold'>Local</summary>
              <ul className='p-2 bg-base-100 rounded-t-none'>
                <li>
                  <a
                    className='font-mono font-extrabold'
                    href='http://192.168.1.175:5000'>
                    Hutch
                  </a>
                </li>
                <li>
                  <a
                    className='font-mono font-extrabold'
                    href='http://192.168.8.198:5000'>
                    Dialog
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
