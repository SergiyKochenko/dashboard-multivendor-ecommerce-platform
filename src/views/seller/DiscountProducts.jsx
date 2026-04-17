import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_products, delete_product } from '../../store/Reducers/productReducer';
import { LuImageMinus } from 'react-icons/lu';

const DiscountProducts = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage, dispatch]);

  const handleDeleteClick = (productId) => {
    setDeleteId(productId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(delete_product(deleteId)).then((action) => {
      if (action.type.endsWith('fulfilled')) {
        toast.success('Product deleted successfully!');
      }
    });
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const formatPrice = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return value;
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
    }).format(parsed);
  };

  // Filter products with discount > 0
  const discountedProducts = Array.isArray(products)
    ? products.filter((p) => p && typeof p.discount === 'number' && p.discount > 0)
    : [];
  // Paginate discounted products
  const paginatedDiscounted = discountedProducts.slice((currentPage - 1) * parPage, currentPage * parPage);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-slate-900 font-semibold text-xl">Discount Products</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor active promotions and quickly manage discounted listings.</p>
        </div>
        <Link
          to="/seller/dashboard/add-product"
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all w-fit"
        >
          Add Product
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#f8f9ff] via-[#eef2ff] to-[#f6f7ff] shadow-sm">
        <div className="absolute -top-20 -left-20 h-52 w-52 rounded-full bg-[#9aa5ff]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#8ee3d7]/20 blur-3xl" />

        <div className="relative p-4 md:p-6 lg:p-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm mb-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Search
                setParPage={setParPage}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                variant="light"
              />
              <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600">
                Discounted products: <span className="font-semibold text-slate-900">{discountedProducts.length}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-2 md:p-4 shadow-sm">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-700">
                <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Image</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Brand</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Discount</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedDiscounted.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-8 text-slate-500">
                        No discounted products found.
                      </td>
                    </tr>
                  ) : (
                    paginatedDiscounted.map((d, i) => (
                      <tr key={d._id || i} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-medium whitespace-nowrap">{(currentPage - 1) * parPage + i + 1}</td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          {d?.images?.[0] ? (
                            <img
                              className="w-[45px] h-[45px] rounded-lg object-cover border border-slate-200"
                              src={d.images[0]}
                              alt=""
                            />
                          ) : (
                            <div className="w-[45px] h-[45px] rounded-lg border border-dashed border-slate-300 bg-slate-50" />
                          )}
                        </td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          {d?.name?.length > 18 ? `${d.name.slice(0, 18)}...` : d?.name || '-'}
                        </td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">{d.category || '-'}</td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">{d.brand || '-'}</td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">{formatPrice(d.price)}</td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                            {`${d.discount}% off`}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">{d.stock}</td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          <div className="flex justify-start items-center gap-2">
                            <Link
                              to={`/seller/dashboard/edit-product/${d._id}`}
                              className="p-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
                              title="Edit Product"
                            >
                              <FaEdit />
                            </Link>
                            <Link
                              to={`/seller/dashboard/add-banner/${d._id}`}
                              className="p-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
                              title="Add Banner"
                            >
                              <LuImageMinus />
                            </Link>
                            <Link
                              to={`/seller/dashboard/view-product/${d._id}`}
                              className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                              title="View Product"
                            >
                              <FaEye />
                            </Link>
                            <button
                              className="p-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors"
                              onClick={() => handleDeleteClick(d._id)}
                              title="Delete Product"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {discountedProducts.length > parPage && (
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={discountedProducts.length}
                parPage={parPage}
                showItem={3}
                variant="light"
              />
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border border-slate-200 text-center">
            <h2 className="text-lg font-bold mb-2 text-slate-900">Delete Product?</h2>
            <p className="text-sm text-slate-600 mb-5">This action will permanently remove the selected product.</p>

            <div className="flex justify-center gap-3">
              <button
                className="px-5 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors"
                onClick={handleConfirmDelete}
                autoFocus
              >
                Yes
              </button>
              <button
                className="px-5 py-2 border border-slate-300 bg-white text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountProducts;
