const NotFound = () => {
  return (
    <div className="mx-auto py-8 sm:py-0 w-full grid gap-6 p-6 sm:p-0 sm:w-[400px]">
      <div className="grid gap-2">
        <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
          404 - Not Found
        </h1>
      </div>
      <p className="text-sm text-gray-500 font-medium text-primary-600">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;