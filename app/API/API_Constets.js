// const HOST = process.env.APP_API_URL;
const HOST = 'https://bee.afpl.online';
const API = `/api/v1`;
const CONTEXT_PATH = `${HOST}${API}`;

// Home
export const GET_HERO_DEVICE_LIST = `${CONTEXT_PATH}/cms/exclusive_apple_services`
export const GET_MODELS_BY_CATEGORY = `${CONTEXT_PATH}/models_by_category_and_brand?category=`;
export const GET_ISSUES_GADGETS = `${CONTEXT_PATH}/issues_by_models?model=`
export const GET_ISSUES_MODEL = `${CONTEXT_PATH}/issues_by_models_detail?city=1&model=`;
export const GET_ALL_COUPONS = `${CONTEXT_PATH}/cms/coupons_by_cc?city=1&category=1`
export const VERIFY_COUPON = `${CONTEXT_PATH}/cms/verify_coupon?city=1&category=1&coupon=`
// USER & OTP
export const SEND_LOGIN_OTP = `${CONTEXT_PATH}/users/send_otp_landing`;
export const VERIFY_OTP = `${CONTEXT_PATH}/users/verify_otp_landing`;
export const GET_USER_PROFILE = `${CONTEXT_PATH}/users/my_profile`;
export const UPDATE_ADDRESS = `${CONTEXT_PATH}/users/my_addresses`;
export const CHECKPINCODE = `${CONTEXT_PATH}/serviceable_pincode`;
export const RESEND_OTP = `${CONTEXT_PATH}/users/resend_otp_landing`;

// Enquiry
export const GENERATE_ENQUIRY = `${CONTEXT_PATH}/users/enquiries`;
export const GET_ENQUIRY_DETAILS = `${CONTEXT_PATH}/users/enquiries?order=`
export const UPDATE_CART = `${CONTEXT_PATH}/users/my_cart`;
export const UPDATE_ENQUIRY = `${CONTEXT_PATH}/users/enquiries_issues`;
export const CREATE_ORDER = `${CONTEXT_PATH}/users/orders`
export const GET_ORDER_DETAILS = `${CONTEXT_PATH}/users/orders?order=`
export const ENQUIRY_GT = `${CONTEXT_PATH}/users/enquiries_gt`;

//Time
export const GET_TIMESLOTS = `${CONTEXT_PATH}/timeslots`;

// Google API
export const GOOGLE_MAPS_API_KEY = '***************************';
