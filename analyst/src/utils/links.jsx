import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const linksAdmin = [
    // {
    //   id: 1,
    //   text: 'Home',
    //   path: 'home',
    //   icon: <IoBarChartSharp />,
    // },
    {
      id: 1,
      text: 'dashboard',
      path: '/',
      icon: <ImProfile />,
    },
    {
      id: 2,
      text: 'CPU',
      path: 'cpu',
      icon: <MdQueryStats />,
    },
    {
      id: 3,
      text: 'disk',
      path: 'disk',
      icon: <FaWpforms />,
    },
    {
      id: 4,
      text: 'network',
      path: 'network',
      icon: <ImProfile />,
    },
    {
      id: 5,
      text: 'jvm',
      path: 'jvm',
      icon: <ImProfile />,
    },
    {
      id: 6,
      text: 'memory',
      path: 'memory',
      icon: <ImProfile />,
    },
    {
      id: 8,
      text: 'Register User',
      path: 'register-user',
      icon: <ImProfile />,
    },
    {

      id: 7,
      text: 'notification',
      path: 'notification',
      icon: <ImProfile />,
    },
    {
      id: 9,
      text: 'Feedbacks',
      path: 'feedback',
      icon: <ImProfile />,
    },
]
const linksUser = [
  {
    id: 1,
    text: 'dashboard',
    path: '/',
    icon: <ImProfile />,
  },
  {
    id: 2,
    text: 'CPU',
    path: 'cpu',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'disk',
    path: 'disk',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'network',
    path: 'network',
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: 'jvm',
    path: 'jvm',
    icon: <ImProfile />,
  },
  {
    id: 6,
    text: 'memory',
    path: 'memory',
    icon: <ImProfile />,
  },
  {

    id: 7,
    text: 'notification',
    path: 'notification',
    icon: <ImProfile />,
  },
  {
    id: 8,
    text: 'Feedbacks',
    path: 'feedback',
    icon: <ImProfile />,
  },
 
]
  
export  {linksAdmin, linksUser}