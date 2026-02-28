import React from 'react';

interface UpdateData {
  title?: string;
  date?: string;
  description?: string;
  image?: string;
}

interface UpdateCardProps {
  data?: UpdateData;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="update-card">
      <h3>{data.title}</h3>
    </div>
  );
};