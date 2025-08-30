function toBinary(n = 1): any {
    if (!n || n < 1) return 0;
    let bin = "";
    while (n > 1) {
        bin += n % 2;
        n = (n/2) | 0;
    };
    return (bin + (n % 2)).split("").reverse().join("");
};

function bitManipulation(n = 0) {
    return toBinary(n).split("").filter((val: any) => Number(val) === 1).length;
};

console.log(bitManipulation(11));
console.log(bitManipulation(128));
console.log(bitManipulation(2147483645));