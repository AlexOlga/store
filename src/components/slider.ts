//import noUiSlider from 'nouislider';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css';
export const maxTime = 677;
export const minTime = 11;
const sliderTime = document.getElementById('slider-time') as noUiSlider.target;
noUiSlider.create(sliderTime, {
    start: [11, 677],
    tooltips: true,
    connect: true,
    step: 1,
    range: {
        'min': 11,
        'max': 677
    },
    format: {
        to: function (value: number) {
            return Math.round(value);
        },
        from: function (value) {
            return Math.round(Number(value));
        }
    }

});

export const maxRange = 117;
export const minRange = 2;
const slideRange = document.getElementById('slider-range') as noUiSlider.target;
noUiSlider.create(slideRange, {
    start: [2, 117],
    step: 1,
    connect: true,
    tooltips: true,
    range: {
        'min': 2,
        'max': 117
    },
    format: {
        to: function (value: number) {
            return Math.round(value);
        },
        from: function (value) {
            return Math.round(Number(value));
        }
    }
});
