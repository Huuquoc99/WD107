
const Dashboard = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold">Thống kê</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="font-semibold">Thống kê 1</h2>
                    <p className="text-gray-600">Nội dung thống kê 1 ở đây.</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="font-semibold">Thống kê 2</h2>
                    <p className="text-gray-600">Nội dung thống kê 2 ở đây.</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="font-semibold">Thống kê 3</h2>
                    <p className="text-gray-600">Nội dung thống kê 3 ở đây.</p>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard