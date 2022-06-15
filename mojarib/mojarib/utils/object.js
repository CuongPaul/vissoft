const isEmpty = (input = {}) => {
    return !Object.keys(input).length;
};

const removeItems = (source = {}, items = []) => {
    let input = {...source};
    for (const item of items) {
        const index = Object.keys(input).indexOf(item);
        if (index > -1) {
            delete input[item];
        }
    }
    return input;
};

export { isEmpty, removeItems };
