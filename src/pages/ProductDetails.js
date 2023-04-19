import React, { useEffect, useState } from "react";
import LayoutMaster from "../layouts/LayoutMaster";
import Banner_area from "../components/Banner_area";
import { Navigate, resolvePath, useNavigate, useParams } from "react-router-dom";
import CartModel from "../models/CartModel";
import ProductModel from "../models/ProductModel";
import { SET_CART } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
function ProductDetails(props) {
  const image = "http://127.0.0.1:8000/public/assets/product/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const carts = useSelector((state) => state.cart);
  const formattedPrice =
    product?.price?.toLocaleString("vi-VN") || "Price not available";
  useEffect(() => {
    ProductModel.find(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  const handleAddToCart = () => {
    const cart = {
      id: id,
    };
    CartModel.addtocart(cart)
    .then((res) => {
      navigate("/Cart");
    });
  };
  return (
    <div>
      <LayoutMaster>
        <>
          <Banner_area />
          {loading ? (
            "Loading"
          ) : (
            <>
              <div className="product_image_area">
                <div className="container">
                  <div className="row s_product_inner">
                    <div className="col-lg-6">
                      <div className="s_Product_carousel">
                        <div className="single-prd-item">
                          <img
                            className="img-fluid"
                            src={`${product.image}`}
                            alt=""
                          />
                          <label>Mô tả: </label>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: product.description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                      <div className="s_product_text">
                        <h3> Tên: {product.name}</h3>
                        <h2> Giá : {product.price} VND</h2>
                        <ul className="list">
                          <li>
                            <a className="active">
                              <span>Thể loại </span> :{" "}
                              {product.category.name ?? ""}
                            </a>
                          </li>
                        </ul>

                        <label>Số lượng: {product.quantity} Chiếc </label>
                        <br />
                        <div className="card_area d-flex align-items-center">
                          <button
                            className="primary-btn"
                            onClick={handleAddToCart}
                          >
                            Add to Cart
                          </button>
                          <a className="icon_btn" href="#">
                            <i className="lnr lnr-diamond"></i>
                          </a>
                          <a className="icon_btn" href="#">
                            <i className="lnr lnr-heart"></i>
                          </a>
                        </div>

                        {/* <div className="card_area d-flex align-items-center">
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </LayoutMaster>
    </div>
  );
}

export default ProductDetails;
