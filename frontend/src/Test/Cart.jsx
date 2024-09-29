import React from "react";
// import { Checkout } from "./Checkout";
// import { GiftCard } from "./GiftCard";
// import { IconlyLightArrowWrapper } from "./IconlyLightArrowWrapper";
// import { ProductUihut } from "./ProductUihut";
import "./style.css";

export const Cart_cnpm = () => {
  return (
    <div className="m-ain">
      <div className="frame">
        <div className="div-5">
          {/* <ProductUihut className="design-component-instance-node" dark="off" rectangle="image.png" /> */}
          <div className="stock-2" />
          {/* <ProductUihut
            className="design-component-instance-node"
            dark="off"
            darkOffWrapperText="2"
            rectangle="rectangle-73-2.png"
            text="Lavazza Coffee Blends - Try the Italian Espresso"
            text1="$106.00"
            text2="$53.00 |"
          /> */}
          <div className="stock-2" />
          {/* <ProductUihut
            className="design-component-instance-node"
            dark="off"
            darkOffWrapperText="1"
            rectangle="rectangle-73-3.png"
            text="Qualità Oro Mountain Grown - Espresso Coffee Beans"
            text1="$38.65"
            text2="$38.65 |"
          /> */}
          <div className="stock-2" />
          <div className="bottom-UIHUT">
            <div className="frame-2">
              {/* <IconlyLightArrowWrapper className="iconly-light-arrow-left-2" /> */}
              <div className="text-wrapper-11">Continue Shopping</div>
            </div>
            <div className="div-5">
              <div className="info-UIHUT-3">
                <div className="subtotal">
                  <div className="text-wrapper-11">Subtotal:</div>
                  <div className="text-wrapper-12">$191.65</div>
                </div>
                <div className="shipping">
                  <div className="text-wrapper-11">Shipping:</div>
                  <div className="text-wrapper-12">$10:00</div>
                </div>
              </div>
              <div className="stock-3" />
              <div className="subtotal">
                <div className="text-wrapper-13">Total:</div>
                <div className="text-wrapper-14">$201.65</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-5">
        {/* <Checkout className="design-component-instance-node" dark="off" text="$191.65" text1="$201.65" /> */}
        {/* <GiftCard className="design-component-instance-node" dark="off" gift="image.svg" /> */}
      </div>
    </div>
  );
};
