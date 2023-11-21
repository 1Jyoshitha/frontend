// BookingIcons.tsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface BookingIconsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const BookingIcons: React.FC<BookingIconsProps> = ({ onEdit, onDelete }) => (
  <div className='icons'>
    <FaEdit className='edit-icon' onClick={onEdit} />
    <FaTrash className='delete-icon' onClick={onDelete} />
  </div>
);

export default BookingIcons;
