import React, { useState } from 'react';
import fetchWithAuth from '../../utils/fetchWithAuth';

const MemberComponent = ({ member }) => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedMember, setEditedMember] = useState({ ...member });

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
        setEditedMember({ ...member });
        setEditModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetchWithAuth(`/users/${member.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedMember),
            });

            if (!response.ok) {
                throw new Error('Failed to update the member.');
            }

            console.log('Member updated successfully');
            setEditModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating the member:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedMember((prev) => ({
            ...prev,
            [name]: value,
        }));
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

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Tag szerkesztése</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Név:</label>
                            <input
                                type="text"
                                name="name"
                                value={editedMember.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={editedMember.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        {editedMember.library && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Könyvtár neve:</label>
                                <input
                                    type="text"
                                    name="library"
                                    value={editedMember.library.name}
                                    onChange={(e) =>
                                        setEditedMember((prev) => ({
                                            ...prev,
                                            library: { ...prev.library, name: e.target.value },
                                        }))
                                    }
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Születési dátum:</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={editedMember.dateOfBirth}
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
        </div>
    );
};

export default MemberComponent;