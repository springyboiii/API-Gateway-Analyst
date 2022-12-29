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
          <div>
            <p>
              <button className='btn dropdown1' onClick={() => setShowLogout(!showLogout)}>
                <FaUserCircle />
                {user?.name} - {user?.type}
                <FaCaretDown />
              </button>
            </p>
            {/* "dropdown-content dropdown1-show" */}
            <div className={showLogout ? 'dropdown-content' : 'dropdown-content dropdown1-show'}>
              <p>
                <button className='btn' onClick={logoutUser} >
                  logout
                </button>
              </p>
            </div>
          </div>
          {/* </div> */}
        </div>

      </div>
    </Wrapper>
  )
}

export default Navbar