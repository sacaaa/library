import React, { createContext, useContext, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type AlertContextType = (type: 'success' | 'error', message: string) => void;

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ type: null, message: '' });

    const showAlert = (type, message) => {
        setAlert({ type, message });

        setTimeout(() => {
            setAlert({ type: null, message: '' });
        }, 3000);
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            {ReactDOM.createPortal(
                alert.type && (
                    <div
                        className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg flex items-center text-white space-x-2 ${
                            alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                        {alert.type === 'success' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                        <span>{alert.message}</span>
                    </div>
                ),
                document.body
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};