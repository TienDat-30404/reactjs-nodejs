import PropTypes from "prop-types";
import React from "react";
// import { Bag } from "./Bag";
// import { Buy } from "./Buy";
// import { Document } from "./Document";
// import { Iconly } from "./Iconly";
// import { IconlyLightArrow } from "./IconlyLightArrow";
// import { Star } from "./Star";
// import image from "./image.png";
import "./style.css";

export const Detail_cnpm = ({ dark, image = "https://cf.shopee.vn/file/634cee8c6d4020356e047a6a87b89583" }) => {
  return (
    <div className="product-UIHUT container">
      <img className="image" alt="Image" src={dark === "on" ? image : image} />
      <div className={`info-UIHUT ${dark}`}>
        <div className="div">
          <p className="text-wrapper">Coffee Beans - Espresso Arabica and Robusta Beans</p>
          <div className="info">
            <div className="div">
              <div className="reviews-UIHUT">
                <div className="iconly-light-star-wrapper">
                  {/* <Star className="instance-node" color="#FFB700" /> */}
                </div>
                <div className="text-wrapper-2">(3.5) 1100 reviews</div>
              </div>
              <div className="div-2">
                <div className="text-wrapper-3">Size/Weight</div>
                <div className="weight">
                  <div className="data-UIHUT">
                    <div className="gram">
                      <div className="text-wrapper-4">500g</div>
                      {/* <IconlyLightArrow className={`${dark === "on" ? "class" : "class-2"}`} /> */}
                    </div>
                    <div className="rectangle" />
                    <div className="gram-2">
                      <div className="text-wrapper-5">Gram</div>
                      {/* <IconlyLightArrow className={`${dark === "on" ? "class" : "class-3"}`} /> */}
                    </div>
                  </div>
                </div>
                <div className="div-3">
                  <div className="small-UIHUT">
                    <div className="text-wrapper-6">Small</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-6">Medium</div>
                  </div>
                  <div className="small-UIHUT-2">
                    <div className="text-wrapper-6">Large</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="element">
              <div className="compare">
                {/* <Document className="instance-node" color={dark === "on" ? "#EEEEEE" : "#1A162E"} /> */}
                <div className="text-wrapper-7">Compare</div>
              </div>
              <div className="div-3">
                {/* <Buy className="instance-node" color={dark === "on" ? "#EEEEEE" : "#1A162E"} /> */}
                <div className="delivery">
                  <div className="text-wrapper-8">Delivery</div>
                  <p className="p">From $6 for 1-3 days</p>
                </div>
              </div>
              <div className="div-3">
                {/* <Bag className="instance-node" color={dark === "on" ? "#EEEEEE" : "#1A162E"} /> */}
                <div className="delivery">
                  <div className="text-wrapper-9">Pickup</div>
                  <p className="text-wrapper-10">Out of 2 store, today</p>
                </div>
              </div>
              <div className="add-to-cart">
                <div className="div-2">
                  <div className="div-2">
                    <div className="frame">
                      <div className="text-wrapper-11">$500.00</div>
                      <div className="frame-2">
                        <div className="text-wrapper-12">10%</div>
                      </div>
                    </div>
                    <div className="text-wrapper-13">$540.00</div>
                  </div>
                  <div className="action">
                    <button className="button">
                      <div className="text-wrapper-14">Add to cart</div>
                    </button>
                    <div className="love">
                      {/* <Iconly className="instance-node" color={dark === "on" ? "#EEEEEE" : "#1A162E"} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Detail_cnpm.propTypes = {
  dark: PropTypes.oneOf(["off", "on"]),
  image: PropTypes.string,
};