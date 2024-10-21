import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const Sibar = ({Children}: any) => {
  return (
    <div className='fixed top-0 bottom-0 left-0'>
        <aside className="w-64 bg-blue-400 shadow-md">
            <div className="p-6">
                <a href='/admin' className="text-3xl font-medium text-white">Dashboard</a>
                <nav className="mt-6">
                    <Link to="/admin/products" className="block py-2 px-4 text-black font-medium rounded-md hover:bg-gray-200">Danh sách sản phẩm</Link>
                    <a href="/admin/category" className="block py-2 px-4 text-black font-medium rounded-md hover:bg-gray-200 ">Quản lý danh mục</a>
                </nav>
            </div>
            

        </aside>
        {Children}
    </div>
  )
}

export default Sibar