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
  img {
  max-width: 100%;
  height: auto;
}

/* nav {
  background-color: #fff;
  padding: 0 3rem;
  border-radius: 0.625rem;
} */

ul {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 3rem;
}
li {
  list-style-type: none;
  position: relative;
  padding: 0.625rem 0 0.5rem;
}
li ul {
  flex-direction: column;
  position: absolute;
  background-color: white;
  align-items: flex-start;
  transition: all 0.5s ease;
  width: 20rem;
  right: -3rem;
  top: 4.5rem;
  border-radius: 0.325rem;
  gap: 0;
  padding: 1rem 0rem;
  opacity: 0;
  box-shadow: 0px 0px 100px rgba(20, 18, 18, 0.25);
  display: none;
}
ul li:hover > ul,
ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: flex;
}

.material-icons-outlined {
  color: #888888;
  transition: all 0.3s ease-out;
}

.material-icons-outlined:hover {
  color: #ff9800;
  transform: scale(1.25) translateY(-4px);
  cursor: pointer;
}


.profile {
  height: 3rem;
  width: auto;
  cursor: pointer;
}
.sub-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.725rem;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}

.sub-item:hover {
  background-color: rgba(232, 232, 232, 0.4);
}

.sub-item:hover .material-icons-outlined {
  color: #ff9800;
  transform: scale(1.08) translateY(-2px);
  cursor: pointer;
}

.sub-item:hover p {
  color: #000;
  cursor: pointer;
}
.sub-item p {
  font-size: 0.85rem;
  color: #888888;
  font-weight: 500;
  margin: 0.4rem 0;
  flex: 1;
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
