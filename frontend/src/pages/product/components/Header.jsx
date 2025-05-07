import React from 'react';
import logo_3 from '../../../assets/img/logo_3.png';
export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-[#1e1a1d]">
        
      <div className="flex items-center gap-2">
        <img src={logo_3} alt="Mongkol Logo" className="w-30 h-20" />
        <h1 className="text-orange-400 text-3xl font-bold">MONGKOL</h1>
      </div>

      <nav className="flex gap-4 bg-orange-400 p-2 rounded">
        {['พุทธ', 'คริสต์', 'อิสลาม', 'เทพเจ้า', 'อื่น ๆ'].map((tab) => (
          <button key={tab} className="text-black font-medium hover:underline">
            {tab}
          </button>
        ))}
      </nav>
 
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="p-1 rounded"
        />
        <button className="bg-white text-black px-3 py-1 rounded">Order</button>
      </div>
    </header>
  );
}
