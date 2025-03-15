function loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-b-4 rounded-full animate-spin"></div>
        <span className="text-gray-700 font-medium">
          Loading, please wait...
        </span>
      </div>
    </div>
  );
}

export default loading;
