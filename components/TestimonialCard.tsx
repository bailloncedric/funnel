
import React from 'react';
import { Testimonial } from '../types';

const TestimonialCard: React.FC<Testimonial> = ({ quote, author, role, avatarUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 text-left flex flex-col h-full animate-fade-in">
        <div className="flex-grow">
            <p className="text-slate-600 italic mb-4">"{quote}"</p>
        </div>
        <div className="flex items-center mt-4">
            <img src={avatarUrl} alt={author} className="w-12 h-12 rounded-full mr-4" />
            <div>
            <p className="font-semibold text-slate-800">{author}</p>
            <p className="text-sm text-slate-500">{role}</p>
            </div>
        </div>
    </div>
  );
};

export default TestimonialCard;
