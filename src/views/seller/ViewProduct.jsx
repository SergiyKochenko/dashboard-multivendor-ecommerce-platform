import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { get_product } from '../../store/Reducers/productReducer';

const ViewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.product);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(get_product(productId));
    }
  }, [dispatch, productId]);

  const formatPrice = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return value;
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
    }).format(parsed);
  };

  if (!product) {
    return (
      <div className="px-2 lg:px-7 pt-5">
        <h1 className="text-slate-900 font-semibold text-xl mb-4">Product Details</h1>
        <div className="w-full rounded-2xl border border-slate-200 bg-gradient-to-br from-[#f8f9ff] to-[#eef2ff] p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-40 rounded bg-slate-200" />
            <div className="h-56 rounded-xl bg-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 rounded-lg bg-slate-200" />
              <div className="h-20 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const heroImage = images[0] || '';
  const hasDiscount = Number(product.discount) > 0;

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-slate-900 font-semibold text-xl">Product Details</h1>
          <p className="text-sm text-slate-500 mt-1">Review listing quality before publishing updates.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/seller/dashboard/edit-product/${product._id}`}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all"
          >
            Edit Product
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all"
          >
            Back
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#f8f9ff] via-[#eef2ff] to-[#f6f7ff] shadow-sm">
        <div className="absolute -top-20 -left-20 h-52 w-52 rounded-full bg-[#9aa5ff]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#8ee3d7]/20 blur-3xl" />

        <div className="relative p-4 md:p-6 lg:p-8">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <div className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm overflow-hidden">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={product.name || 'Product image'}
                    className="w-full h-[260px] md:h-[340px] object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-[260px] md:h-[340px] rounded-xl border-2 border-dashed border-slate-300 grid place-items-center text-slate-500 text-sm">
                    No image available
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.slice(1).map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                      <img
                        src={img}
                        alt={`${product.name || 'product'}-thumb-${idx + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Name</p>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1 break-words">{product.name}</h2>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      hasDiscount ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {hasDiscount ? `${product.discount}% off` : 'No discount'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                    {product.category || 'Uncategorized'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold">
                    {product.brand || 'No brand'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                    {`${product.stock || 0} in stock`}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-400 font-medium">Price</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{formatPrice(product.price)}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-400 font-medium">Shop</p>
                  <p className="text-base font-semibold text-slate-900 mt-1 break-words">
                    {product.shopName || 'Unknown shop'}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-400 font-medium">Category</p>
                  <p className="text-base font-semibold text-slate-900 mt-1">{product.category || '-'}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-400 font-medium">Brand</p>
                  <p className="text-base font-semibold text-slate-900 mt-1">{product.brand || '-'}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-medium mb-2">Description</p>
                <p className="text-sm leading-7 text-slate-700 whitespace-pre-line">
                  {product.description || 'No description provided yet.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
