import Product from '../model/ProductModel.js';
import Category from '../model/CategoryModel.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import Supplier from '../model/SupplierModel.js';
import RoleDetail from '../model/RoleDetail.js'

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

const validateNameSupplier = async(name) => {
  const existNameSupplier = await Supplier.findOne({name})
  return !existNameSupplier
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
  return req.query.change === 'true';
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

// validate Name Category 
const isCheckExistCategory = async (name) => {
  const existNameCategory = await Category.findOne({ name }) 
  return !existNameCategory
}

export  {
  validateEmail, hashPassword, validateNameProduct,
  validateNameProductWhenUpdate, isCheckExistNameCategory, conditionLoginMiddleware, shouldUseValidation,
  conditionChagePasswordMiddleware, shouldUseChangePassword, isCheckExistCategory, validateNameSupplier
}
