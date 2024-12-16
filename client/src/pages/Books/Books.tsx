import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import fetchWithAuth from '../../utils/fetchWithAuth';
import BookComponent from '../../components/BookComponent/BookComponent';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Könyvek</h1>
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