const splitArray = (array, part) => {
    if (!array.length) {
        return [];
    }
    if (!part || part <= 1) {
        return [array];
    }

    const input = [...array].reverse();
    const breakPoint = Math.ceil(input.length / part);
    let i = 0;
    let output = [];
    while (i < part) {
        output.push(input.splice(-1 * breakPoint).reverse());
        i++;
    }

    return output;
}

export {splitArray};