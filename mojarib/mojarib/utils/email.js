const reformatEmail = (email = '') => {
    if (!email) {
        return '';
    }
    return email.trim().replace(' ', '+');
};

export {reformatEmail};
