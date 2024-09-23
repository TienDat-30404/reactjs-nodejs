export const handleChangeInput = (e, setState) => {
    const { name, value } = e.target;
    setState(prevInfo => ({
        ...prevInfo,
        [name]: value
    }));

};