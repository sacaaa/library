import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Libraries = () => {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLibraries = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/libraries', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    throw new Error('Érvénytelen token. Jelentkezzen be újra.');
                }

                if (!response.ok) {
                    throw new Error('Hiba történt az adatok betöltésekor.');
                }

                const data = await response.json();
                setLibraries(data);
            } catch (err) {
                setError(err.message);
                localStorage.removeItem('accessToken'); // Token törlése
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchLibraries();
    }, [navigate]);

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Könyvtárak</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {libraries.map((library) => (
                        <div
                            key={library.id}
                            className="border rounded-lg shadow p-4 bg-gray-900"
                        >
                            <h2 className="text-xl font-bold mb-2">{library.name}</h2>
                            <p>
                                <strong>Cím:</strong> {library.address.city}, {library.address.street}
                            </p>
                            <p>
                                <strong>Telefon:</strong> {library.phoneNumber}
                            </p>
                            <p>
                                <strong>Email:</strong> {library.email}
                            </p>
                            <h3 className="text-lg font-semibold mt-4">Könyvtárosok:</h3>
                            {library.librarians.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {library.librarians.map((librarian) => (
                                        <li key={librarian.id}>
                                            {librarian.email}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nincsenek könyvtárosok ebben a könyvtárban.</p>
                            )}
                            <h3 className="text-lg font-semibold mt-4">Könyvek:</h3>
                            {library.books.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {library.books.map((book) => (
                                        <li key={book.id}>
                                            {book.title} by {book.author} ({book.publicationYear})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nincsenek könyvek ebben a könyvtárban.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Libraries;