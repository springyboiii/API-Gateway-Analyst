import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
    {
      id: 1,
      text: 'Home',
      path: '/',
      icon: <IoBarChartSharp />,
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
]
  
export default links