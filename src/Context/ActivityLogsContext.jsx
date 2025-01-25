import React, { createContext, useState, useContext } from "react";

const ActivityLogsContext = createContext();

// Create a Provider component
export const ActivityLogsProvider = ({ children }) => {
    const [selectedRowData, setSelectedRowData] = useState(null);

    return (
        <ActivityLogsContext.Provider value={{ selectedRowData, setSelectedRowData }}>
            {children}
        </ActivityLogsContext.Provider>
    );
};

export const useActivityLogs = () => {
    return useContext(ActivityLogsContext);
};
