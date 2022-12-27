import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Cpu from "../../pages/cpu/Cpu";
import { useAppContext } from "../../context/appContext";

const Sidebar = () => {
    const { logoutUser } = useAppContext()

    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">Admin</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/exploratory-analysis"
                        style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard </span>
                            {/* <iframe title="Report Section" width="1280" height="720" src="https://app.powerbi.com/view?r=eyJrIjoiZjdhNmQ4MTUtNzhkYy00ZDIzLTgwZDctYTY2MDI1MzM4N2I5IiwidCI6ImFhYzBjNTY0LTZjNWUtNGIwNS04ZGMzLTQwODA4N2Y3N2Y3NiIsImMiOjEwfQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe> */}
                        </li>
                    </Link>
                    {/* <Link
                        to="/descriptive-analysis"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Descriptive Analysis</span>
                        </li>
                    </Link> */}
                    {/* <Link
                        to="/exploratory-analysis"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Exploratory Analysis</span>
                        </li>
                    </Link> */}
                    <Link
                        to="/cpu"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>CPU</span>
                        </li>
                    </Link>
                    <Link
                        to="/disk"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Disk</span>
                        </li>
                    </Link>
                    <Link
                        to="/jvm"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>JVM</span>
                        </li>
                    </Link>
                    <Link
                        to="/memory"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Memory</span>
                        </li>
                    </Link>
                    <Link
                        to="/network"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Network</span>
                        </li>
                    </Link>
                    {/* <Link to="/prediction" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Prediction</span>
                        </li>
                    </Link> */}
                    {/* <p className="title">LISTS</p> */}
                    <li>
                        <PersonOutlineOutlinedIcon className="icon" />
                        <span>Users</span>
                    </li>
                    {/* <p className="title">USEFUL</p> */}
                    <li>
                        <NotificationsOutlinedIcon className="icon" />
                        <span>Notifications</span>
                    </li>
                    {/* <p className="title">SERVICE</p>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsOutlinedIcon className="icon" />
                        <span>Settings</span>
                    </li> */}
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li>
                    <Link
                        to='/login'
                        style={{ textDecoration: "none" }}>
                        <li>
                            <ExitToAppOutlinedIcon className="icon" />
                            <button type='button' onClick={logoutUser}>
                                logout
                            </button>
                        </li>
                    </Link>

                </ul>
            </div>
            {/* <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div> */}
        </div>
    );
};

export default Sidebar;
