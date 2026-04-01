import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { get_product } from '../../store/Reducers/productReducer';

const ViewProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(get_product(productId));
    }
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="px-2 lg:px-7 pt-5">
        <h1 className="text-[#000000] font-semibold text-lg mb-3">Product Details</h1>
        <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-white">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#000000] font-semibold text-lg mb-3">Product Details</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-white space-y-6">
        <div className="flex flex-wrap gap-6">
          <div className="w-full md:w-1/2 space-y-3">
            <div>
              <p className="text-sm text-gray-200">Name</p>
              <p className="text-lg font-semibold text-white">{product.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-white">
              <div>
                <p className="text-gray-200">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-gray-200">Brand</p>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div>
                <p className="text-gray-200">Price</p>
                <p className="font-medium">€{product.price}</p>
              </div>
              <div>
                <p className="text-gray-200">Discount</p>
                <p className="font-medium">{product.discount ? `%${product.discount}` : 'No Discount'}</p>
              </div>
              <div>
                <p className="text-gray-200">Stock</p>
                <p className="font-medium">{product.stock}</p>
              </div>
              <div>
                <p className="text-gray-200">Shop Name</p>
                <p className="font-medium">{product.shopName}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-200 mb-1">Description</p>
              <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{product.description}</p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-gray-200 mb-3">Images</p>
            <div className="grid grid-cols-2 gap-4">
              {(product.images || []).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`product-${idx}`}
                  className="w-full h-40 object-cover rounded border border-white/20"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/seller/dashboard/edit-product/${product._id}`}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:shadow-lg hover:shadow-yellow-500/50"
          >
            Edit
          </Link>
          <Link
            to={-1}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
