import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducer';
import { add_product, messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: '',
        parPage: '',
        page: '',
      })
    );
  }, []);

  const [state, setState] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    brand: '',
    stock: '',
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };
  // console.log(images)
  // console.log(imageShow)

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: '',
      });
      setImageShow([]);
      setImages([]);
      setCategory('');
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);

    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const add = (e) => {
    e.preventDefault();
    const shopName = userInfo?.shopInfo?.shopName?.trim();
    if (!shopName) {
      toast.error('Please complete your profile shop name before adding products');
      return;
    }

    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('description', state.description);
    formData.append('price', state.price);
    formData.append('stock', state.stock);
    formData.append('discount', state.discount);
    formData.append('brand', state.brand);
    formData.append('shopName', shopName);
    formData.append('category', category);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    // console.log(state)
    dispatch(add_product(formData));
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  const inputClass =
    'px-4 py-2.5 outline-none bg-white border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition';
  const labelClass = 'text-sm font-medium text-slate-600';

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-slate-900 font-semibold text-xl">Add Product</h1>
          <p className="text-sm text-slate-500 mt-1">Create a listing with polished details and product media.</p>
        </div>
        <Link
          to="/seller/dashboard/products"
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all w-fit"
        >
          All Products
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#f8f9ff] via-[#eef2ff] to-[#f6f7ff] shadow-sm">
        <div className="absolute -top-20 -left-20 h-52 w-52 rounded-full bg-[#9aa5ff]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#8ee3d7]/20 blur-3xl" />

        <div className="relative p-4 md:p-6 lg:p-8">
          <form onSubmit={add} className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Product Information</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className={labelClass}>
                    Product Name
                  </label>
                  <input
                    className={inputClass}
                    onChange={inputHandle}
                    value={state.name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Product Name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="brand" className={labelClass}>
                    Product Brand
                  </label>
                  <input
                    className={inputClass}
                    onChange={inputHandle}
                    value={state.brand}
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Brand Name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5 relative">
                  <label htmlFor="category" className={labelClass}>
                    Category
                  </label>
                  <input
                    readOnly
                    onClick={() => setCateShow(!cateShow)}
                    className={`${inputClass} cursor-pointer`}
                    onChange={inputHandle}
                    value={category}
                    type="text"
                    id="category"
                    placeholder="--select category--"
                  />
                  <div
                    className={`absolute top-[104%] left-0 z-20 w-full origin-top rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-150 ${cateShow ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} `}
                  >
                    <div className="w-full p-3 border-b border-slate-100">
                      <input
                        value={searchValue}
                        onChange={categorySearch}
                        className="px-3 py-2 w-full outline-none bg-white border border-slate-200 rounded-md text-slate-700 placeholder:text-slate-400"
                        type="text"
                        placeholder="Search category"
                      />
                    </div>
                    <div className="flex justify-start items-start flex-col max-h-[220px] overflow-y-auto overflow-x-hidden bg-white">
                      {allCategory.map((c, i) => (
                        <span
                          key={i}
                          className={`block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 w-full cursor-pointer ${category === c.name ? 'bg-indigo-50 text-indigo-700 font-medium' : ''}`}
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue('');
                            setAllCategory(categorys);
                          }}
                        >
                          {c.name}{' '}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="stock" className={labelClass}>
                    Product Stock
                  </label>
                  <input
                    className={inputClass}
                    onChange={inputHandle}
                    value={state.stock}
                    type="text"
                    name="stock"
                    id="stock"
                    placeholder="Stock"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="price" className={labelClass}>
                    Price
                  </label>
                  <input
                    className={inputClass}
                    onChange={inputHandle}
                    value={state.price}
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="discount" className={labelClass}>
                    Discount
                  </label>
                  <input
                    className={inputClass}
                    onChange={inputHandle}
                    value={state.discount}
                    type="number"
                    name="discount"
                    id="discount"
                    placeholder="Discount by %"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  className={`${inputClass} min-h-[120px] resize-y`}
                  onChange={inputHandle}
                  value={state.description}
                  name="description"
                  id="description"
                  placeholder="Description"
                  cols="10"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Product Images</h2>
              <p className="text-sm text-slate-500 mb-4">Upload multiple product photos. You can change or remove them anytime.</p>

              <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full mb-1">
              {imageShow.map((img, i) => (
                <div key={`${img.url}-${i}`} className="h-[180px] relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm group">
                  <label htmlFor={i} className="block h-full w-full cursor-pointer overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-900/85 hover:bg-slate-900 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              ))}

              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed border-slate-300 hover:border-indigo-400 rounded-xl w-full text-slate-500 bg-slate-50 hover:bg-indigo-50 transition-colors"
                htmlFor="image"
              >
                <span>
                  <IoMdImages />
                </span>
                <span>Select Image </span>
              </label>
              <input className="hidden" onChange={imageHandle} multiple type="file" id="image" />
            </div>
            </div>

            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-slate-900 w-full sm:w-[280px] hover:bg-slate-800 text-white rounded-lg px-7 py-2.5 disabled:opacity-70"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
