import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import fetchWithAuth from '../../utils/fetchWithAuth';
import LibraryComponent from '../../components/LibraryComponent/LibraryComponent';

const Libraries = () => {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                const response = await fetchWithAuth('/libraries', { method: 'GET' });

                if (!response.ok) {
                    throw new Error('Nem sikerült betölteni a könyvtárakat.');
                }

                const librariesData = await response.json();
                setLibraries(librariesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraries();
    }, []);

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Könyvtárak</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {libraries.map((library) => (
                        <LibraryComponent key={library.id} library={library} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Libraries;