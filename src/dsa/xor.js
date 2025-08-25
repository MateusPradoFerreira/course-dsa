function missingNumber(arr = []) {
    let x = 0;
    for (let i of arr) x ^= i;
    for (let i of Object.keys(arr)) x ^= Number(i) + 1;
    return x;
};

console.log(missingNumber([3,0,1]));