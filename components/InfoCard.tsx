import { DataInterface } from 'pages/search';
import React from 'react';

export default function InfoCard({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
  long,
  lat,
}: DataInterface) {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
}
