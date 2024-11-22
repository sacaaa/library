import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';

const HomePage = () => {
    const [booksCount, setBooksCount] = useState(0);
    const [librariesCount, setLibrariesCount] = useState(0);
    const [membersCount, setMembersCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/data');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBooksCount(data.bookCount);
                setLibrariesCount(data.libraryCount);
                setMembersCount(data.userCount);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Header />
            <div className="flex-grow">
                <div className="dashboard flex flex-wrap justify-center mt-6">
                    <Card title="Könyvtárak" count={librariesCount} color="bg-green-500" link="/libraries" />
                    <Card title="Könyvek" count={booksCount} color="bg-blue-500" link="/books" />
                    <Card title="Tagok" count={membersCount} color="bg-red-500" link="/members" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;