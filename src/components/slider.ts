//import noUiSlider from 'nouislider';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css';
const sliderTime = document.getElementById('slider-time') as noUiSlider.target;
noUiSlider.create(sliderTime, {
    start: [10, 677],
    tooltips: true,
    connect: true,
    step: 1,
    range: {
        'min': 10,
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
const timeValues: Array<HTMLInputElement> = [
    <HTMLInputElement>document.getElementById('slider-time-value-lower'),
    <HTMLInputElement>document.getElementById('slider-time-value-upper')
];

if (sliderTime.noUiSlider !== undefined) {
    sliderTime.noUiSlider.on('update', function (values, handle) {
        timeValues[handle].value = `${values[handle]}`;
    });
}
sliderTime.addEventListener('change', () => { console.log(sliderTime.getAnimations()) })
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
const rangeValues: Array<HTMLInputElement> = [
    <HTMLInputElement>document.getElementById('slider-range-value-lower'),
    <HTMLInputElement>document.getElementById('slider-range-value-upper')
];
if (slideRange.noUiSlider !== undefined) {
    slideRange.noUiSlider.on('update', function (values, handle) {
        rangeValues[handle].value = `${values[handle]}`;
    });
}
const resetButton = document.querySelector('.reset');
resetButton?.addEventListener("click", () => {
    if (sliderTime.noUiSlider !== undefined) sliderTime.noUiSlider.reset();
    if (slideRange.noUiSlider !== undefined) slideRange.noUiSlider.reset();
});
