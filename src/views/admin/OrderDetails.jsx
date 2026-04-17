import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  admin_order_status_update,
  get_admin_order,
  messageClear,
} from '../../store/Reducers/OrderReducer';
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
  const [status, setStatus] = useState('');
  const { order, errorMessage, successMessage } = useSelector((state) => state.order);

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [orderId, dispatch]);

  const status_update = (e) => {
    dispatch(admin_order_status_update({ orderId, info: { status: e.target.value } }));
    setStatus(e.target.value);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const products = order?.products || [];
  const suborders = order?.suborder || [];
  const totalItems = products.length;
  const totalQuantity = products.reduce((sum, product) => sum + Number(product?.quantity || 0), 0);
  const shippingAddress = [
    order?.shippingInfo?.address,
    order?.shippingInfo?.city,
    order?.shippingInfo?.province,
    order?.shippingInfo?.area,
  ]
    .filter(Boolean)
    .join(', ');

  const deliveryBadgeClass = STATUS_BADGE_STYLES[status] || STATUS_BADGE_STYLES.pending;
  const paymentBadgeClass =
    order?.payment_status === 'paid'
      ? 'border border-emerald-300/40 bg-emerald-400/20 text-emerald-100'
      : 'border border-amber-300/40 bg-amber-400/20 text-amber-100';

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
                Track fulfillment and monitor split seller orders from one admin dashboard view.
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
              </div>

              <label className="mt-4 block text-xs uppercase tracking-[0.14em] text-violet-100/80">
                Update Status
              </label>
              <select
                onChange={status_update}
                value={status}
                className="mt-2 w-full rounded-lg border border-violet-100/35 bg-[#5b58a5] px-4 py-2.5 text-sm text-[#f7f6ff] outline-none transition focus:border-cyan-200"
              >
                {ORDER_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {formatStatus(item)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-violet-100/30 bg-white/12 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-100/80">Products</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7f6ff]">{totalItems}</p>
            </div>
            <div className="rounded-xl border border-violet-100/30 bg-white/12 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-100/80">Quantity</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7f6ff]">{totalQuantity}</p>
            </div>
            <div className="rounded-xl border border-violet-100/30 bg-white/12 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-100/80">Seller Orders</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7f6ff]">{suborders.length}</p>
            </div>
            <div className="rounded-xl border border-violet-100/30 bg-white/12 p-3 col-span-2 md:col-span-1">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-100/80">Order Value</p>
              <p className="mt-2 text-2xl font-semibold text-[#f7f6ff]">€ {formatPrice(order?.price)}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_1fr]">
            <div className="space-y-6">
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

              <div className="rounded-2xl border border-violet-100/30 bg-white/12 p-4 md:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-100/85">
                  Seller Suborders
                </h3>

                <div className="mt-4 space-y-3">
                  {suborders.map((suborder, suborderIndex) => {
                    const suborderStatusClass =
                      STATUS_BADGE_STYLES[suborder?.delivery_status] || STATUS_BADGE_STYLES.pending;

                    return (
                      <div
                        key={suborder?._id || `suborder-${suborderIndex}`}
                        className="rounded-xl border border-violet-100/25 bg-[#7b74e8]/40 p-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-[#f7f6ff]">
                            Seller {suborderIndex + 1} Order
                          </h4>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${suborderStatusClass}`}
                          >
                            {formatStatus(suborder?.delivery_status)}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          {suborder?.products?.map((product, productIndex) => (
                            <div
                              key={product?._id || `${suborderIndex}-${productIndex}`}
                              className="flex items-start gap-3 rounded-lg border border-violet-100/20 bg-[#6f69dd]/45 p-2.5"
                            >
                              <img
                                className="h-[52px] w-[52px] rounded-md object-cover"
                                src={product?.images?.[0]}
                                alt={product?.name || 'Product image'}
                              />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-[#f7f6ff]">{product?.name}</p>
                                <p className="text-xs text-violet-100/90">Brand: {product?.brand || 'N/A'}</p>
                                <p className="text-xs text-violet-100/90">
                                  Quantity: {product?.quantity || 0}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {!suborders.length && (
                    <p className="rounded-lg border border-violet-100/25 bg-[#6d67da]/35 p-3 text-sm text-violet-100/90">
                      No seller suborders found for this order.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-violet-100/30 bg-white/12 p-4 md:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-100/85">
                  Delivery
                </h3>
                <p className="mt-3 text-base font-semibold text-[#f7f6ff]">
                  {order?.shippingInfo?.name || 'Customer'}
                </p>
                {shippingAddress && <p className="mt-1 text-sm leading-6 text-violet-100/90">{shippingAddress}</p>}
              </div>

              <div className="rounded-2xl border border-violet-100/30 bg-white/12 p-4 md:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-100/85">
                  Payment
                </h3>
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
