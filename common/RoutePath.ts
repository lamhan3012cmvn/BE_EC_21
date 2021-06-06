export const AuthPath = {
  LOGIN: "Login",
  REGISTER: "Register",
  FORGOT_PASSWORD: "ForgotPassword",
  CHANGE_PASSWORD: "ChangePassword",
  VERIFY: "Verify",
};

export const TransportPath = {
  CREATE: "Create",
  GET_INFO: "GetInfo",
  UPDATE: "Update",
  ASSIGN_STAFF:"AssignStaff"
  
};

export const TransportSubPath = {
  CREATE: "Create",
  GET_INFO: "GetInfo",
  UPDATE: "Update",
  CHANGE_STATUS:"ChangeStatus"
};

export const TransportSubCityPath = {
  CREATE: "Create",
  GET_INFO: "GetInfo",
  UPDATE: "Update",
  CHANGE_STATUS:"ChangeStatus"
};
export const DevicePath = {
  CREATE: "Create",
  DELETE: "Delete",
};

export const MerchantPath = {
  CREATE: "Create",
  UPDATE: "Update",
  GET_INFO: "GetInfo",
};

export const CategoryPath = {
  CREATE: "Create",
  UPDATE: "Update",
  GET_INFO: "GetAll",
  DELETE: "Delete",
};

export const GroupProductPath = {
  CREATE: "Create",
  UPDATE: "Update",
  GET_INFO: "GetAll",
  DELETE: "Delete",
};

export const ProductPath = {
  CREATE: "Create",
  UPDATE: "Update",
  GET_BY_MERCHANT: "GetProductByMerchant",
  GET_BY_GROUP_PRODUCT: "GetProductByGroup",
  FILTER_ALL: "FilterAll",
  FILTER_BY_CATEGORY: "FilterByCategory",
  DELETE: "Delete",
};

export const PackagePath = {
  CREATE: "Create",
  UPDATE: "Update",
  GET_PACKAGE_BY_STATUS:"GetPackageByStatus",
  GET_PACKAGE_SUB_BY_STATUS:"GetPackageSubByStatus",
  GET_PACKAGE_DETAIL_BY_STATUS: "GetPackageDetailByStatus",
  CONFIRM_PACKAGE:"ConfirmPackage",
  CONFIRM_PACKAGES:"ConfirmPackages"
};

export const UserPath = {
  UPDATE: "Update",
  GET_INFO: "GetInfo",
  FAVORITE: "Favorite",
  GET_FAVORITES: "GetFavorites",
  ADD_ADDRESS: "AddAddress",
  UPDATE_ADDRESS: "UpdateAddress",
  DELETE_ADDRESS: "DeleteAddress",
  BUY_POINT: "BuyPoint",
};

export const PaymentPath = {
  PAYPAL_SUCCESS: "Paypal/Success",
  PAYPAL_CANCEL: "Paypal/Cancel", 
  VNPAY: "VNPay",
  VNPAY_RETURN: "VNPayReturn",
};

export const CouponPath = {
  CREATE: "Create",
  UPDATE: "Update",
  GET_INFO: "GetAll",
  DELETE: "Delete",
};

export const Automatic={
  AUTOMATIC_PACKAGE_TO_SUB:"AutomaticPackageToSub",
  AUTOMATIC_SUB_TO_PACKAGE:"AutomaticSubToPackage",
}