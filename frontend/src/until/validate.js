const validateSearchAdvanced = (priceFrom, priceTo ) => {
    const errors = {priceFrom : '', priceTo : ''}
    if (isNaN(priceFrom) && priceFrom != "") {
        errors.priceFrom = "Giá nhập vào ko hợp lệ"
    }
    if (isNaN(priceTo) && priceTo != "") {
        errors.priceTo = "Giá nhập vào ko hơp lệ"
    }
    if (Number(priceFrom) > Number(priceTo)) {
        errors.priceTo = "Giá tiền này phải lớn hơn ban đầu"
    }
    if (Number(priceFrom) && !priceTo) {
        errors.priceTo = "Vui lòng nhập giá tiền "
    }
    if (Number(priceTo) && !priceFrom) {
        errors.priceFrom = "Vui lòng nhập giá tiền "
    }
    return errors
}

const createQueryStringForSearch = (nameSearch, idCategory, priceFrom, priceTo) =>
{
    const params = new URLSearchParams({})
    if (nameSearch != "") {
        params.append('find', nameSearch)
    }
    if (idCategory != 0) {
        params.append('idCategory', idCategory)
    }
    if (priceFrom != "") {
        params.append('priceFrom', priceFrom)
    }
    if (priceTo != "") {
        params.append('priceTo', priceTo)
    }
    return params.toString()
}



export {validateSearchAdvanced, createQueryStringForSearch}