import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import fetchWithAuth from '../../utils/fetchWithAuth';
import MemberComponent from '../../components/MemberComponent/MemberComponent';

const Members = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        if (role && role !== 'LIBRARIAN') {
            navigate('/');
        }
    }, [role, navigate]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetchWithAuth('/users', { method: 'GET' });

                if (!response.ok) {
                    throw new Error('Nem sikerült betölteni a tagokat.');
                }

                const usersData = await response.json();
                const membersData = usersData.filter(user => user.role === 'MEMBER');
                setMembers(membersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (role === 'LIBRARIAN') {
            fetchMembers();
        }
    }, [role]);

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Tagok</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <MemberComponent key={member.id} member={member} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Members;
