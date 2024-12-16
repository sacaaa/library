import React from 'react';
import fetchWithAuth from '../../utils/fetchWithAuth';

const MemberComponent = ({ member }) => {
    const handleDelete = async () => {
        try {
            const response = await fetchWithAuth(`/users/${member.id}`, { method: 'DELETE' });

            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to delete the user.');
            }

            console.log('User deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting the user:', error);
        }
    };

    const handleEdit = () => {
        // Add actual edit logic here
    };


    return (
        <div className="relative border rounded-lg shadow p-4 bg-gray-900">
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
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p>
                <strong>Email:</strong> {member.email}
            </p>
            {member.library && (
                <p>
                    <strong>Könyvtár:</strong> {member.library.name}
                </p>
            )}
            {member.dateOfBirth && (
                <p>
                    <strong>Születési dátum:</strong> {member.dateOfBirth}
                </p>
            )}
            {member.borrowedBooks && member.borrowedBooks.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Kölcsönzött könyvek:</h3>
                    <ul className="list-disc list-inside">
                        {member.borrowedBooks.map((book) => (
                            <li key={book.id}>
                                {book.title} by {book.author} ({book.publicationYear})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MemberComponent;