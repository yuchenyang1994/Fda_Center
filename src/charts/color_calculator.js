
export default (startColor,endColor,step)=>{
    let rgb_to_hex = (r, g, b)=> {
    let hex = ((r << 16 | (g << 8) | b)).toString(16);
    return "#" + new Array(Math.abs(hex.length - 7)).join('0') + hex
    };

    let hex_to_rgb = (hex) => {
    let rgb = [];
    for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + hex.slice(i, i + 2)));

        }
        return rgb;
    };
    let sColor = hex_to_rgb(startColor),
        eColor = hex_to_rgb(endColor);
    let rStep = (eColor[0] - sColor[0]) / step,
        gStep = (eColor[1] - sColor[1]) / step,
        bStep = (eColor[2] - sColor[2]) / step;
    let gradientColorArr = [];
    for (let i = 0;i<step;i++) {
        gradientColorArr.push(rgb_to_hex(
            parseInt(rStep*i+sColor[0]),
            parseInt(gStep*i+sColor[1]),
            parseInt(bStep*i+sColor[2])));
    }
    return gradientColorArr;
}