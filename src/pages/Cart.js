import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutMaster from "../layouts/LayoutMaster";
import Banner_cart from "../components/Banner_cart";
import CartModel from "../models/CartModel";
import { useDispatch } from "react-redux";
function Cart(props) {
  const image = "http://127.0.0.1:8000/public/assets/product/";
  const [products, setProducts] = useState([]);
  const totalAll = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  useEffect(() => {
    CartModel.getAll()
      .then((res) => {
        setProducts(res);
        // console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleQuantityChange(productId, newQuantity) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  }
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (isConfirmed) {

    CartModel.remove(id)
      .then((res) => {
        // Tìm sản phẩm trong state products để xóa
        const updatedProducts = products.filter
        ((product) => product.id !== id);
        // Cập nhật danh sách sản phẩm
        alert('ok. Đã xóa rồi nha !!')
        setProducts(updatedProducts);
      })
      .catch((err) => {
        console.log(err);
        alert("Đã có lỗi xảy ra");
      });
    }
  };
  
  
  return (
    <LayoutMaster>
      <>
        <Banner_cart />
        <section className="cart_area">
          <div className="container">
            <div className="cart_inner">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh </th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền </th>
                      <th>xóa sản phẩm </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>
                          <img
                            className="mini-img"
                            src={`${product.image}`}
                            alt="img"
                          />
                        </td>
                        <td>{product.price.toLocaleString()}vnd </td>
                        {/* <td>{product.quantity}</td> */}
                        <td>
                          <div className="quantity">
                            {/* <button
                              className="minus"
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  product.quantity - 1
                                )
                              }
                            >
                              -
                            </button> */}
                            <input
                              type="number"
                              name="qty"
                              id={`quantity-${product.id}`}
                              value={product.quantity}
                              min="1"
                              onChange={(e) =>
                                handleQuantityChange(product.id, e.target.value)
                              }
                            />
                            {/* <button
                              className="plus"
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  product.quantity + 1
                                )
                              }
                            >
                            
                            </button> */}
                          </div>
                        </td>
                        <td>
                          {(product.quantity * product.price).toLocaleString()}
                          vnd
                        </td>

                        {/* <button type="submit" className="btn btn-primary mb-2">
                          bay màu
                        </button> */}
                         <button id="button2" onClick={ () => handleDelete(product.id)}>xóa</button>
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <h5>Tổng tiền </h5>
                      </td>
                      <td>
                        <h5> {totalAll.toLocaleString()}vnd </h5>
                      </td>
                    </tr>

                    <tr className="out_button_area">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="checkout_btn_inner d-flex align-items-center">
                          <a className="gray_btn" href="/shop">
                            Tiếp tục mua sắm
                          </a>
                          <a className="primary-btn" href="/Login">
                            Đặt hàng
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </>
    </LayoutMaster>
  );
}

export default Cart;
