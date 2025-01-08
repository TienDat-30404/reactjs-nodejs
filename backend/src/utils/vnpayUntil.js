// backend/utils/vnpayUtils.js
import crypto from 'crypto';
import { VNPAY_HASH_SECRET } from '../config/vnpayConfig';


// Hàm tạo chữ ký cho VNPAY
function createSecureHash(params) {
  const sortedKeys = Object.keys(params).sort();
  const queryString = sortedKeys.map(key => `${key}=${params[key]}`).join('&');
  const hashData = queryString + '&' + `vnp_SecureHashType=SHA256&vnp_SecureHash=${crypto.createHmac('sha256', VNPAY_HASH_SECRET).update(queryString).digest('hex')}`;
  return hashData;
}

export{ createSecureHash };
