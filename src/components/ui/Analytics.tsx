const Analytics = () => {
  return (
    <div className="p-6 space-y-6 h-full">
      <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="mt-4 h-6 bg-gray-200 animate-pulse rounded-md"></div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-8 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-8 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              We're working hard to bring you powerful analytics tools. Stay
              tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
