export const AuthPath = {
  LOGIN: "Login",
  REGISTER: "Register",
  REGISTER_STAFF: "RegisterStaff",
  FORGOT_PASSWORD: "ForgotPassword",
  CHANGE_PASSWORD: "ChangePassword",
  VERIFY: "Verify",
};

export const TransportPath = {
  CREATE: "Create",
  GET_INFO: "GetInfo",
  UPDATE: "Update",
  ASSIGN_STAFF:"AssignStaff",
  GET_ASSIGN_STAFF:"GetAssignStaff",
  UPDATE_PRICE_TYPE:"UpdatePriceType",
  REMOVE_STAFF_TRANSPORT:"RemoveStaffTransport",
  GET_ALL_TRANSPORT_SUB:"GetAllTransportSub"
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
  GET_BY_ID: "GetById",
  GET_ORDER:"OrderByStatus"
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
  GET_ALL: "GetAll",
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
  CALC_PRICE_PACKAGE:"CalcPricePackage",
  GET_ORDER:"OrderByStatus"
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

export const AutomaticPath={
  AUTOMATIC_PACKAGE_TO_SUB:"AutomaticPackageToSub",
  AUTOMATIC_SUB_TO_PACKAGE:"AutomaticSubToPackage",
  AUTOMATIC_SUB_TO_SUB:"AutomaticSubToSub",
}

export const AdminPath = {
  APPROVE_MERCHANT: "ApproveMerchant",
  APPROVE_TRANSPORT: "ApproveTransport",
  REJECT_MERCHANT: "RejectMerchant",
  REJECT_TRANSPORT: "RejectTransport",
  CANCEL_MERCHANT: "CancelMerchant",
  CANCEL_TRANSPORT: "CancelMerchant",
  GET_MERCHANT_BY_STATUS: "GetMerchantByStatus",
  GET_TRANSPORT_BY_STATUS: "GetTransportByStatus",
  GET_TRANSPORT_BY_ADDRESS:"GetTransportByAddress",
  GET_TRANSPORT_BY_ADDRESS_CLIENT:"GetTransportByAddressClient"
};

export const CartPath={
  PAYMENT_CART:"PaymentCart",
  GET_MY_CART:"GetMyCart",
  ADD_PRODUCT_TO_CART:"AddProductToCart",
  DELETE_PRODUCT_FROM_CART:"DeleteProductFromCart",
  UPDATE_PRODUCT_FROM_CART:"UpdateProductFromCart"
}