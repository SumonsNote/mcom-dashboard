import { useEffect, useRef, useState } from "react";

const CountdownTable = ({ countdown, openModal }) => {
  const [countdowns, setCountdowns] = useState({});
  const timers = useRef({}); // Track timers for each countdown

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    countdown.forEach((c) => {
      if (!c.is_active) {
        // Clear existing timer if countdown is inactive
        if (timers.current[c._id.$oid]) {
          clearInterval(timers.current[c._id.$oid]);
          delete timers.current[c._id.$oid];
        }
        return; // Skip inactive countdowns
      }

      // Set timer for active countdowns
      if (!timers.current[c._id.$oid]) {
        timers.current[c._id.$oid] = setInterval(() => {
          const updatedCountdowns = {};
          countdown.forEach((count) => {
            if (count._id.$oid === c._id.$oid) {
              const endDate = new Date(count.end_date);
              const timeDiff = endDate - new Date();

              if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);

                updatedCountdowns[count._id.$oid] = {
                  days,
                  hours,
                  minutes,
                  seconds,
                };
              } else {
                updatedCountdowns[count._id.$oid] = { expired: true };
                clearInterval(timers.current[count._id.$oid]);
                delete timers.current[count._id.$oid];
              }
            }
          });

          setCountdowns((prev) => ({ ...prev, ...updatedCountdowns }));
        }, 1000);
      }
    });

    return () => {
      // Cleanup all timers on component unmount
      Object.keys(timers.current).forEach((key) =>
        clearInterval(timers.current[key])
      );
    };
  }, [countdown]);

  if (!countdown || countdown.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No Countdowns found.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Label
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Countdown
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {countdown.map((c) => (
                <tr
                  key={c._id.$oid}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {c.label}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {c.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(c.start_date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(c.end_date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {c.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {countdowns[c._id.$oid] &&
                    !countdowns[c._id.$oid].expired ? (
                      <span>
                        {countdowns[c._id.$oid].days}d{" "}
                        {countdowns[c._id.$oid].hours}h{" "}
                        {countdowns[c._id.$oid].minutes}m{" "}
                        {countdowns[c._id.$oid].seconds}s
                      </span>
                    ) : (
                      <span className="text-red-500">Disable</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {c.is_active ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => openModal(c, "edit")}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CountdownTable;
