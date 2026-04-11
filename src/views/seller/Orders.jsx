import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_orders } from '../../store/Reducers/OrderReducer';

const Orders = () => {
  const dispatch = useDispatch();

  const { myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    setCurrentPage(1);
  }, [parPage, searchValue]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage, 10),
      page: parseInt(currentPage, 10),
      searchValue,
      sellerId: userInfo._id,
    };
    dispatch(get_seller_orders(obj));
  }, [dispatch, searchValue, currentPage, parPage, userInfo._id]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#000000] font-semibold text-lg mb-3">Orders</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Date
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i}>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    #{d._id}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    € {d.price}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d.payment_status}{' '}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold
                        ${d.delivery_status === 'pending' ? 'bg-gray-200 text-gray-800' : ''}
                        ${d.delivery_status === 'processing' ? 'bg-yellow-200 text-yellow-800' : ''}
                        ${d.delivery_status === 'warehouse' ? 'bg-purple-200 text-purple-800' : ''}
                        ${d.delivery_status === 'placed' ? 'bg-orange-200 text-orange-800' : ''}
                        ${d.delivery_status === 'shipped' ? 'bg-blue-200 text-blue-800' : ''}
                        ${d.delivery_status === 'delivered' ? 'bg-green-200 text-green-800' : ''}
                        ${d.delivery_status === 'cancelled' ? 'bg-red-200 text-red-800' : ''}
                        ${d.delivery_status === 'returned' ? 'bg-gray-200 text-gray-800' : ''}
                      `}
                    >
                      {d.delivery_status}
                    </span>
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d.date}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/order/details/${d._id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        {' '}
                        <FaEye />{' '}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalOrder <= parPage ? (
          ''
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
