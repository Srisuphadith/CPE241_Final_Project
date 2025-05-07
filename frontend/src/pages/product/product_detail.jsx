import React, { useState } from "react";
import logo_3 from '../../assets/img/logo_3.png';
const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => setQuantity(quantity + 1);
  const handleSubtract = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="bg-[#2d2727] text-white min-h-screen font-sans">
      {/* Header */}
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

      {/* Navbar */}
      <nav className="flex space-x-4 p-4 bg-orange-400 text-black">
        <a href="/#" className='hover:text-white'>พุทธ</a>
        <a href="/#" className='hover:text-white'>คริสต์</a>
        <a href="/#" className='hover:text-white'>อิสลาม</a>
        <a href="/#" className='hover:text-white'>เทพเจ้า</a>
        <a href="/#" className='hover:text-white'>อื่น ๆ</a>
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="space-y-4">
          <img src="/main-image.png" alt="พระสติ" className="rounded shadow" />
          <div className="grid grid-cols-6 gap-2">
            {[...Array(6)].map((_, idx) => (
              <img
                key={idx}
                src={`/thumb-${idx}.png`}
                alt={`thumb ${idx}`}
                className="rounded border border-gray-300"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold">พระสติ มวลสารถุงฟอยล์สีเขียว</h2>
          <div className="text-yellow-400 my-2">⭐⭐⭐⭐☆</div>
          <p className="text-2xl font-semibold">฿200</p>

          <div className="flex items-center space-x-2 mt-4">
            <button onClick={handleSubtract} className="px-3 py-1 bg-white text-black rounded">-</button>
            <span className="px-4 text-lg">{quantity}</span>
            <button onClick={handleAdd} className="px-3 py-1 bg-white text-black rounded">+</button>
            <button className="ml-4 bg-orange-400 text-black px-4 py-2 rounded">Add to cart</button>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Detail</h3>
            <p className="mt-2 text-sm leading-relaxed">
              พระสติ มีให้สวดบูชา 16 มวลสาร<br />
              มีกรรมวิธีปลุกเสกจากการอัดแน่นด้วยวัสดุโซเชียลมาย่อย ขณ ขึ้นรูปใหม่ จดปราณีต หมดจด งดงาม
              <br /><br />
              พุทธคุณ :<br />
              นี้คือพระที่ขึ้นชื่อเรื่อง อยู่ยงคงกระพันนานมากว่า 100 ปี ตกน้ำไม่จม ไหลไม่ร่วง โดนไฟไม่ไหม้
              ละลายหายไปเลย เหลือไว้แต่กลิ่น รถยนต์ โดนเหยียบ จะบุบง มอมแมมแค่แป๊บเดียว หยิบขึ้นมาเปิด ๆ บูชาต่อได้
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;