import React, { useEffect, useState } from 'react';
import { useAlert } from '../AlertProvider/AlertProvider';
import fetchWithAuth from '../../utils/fetchWithAuth';
import { getValueFromToken } from '../../utils/getValueFromToken';

const BookComponent = ({ book }) => {
    const showAlert = useAlert();
    const [role, setRole] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedBook, setEditedBook] = useState({ ...book });

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

    const handleBorrow = async () => {
        console.log(`Borrowing book: ${book.title}`);
        
        const response = await fetchWithAuth(`/books/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                publicationYear: book.publicationYear,
                borrowed: true,
                borrowedBy: {
                    type: "member",
                    id: getValueFromToken(localStorage.getItem('accessToken'), 'id'),
                }
            }),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error('Failed to borrow the book.');
        }

        console.log('Book borrowed successfully');
        window.location.reload();
    };

    const handleDelete = async () => {
        if (book.borrowed) {
            showAlert('error', 'A könyv nem törölhető, mert kölcsönzött.');
            return;
        }

        if (!window.confirm(`Biztosan törölni szeretnéd a könyvet: ${book.title}?`)) {
            return;
        }

        try {
            const response = await fetchWithAuth(`/books/${book.id}`, { method: 'DELETE' });

            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to delete the book.');
            }

            console.log('Book deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting the book:', error);
        }
    };

    const handleReturn = async () => {
        try {
            const response = await fetchWithAuth(`/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn,
                    publicationYear: book.publicationYear,
                    borrowed: false,
                    borrowedBy: null,
                }),
            });
    
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to return the book.');
            }
    
            console.log('Book returned successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error returning the book:', error);
        }
    };

    const handleEdit = () => {
        if (book.borrowed) {
            showAlert('error', 'A könyv nem szerkeszthető, mert kölcsönzött.');
            return;
        }

        setEditedBook({ ...book });
        setEditModalOpen(true);
    };

    const handleSave = async () => {
        console.log(editedBook)
        try {
            const response = await fetchWithAuth(`/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedBook),
            });

            if (!response.ok) {
                throw new Error('Failed to update the book.');
            }

            showAlert('success', 'Könyv adatai sikeresen frissítve.');
            setEditModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating the book:', error);
            showAlert('error', 'Hiba történt a könyv adatainak frissítése során.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="p-6 rounded-lg shadow-lg w-96 bg-gray-800 text-white">
                        <h2 className="text-lg font-bold mb-4">Könyv szerkesztése</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Cím:</label>
                            <input
                                type="text"
                                name="title"
                                value={editedBook.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Szerző:</label>
                            <input
                                type="text"
                                name="author"
                                value={editedBook.author}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">ISBN:</label>
                            <input
                                type="text"
                                name="isbn"
                                value={editedBook.isbn}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Megjelenés éve:</label>
                            <input
                                type="number"
                                name="publicationYear"
                                value={editedBook.publicationYear}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Mégse
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            >
                                Mentés
                            </button>
                        </div>
                    </div>
                </div>
            )}
    
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
                                    <p><strong>Kölcsönözte:</strong> {book.borrowedBy.name}</p>
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
        </>
    );
};

export default BookComponent;