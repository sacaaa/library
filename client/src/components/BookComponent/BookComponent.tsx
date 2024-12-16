import React, { useEffect, useState } from 'react';
import { useAlert } from '../AlertProvider/AlertProvider';

const BookComponent = ({ book }) => {
    const showAlert = useAlert();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('accessToken:', accessToken);

        if (accessToken) {
            try {
                const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
                const role = tokenPayload.role;
                setRole(role);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.warn('No access token found in localStorage.');
        }
    }, []);

    const handleBorrow = () => {
        console.log(`Borrowing book: ${book.title}`);
        showAlert('error', 'Könyv kölcsönözve.');
        // Add actual borrow logic here
    };

    const handleDelete = () => {
        console.log(`Deleting book: ${book.title}`);
        // Add actual delete logic here
    };

    const handleEdit = () => {
        console.log(`Editing book: ${book.title}`);
        // Add actual edit logic here
    };

    const handleReturn = () => {
        console.log(`Returning book: ${book.title}`);
        // Add actual return logic here
    };

    return (
        <div className="relative border rounded-lg shadow p-4 bg-gray-900">
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p><strong>Szerző:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Megjelenés éve:</strong> {book.publicationYear}</p>
    
            {book.borrowed ? (
                <>
                    {role === 'LIBRARIAN' ? (
                        <>
                            <div className="mt-2 text-gray-400">
                                <p><strong>Kölcsönözte:</strong> {book.borrowedBy.username}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={handleReturn}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                    Visszahozták
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-red-600">Nem elérhető.</p>
                    )}
                </>
            ) : null}
    
            {!book.borrowed && (
                <div className="mt-4">
                    {role !== 'LIBRARIAN' && (
                        <button
                            onClick={handleBorrow}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Kölcsönzés
                        </button>
                    )}
                </div>
            )}
    
            {role === 'LIBRARIAN' && (
                <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        onClick={handleEdit}
                        className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                    >
                        Szerkesztés
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Törlés
                    </button>
                </div>
            )}
        </div>
    );
    
};

export default BookComponent;