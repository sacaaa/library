import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/books', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Nem sikerült betölteni a könyveket.');

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

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Könyvek</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="border rounded-lg shadow p-4 bg-gray-900"
                        >
                            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                            <p><strong>Szerző:</strong> {book.author}</p>
                            <p><strong>ISBN:</strong> {book.isbn}</p>
                            <p><strong>Megjelenés éve:</strong> {book.publicationYear}</p>
                            {book.borrowed ? (
                                <p className="text-red-600">Nem elérhető.</p>
                            ) : (
                                <p className="text-green-600">Elérhető.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Books;