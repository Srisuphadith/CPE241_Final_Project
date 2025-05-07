import React from 'react';
import logo_3 from '../../../assets/img/logo_3.png';
export default function Header() {
    return (
  <div>
    <header className="flex justify-between items-center p-4 border-b border-orange-400">
            <div className="flex items-center space-x-2">
              <img src={logo_3} alt="MONGKOL Logo" className="h-12" />
              <h1 className="text-orange-400 text-2xl font-bold">MONGKOL</h1>
            </div>
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Search" className="px-3 py-1 rounded-md text-black" />
              <button className="bg-white text-black px-4 py-1 rounded-md">Order</button>
            </div>
          </header>
          <nav className="flex space-x-4 p-4 bg-orange-400 text-black">
        <a href="/#" className='hover:text-white'>พุทธ</a>
        <a href="/#" className='hover:text-white'>คริสต์</a>
        <a href="/#" className='hover:text-white'>อิสลาม</a>
        <a href="/#" className='hover:text-white'>เทพเจ้า</a>
        <a href="/#" className='hover:text-white'>อื่น ๆ</a>
      </nav>
  </div>
    );
}
