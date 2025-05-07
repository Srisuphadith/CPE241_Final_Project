import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductGrid from './components/ProductGrid';
function product() {
  return (
    <div className="bg-[#1e1a1d] text-white min-h-screen">
    <Header />
    <Banner />
    <ProductGrid />
  </div>
  )
}

export default product