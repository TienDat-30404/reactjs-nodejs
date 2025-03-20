import createDefaultSize from './initializeSize.js';
import createDefaultRole from './initializeRole.js';
import createDefaultAccount from './initializeAccount.js';
import createDefaultCategory from './initializeCategory.js';
import createDefaultProduct from './initializeProduct.js';
import createDefaultUser from './initializeUser.js';
import createDefaultSupplier from './initializeSupplier.js';
import createDefaultDetailSupplier from './initializeDetailSupplier.js';
import createDefaultReceipt from './initializeReceipt.js';
import createDefaultDetailReceipt from './initializeDetailReceipt.js';
import createDefaultProductAttribute from './initializeProductAttribute.js';
import createDefaultPaymentMethod from './initializePaymentMethod.js';
import createDefaultStatus from './initializeStatus.js';
import createDefaultRoleDetail from './initializeRoleDetail.js';
const initializeData = async () => {
  try {
    await createDefaultSize();
    await createDefaultRole();
    await createDefaultRoleDetail();
    await createDefaultCategory();
    await createDefaultProduct();
    await createDefaultProductAttribute();
    await createDefaultAccount();
    await createDefaultUser();
    await createDefaultSupplier();
    await createDefaultDetailSupplier();
    await createDefaultReceipt();
    await createDefaultDetailReceipt();
    await createDefaultPaymentMethod();
    await createDefaultStatus();

    console.log('All default data created successfully!');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

export default initializeData;
