export const nameChecking = (e) =>{
    const length = e.target.value.length > 2;
    if (length) {
        return true;
    } else {
        return false;
    }
}
export const emailChecking = (e) => {
    if (e.target.name === 'email') {
        const re = /\S+@\S+\.\S+/;
        return re.test(e.target.value);
    }
}
export const passwordChecking = (e) => {
    const length = e.target.value.length > 5;
    const hasNumber = /\d{1}/.test(e.target.value);
    if (length && hasNumber) {
        return true;
    } else {
        return false;
    }
}