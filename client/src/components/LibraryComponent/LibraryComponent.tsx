import React from 'react';

const LibraryComponent = ({ library }) => {
    return (
        <div className="border rounded-lg shadow p-4 bg-gray-900">
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
                        <li key={librarian.id}>{librarian.email}</li>
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
    );
};

export default LibraryComponent;