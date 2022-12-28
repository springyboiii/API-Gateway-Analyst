import { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import Wrapper from '../assets/wrappers/Navbar'
const Navbar = () => {

  const { toggleSidebar, logoutUser, user } = useAppContext()
  const [showLogout, setShowLogout] = useState(true)

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name} - {user?.type}
            <FaCaretDown />
          </button>
          {/* <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}> */}
            <button className='btn' onClick={logoutUser} >
              logout
            </button>
          {/* </div> */}

          {/* <li>
            <img src="analyst\src\assets\images\logo.svg" class="profile" />
            <ul>
              <li class="sub-item">
                <span class="material-icons-outlined"> grid_view </span>
                <p>Dashboard</p>
              </li>
              <li class="sub-item">
                <span class="material-icons-outlined">
                  format_list_bulleted
                </span>
                <p>My Orders</p>
              </li>
              <li class="sub-item">
                <span class="material-icons-outlined"> manage_accounts </span>
                <p>Update Profile</p>
              </li>
              <li class="sub-item">
                <span class="material-icons-outlined"> logout </span>
                <p>Logout</p>
              </li>
            </ul>
          </li> */}

        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar