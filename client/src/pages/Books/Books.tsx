import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import fetchWithAuth from '../../utils/fetchWithAuth';
import BookComponent from '../../components/BookComponent/BookComponent';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationYear: '',
        borrowed: false,
        borrowedBy: null,
    });

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

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetchWithAuth('/books', { method: 'GET' });

                if (!response.ok) {
                    throw new Error('Nem sikerült betölteni a könyveket.');
                }

                const booksData = await response.json();
                setBooks(booksData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleCreateBook = async () => {
        try {
            const response = await fetchWithAuth('/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error('Nem sikerült létrehozni a könyvet.');
            }

            const createdBook = await response.json();
            setBooks((prevBooks) => [...prevBooks, createdBook]);
            setCreateModalOpen(false);
            setNewBook({
                title: '',
                author: '',
                isbn: '',
                publicationYear: '',
                borrowed: false,
                borrowedBy: null,
            });
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Könyvek</h1>
                {role === 'LIBRARIAN' && (
                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mb-4"
                    >
                        Új könyv hozzáadása
                    </button>
                )}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="p-6 rounded-lg shadow-lg w-96 bg-gray-800 text-white">
                            <h2 className="text-lg font-bold mb-4">Új könyv hozzáadása</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Cím:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Szerző:</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={newBook.author}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">ISBN:</label>
                                <input
                                    type="text"
                                    name="isbn"
                                    value={newBook.isbn}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Megjelenés éve:</label>
                                <input
                                    type="number"
                                    name="publicationYear"
                                    value={newBook.publicationYear}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setCreateModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Mégse
                                </button>
                                <button
                                    onClick={handleCreateBook}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Létrehozás
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookComponent key={book.id} book={book} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Books;
