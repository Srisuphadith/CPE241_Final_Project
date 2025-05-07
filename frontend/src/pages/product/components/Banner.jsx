import React from 'react';
import bannner from '../../../assets/img/bannner.png';
export default function Banner() {
  return (
    <div className="relative">
      <img
        src={bannner}
        alt="Banner"
        className="w-full h-[200px] object-cover"
      />
      <div className="absolute bottom-4 right-4 text-right text-white text-xl font-bold">
        <p>
          เปลี่ยน <span className="text-red-500">“พลาสติก”</span> สู่ <span className="text-orange-400">“พระสติ”</span>
        </p>
        <p>ไม่มีพุทธคุณแต่อยู่ยงคงกระพันนับร้อยปี</p>
      </div>
    </div>
  );
}
