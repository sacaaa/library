import React from 'react';

interface CardProps {
    title: string;
    count: number;
    color?: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ title, count, color = 'bg-slate-700', link }) => {
    return (
        <div className={`card ${color} shadow-md rounded-lg p-6 mt-32 m-6 w-80 h-40 flex flex-col justify-between`}>
            <div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-3xl">{count}</p>
            </div>
            <div className="flex justify-end">
                <a href={link} className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center">
                    <span>További információk</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default Card;