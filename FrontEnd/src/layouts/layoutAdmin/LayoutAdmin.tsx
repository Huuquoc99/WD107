
import { Outlet } from 'react-router-dom'
import Sibar from '../../components/Admin/Sibar'

const LayoutAdmin = () => {
  return (
    <div>
      <Sibar/>
      <div className='ml-64'>
      <Outlet/>
      </div>
    </div>
  )
}

export default LayoutAdmin