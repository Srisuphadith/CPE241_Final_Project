import React from 'react';

const products = [
  {
    name: 'พระสติ มวลสารถุงฟอยล์สีเขียว',
    price: 200,
    image: '/green.png',
  },
  {
    name: 'พระสติ มวลสาร Recycled PET',
    price: 200,
    image: '/recycled.png',
  },
  {
    name: 'A Piece of Islamic Art',
    price: 690,
    image: '/islamic.png',
  },
  {
    name: 'BABY GANESHA ปางปฐมพรหม',
    price: 1490,
    image: '/ganesha.png',
  },
  {
    name: 'พระสติ มวลสารฝาขวดน้ำ',
    price: 200,
    image: '/yellow.png',
  },
];

export default function ProductGrid() {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product, index) => (
        <div key={index} className="bg-white text-black rounded shadow p-2">
          <img src={product.image} alt={product.name} className="w-full h-32 object-contain" />
          <h3 className="mt-2 text-sm font-bold">{product.name}</h3>
          <div className="text-yellow-500 text-sm">★★★★★</div>
          <div className="text-lg font-bold">฿{product.price}</div>
        </div>
      ))}
    </div>
  );
}
