import React, { Component } from "react";
import Slider from "react-slick";
import earphone from "../../images/carousel1_headphone.jpg";
import shoe from "../../images/shoe.jpg";
import sunglass from "../../images/sunglass.jpg";
import "../../style/Slider.css";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 3000,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        };
        return (
            <div className="Slider">
                <Slider {...settings}>
                    <div>
                        <img src={earphone} alt="earphone" />
                    </div>
                    <div>
                        <img src={shoe} alt="earphone" />

                    </div>
                    <div>
                        <img src={sunglass} alt="earphone" />

                    </div>
                </Slider>
            </div>
        );
    }
}
