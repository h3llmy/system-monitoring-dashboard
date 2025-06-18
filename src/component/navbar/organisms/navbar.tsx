import { useDarkMode } from "../../../utils/hooks";

export const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <span className="text-2xl font-semibold dark:text-white">
          Home Server
        </span>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              // Sun icon (visible in dark, click to go light)
              <svg
                className="h-6 w-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v2m0 14v2m8.66-10h2M3.34 12H1.34m15.36 6.36l1.41 1.41M6.34 6.34L4.93 4.93m12.73 0l1.41 1.41M6.34 17.66l-1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              // Moon icon (visible in light, click to go dark)
              <svg
                className="h-6 w-6 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};
