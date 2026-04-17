import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller_order } from '../../store/Reducers/OrderReducer';
import api from '../../api/api';
import toast from 'react-hot-toast';

const ORDER_STATUSES = [
  'pending',
  'processing',
  'warehouse',
  'placed',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
];

const STATUS_BADGE_STYLES = {
  pending: 'border border-amber-300/40 bg-amber-400/20 text-amber-100',
  processing: 'border border-sky-300/40 bg-sky-400/20 text-sky-100',
  warehouse: 'border border-indigo-300/40 bg-indigo-400/20 text-indigo-100',
  placed: 'border border-blue-300/40 bg-blue-400/20 text-blue-100',
  shipped: 'border border-cyan-300/40 bg-cyan-400/20 text-cyan-100',
  delivered: 'border border-emerald-300/40 bg-emerald-400/20 text-emerald-100',
  cancelled: 'border border-rose-300/40 bg-rose-400/20 text-rose-100',
  returned: 'border border-zinc-300/40 bg-zinc-400/20 text-zinc-100',
};

const formatStatus = (value) => {
  if (!value) return 'Unknown';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatPrice = (value) => {
  const numberValue = Number(value || 0);
  return Number.isFinite(numberValue) ? numberValue.toFixed(2) : '0.00';
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(get_seller_order(orderId));
  }, [orderId, dispatch]);

  useEffect(() => {
    if (order && order.delivery_status) {
      setStatus(order.delivery_status);
    }
  }, [order]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const previousStatus = status;
    setStatus(newStatus);
    setLoading(true);

    try {
      const { data } = await api.put(
        `/seller/order-status/update/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      toast.success(data?.message || 'Order status updated successfully');
      await dispatch(get_seller_order(orderId));
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update order status');
      setStatus(order?.delivery_status || previousStatus);
    } finally {
      setLoading(false);
    }
  };

  const shippingName =
    typeof order?.shippingInfo === 'string'
      ? order.shippingInfo
      : order?.shippingInfo?.name || 'Customer';

  const shippingAddress =
    typeof order?.shippingInfo === 'object'
      ? [
          order?.shippingInfo?.address,
          order?.shippingInfo?.city,
          order?.shippingInfo?.province,
          order?.shippingInfo?.area,
        ]
          .filter(Boolean)
          .join(', ')
      : '';

  const deliveryBadgeClass = STATUS_BADGE_STYLES[status] || STATUS_BADGE_STYLES.pending;
  const paymentBadgeClass =
    order?.payment_status === 'paid'
      ? 'border border-emerald-300/40 bg-emerald-400/20 text-emerald-100'
      : 'border border-amber-300/40 bg-amber-400/20 text-amber-100';

  const products = order?.products || [];
  const totalItems = products.length;
  const totalQuantity = products.reduce((sum, product) => sum + Number(product?.quantity || 0), 0);

  return (
    <div className="px-2 lg:px-7 pt-5 pb-6">
      <div className="relative overflow-hidden rounded-2xl border border-violet-200/30 bg-gradient-to-br from-[#7a70ed] via-[#6a5fdf] to-[#584dd0] shadow-[0_30px_80px_rgba(49,39,133,0.48)]">
        <div className="pointer-events-none absolute -left-20 top-8 h-44 w-44 rounded-full bg-cyan-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -top-14 h-52 w-52 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative p-4 md:p-6 lg:p-7">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#f7f6ff]">
                Order Details
              </h2>
              <p className="max-w-2xl text-sm text-violet-100/90">
                Track fulfillment and review product details in one place with a cleaner, real-time
                order summary.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full border border-violet-100/35 bg-violet-200/20 px-3 py-1 text-[#f8f7ff]">
                  #{order?._id || 'N/A'}
                </span>
                <span className="rounded-full border border-violet-100/35 bg-violet-200/20 px-3 py-1 text-[#f8f7ff]">
                  {order?.date || 'Date unavailable'}
                </span>
              </div>
            </div>

            <div className="w-full rounded-xl border border-violet-100/35 bg-white/15 p-4 backdrop-blur-sm xl:w-[320px]">
              <p className="text-xs uppercase tracking-[0.18em] text-violet-100/80">Delivery Status</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${deliveryBadgeClass}`}>
                  {formatStatus(status)}
                </span>
                {loading && <span className="text-xs text-cyan-200">Updating...</span>}
              </div>

              <label className="mt-4 block text-xs uppercase tracking-[0.14em] text-violet-100/80">
                Update Status
              </label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="mt-2 w-full rounded-lg border border-violet-100/35 bg-[#5b58a5] px-4 py-2.5 text-sm text-[#f7f6ff] outline-none transition focus:border-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
              >
                {ORDER_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {formatStatus(item)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-violet-100/30 bg-white/12 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-100/80">Products</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7f6ff]">{totalItems}</p>
            </div>
            <div className="rounded-xl border border-violet-100/30 bg-white/12 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-100/80">Quantity</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7f6ff]">{totalQuantity}</p>
            </div>
            <div className="rounded-xl border border-violet-100/30 bg-white/12 p-3 col-span-2 md:col-span-1">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-100/80">Order Value</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7f6ff]">€ {formatPrice(order?.price)}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl border border-violet-100/30 bg-white/12 p-4 md:p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-100/85">
                Product Summary
              </h3>

              <div className="mt-4 space-y-3">
                {products.map((product, index) => (
                  <div
                    key={product?._id || `${product?.name}-${index}`}
                    className="group flex items-start gap-3 rounded-xl border border-violet-100/25 bg-[#7b74e8]/45 p-3 transition hover:border-cyan-200/45 hover:bg-[#7b74e8]/60"
                  >
                    <img
                      className="h-[64px] w-[64px] rounded-lg object-cover ring-1 ring-violet-100/35"
                      src={product?.images?.[0]}
                      alt={product?.name || 'Product image'}
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-base font-medium text-[#f7f6ff]">{product?.name}</h4>
                      <p className="mt-1 text-sm text-violet-100/90">
                        <span className="text-violet-200/95">Brand:</span> {product?.brand || 'N/A'}
                      </p>
                      <div className="mt-2 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-100">
                        Qty: {product?.quantity || 0}
                      </div>
                    </div>
                  </div>
                ))}

                {!products.length && (
                  <p className="rounded-lg border border-violet-100/25 bg-[#6d67da]/35 p-3 text-sm text-violet-100/90">
                    No products found for this order.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-violet-100/30 bg-white/12 p-4 md:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-100/85">Delivery</h3>
                <p className="mt-3 text-base font-semibold text-[#f7f6ff]">{shippingName}</p>
                {shippingAddress && <p className="mt-1 text-sm leading-6 text-violet-100/90">{shippingAddress}</p>}
              </div>

              <div className="rounded-2xl border border-violet-100/30 bg-white/12 p-4 md:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-100/85">Payment</h3>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentBadgeClass}`}>
                    {formatStatus(order?.payment_status)}
                  </span>
                  <span className="text-xl font-semibold text-[#f7f6ff]">€ {formatPrice(order?.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
