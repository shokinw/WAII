import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { productID } = useParams();
  const { all_product } = useContext(ShopContext);

  const product = all_product.find((p) => p.id === Number(productID));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts currentProductId={product.id} />
    </div>
  );
};

export default Product;
