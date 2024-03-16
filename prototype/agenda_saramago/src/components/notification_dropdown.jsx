import React from 'react';

function NotificationsDropdown() {
    return (
        <div className="absolute z-10 right-16 mt-60 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="py-1">
        {/* Your notification items */}
        <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Notification 1
        </div>
        <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Notification 2
        </div>
        <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Notification 3
        </div>
        <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Notification 4
        </div>
        <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          Notification 5
        </div>
      </div>
    </div>
    ) 
}
export default NotificationsDropdown;