import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_products, delete_product } from '../../store/Reducers/productReducer';
import { LuImageMinus } from 'react-icons/lu';


const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#000000] font-semibold text-lg mb-3">All Products</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((d, i) => (
                <tr key={i}>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <img className="w-[45px] h-[45px]" src={d.images[0]} alt="" />
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d?.name?.slice(0, 15)}...
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d.category}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d.brand}{' '}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    €{d.price}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d.discount === 0 ? <span>No Discount</span> : <span>%{d.discount}</span>}
                  </td>

                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d.stock}
                  </td>

                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${d._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        {' '}
                        <FaEdit />{' '}
                      </Link>

                      <Link
                        to={`/seller/dashboard/add-banner/${d._id}`}
                        className="p-[6px] bg-sky-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        {' '}
                        <LuImageMinus />{' '}
                      </Link>

                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        {' '}
                        <FaEye />{' '}
                      </Link>
                      <button
                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                        onClick={() => handleDeleteClick(d._id)}
                        title="Delete Product"
                      >
                        <FaTrash />
                      </button>
                 
                          {/* Confirmation Modal */}
                          {showConfirm && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
                              <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-xs text-center animate-fade-in border border-gray-200">
                                <h2 className="text-xl font-bold mb-4 text-gray-900">Delete Product?</h2>
                                
                                <div className="flex justify-center gap-6 mt-2">
                                  <button
                                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    onClick={handleConfirmDelete}
                                    autoFocus
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    onClick={handleCancelDelete}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalProduct <= parPage ? (
          ''
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Products;
