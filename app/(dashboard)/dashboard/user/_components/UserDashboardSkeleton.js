const UserDashboardSkeleton = () => {
  return (
    <div className="bg-gray-50 dark:text-white dark:bg-gray-900 min-h-screen w-full animate-pulse">
      {/* Header Analytics Section */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
              >
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {[
                    "User",
                    "Username",
                    "Phone",
                    "Status",
                    "Role",
                    "Last Active",
                  ].map((header) => (
                    <th key={header} className="px-6 py-3 text-left">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="ml-4">
                          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                      </div>
                    </td>
                    {[1, 2, 3, 4, 5].map((cell) => (
                      <td key={cell} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardSkeleton;
