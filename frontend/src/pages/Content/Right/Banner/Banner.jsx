import React from 'react'
import Slider from "react-slick";

const Banner = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className='bg-white rounded-2'>
            <Slider {...settings}>
                <div className='d-flex align-items-center'>
                    <img className='m-3 rounded-3' width="47.5%" height="290px" src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/c8/5d/0b/fef1e097d6c8b59ebb9441397adc8f6d.jpg.webp" alt="" />
                    <img className='rounded-3' width="47.5%" height="290px" src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/0a/37/cf/73c61ab42598c1598ead329108cf2a10.png.webp" alt="" />
                </div>
                <div className='d-flex align-items-center'>
                    <img className='m-3 rounded-3' width="47.5%" height="290px" src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/72/dd/58/61b2cc25867fbbe3f061f9a2dd771555.png.webp" alt="" />
                    <img className='rounded-3' width="47.5%" height="290px" src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/a9/14/c8/be2ed1df8fb6c31d7c3c21f152715f62.jpg.webp" alt="" />
                </div>
                <div className='d-flex align-items-center'>
                    <img className='me-3 rounded-3' width="47.5%" height="290px" src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/26/5a/dc/5d8c8a147907ca33de291b2f8a2a02fd.jpg.webp" alt="" />
                    <img className='rounded-3' width="47.5%" height="290px" src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/ab/dd/0c/fb8ecadb252ade8ae5e3aebc555d51e3.png.webp" alt="" />
                </div>

            </Slider>
        </div>
    );
}

export default Banner
