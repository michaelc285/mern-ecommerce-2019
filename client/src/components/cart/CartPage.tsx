import React from "react";
import { connect } from "react-redux";
import { loadCart } from "../../context/actions/CartAction";

const CartPage = ({ loadCart, product, auth }: any) => {
  return (
    <div>
      <span>Hi i am shopping cart</span>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, { loadCart })(CartPage);
