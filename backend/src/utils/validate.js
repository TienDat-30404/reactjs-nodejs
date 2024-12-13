const Product = require('../model/ProductModel')
const Category = require('../model/CategoryModel')
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
// Check email 
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// validate password


const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

// validate Name Product
const validateNameProduct = async (name) => {
  const existNameProduct = await Product.findOne({ name })
  return !existNameProduct
}

// validate Price Product 
const validatePriceProduct = (price) => {
  const isCheckTypeOfPrice = Number(price)
  return isCheckTypeOfPrice
}

// valitdate TypeOf Quantity Product
const validateTypeQuantityProduct = (quantity) => {
  const isCheckTypeOfQuantity = Number.isInteger(quantity)
  return isCheckTypeOfQuantity
}


// validate Name Product When handle update
const validateNameProductWhenUpdate = async (id, name) => {
  const countNameProduct = await Product.countDocuments({ name })
  const isCheckNameProduct = await Product.findOne({ _id: id })
  return countNameProduct == 1 && (name != isCheckNameProduct.name)
}

// validate name category
const isCheckExistNameCategory = async (name) => {
  const existNameCategory = await Category.findOne({ name })
  return !existNameCategory
}

const conditionLoginMiddleware = (condition, middleware) => {
  return (req, res, next) => {
    if (condition(req)) {
      return middleware(req, res, next);
    } else {
      return next();
    }
  };
};

const shouldUseValidation = (req) => {
  return req.query.validate_login === 'true';
};

const shouldUseChangePassword = (req) => {
  return req.query.change=== 'true';
};


const conditionChagePasswordMiddleware = (condition, middleware) => {
  return (req, res, next) => {
    if (condition(req)) {
      return middleware(req, res, next);
    } else {
      return next();
    }
  };
};

module.exports = {
  validateEmail, hashPassword, validateNameProduct, validatePriceProduct, validateTypeQuantityProduct,
  validateNameProductWhenUpdate, isCheckExistNameCategory, conditionLoginMiddleware, shouldUseValidation,
  conditionChagePasswordMiddleware, shouldUseChangePassword
}
