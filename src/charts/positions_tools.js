export default function sortByOpenInterest(array, direction) {
    let key = direction == 1 ? 'long' : 'short';

    return array.sort(function (a, b) {
        var x = a[key]['totalOI'];
        var y = b[key]['totalOI'];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};