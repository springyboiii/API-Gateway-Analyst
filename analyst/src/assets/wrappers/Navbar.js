import styled from 'styled-components'

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: left;
  }
  background: var(--white);
  .btn-container {
    position: relative;
    display: inline-block;
    display: flex;
    
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    padding: 10px;
    margin-right: 5px;
    width: 100%;
  }
  

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: visible;
    border-radius: var(--borderRadius);
    display: block;

  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
    /* align-items: center; */
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  .dropdown1 {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    
    /* min-width: 160px; */
    /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); */
    /* padding: 12px 16px; */
    /* z-index: 1; */
  }

  /* .dropdown1:hover .dropdown-content {
    display: block;
  } */
  .dropdown1-show {
    display: block;
    top: 40px;
    left: 0;
    width: 100%;
    position: absolute;
    /* box-shadow: var(--shadow-4); */
    /* padding: 0.5rem; */
    text-align: center;
    /* visibility: visible; */
    border-radius: var(--borderRadius);
    display: block;
    /* padding: 30px;
    margin-right: 10px; */
  }
  
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`
export default Wrapper
