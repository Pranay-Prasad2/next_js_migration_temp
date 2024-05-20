import { GET_ENQUIRY_DETAILS, GET_USER_PROFILE, UPDATE_ADDRESS, UPDATE_CART } from "@/app/API/API_Constets";

const cookies = typeof document !== 'undefined' ? document.cookie : null;
const tokenMatch = cookies ? cookies.match(/token=([^;]*)/) : null;
const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
const enquiry_id_Match = cookies ? cookies.match(/enquiry_id_encrypted=([^;]*)/) : null;
const enquiry_id_encrypted = enquiry_id_Match ? decodeURIComponent(enquiry_id_Match[1]) : null;

export const AuthToken = () => {
    return token;
}

export const fetchDropDown = async (url = '') => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(url, 'Not found');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log("Unable to fetch List: ", error);
        return {};
    }
}

export const FetchEnquiryDetails = async () => {
    try {
        const response = await fetch(GET_ENQUIRY_DETAILS + enquiry_id_encrypted + "", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("fetch enquiry error");
        }
        const responseJson = await response.json();
        if (responseJson.success === false) {
            console.log("reponseJson Error");
            return [];
        }
        return responseJson.data;

    } catch (error) {
        console.log("Fetch Error: ", error);
        return [];
    }
}


export const FetchUserProfile = async () => {
    try {
        const response = await fetch(GET_USER_PROFILE, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        });
        if (!response.ok) {
            console.log(GET_USER_PROFILE);
            throw new Error("fetch profile error");
        }
        const responseJson = await response.json();
        if (responseJson.success === false) {
            console.log("reponseJson Error");
            return [];
        }
        return responseJson.data;

    } catch (error) {
        console.log("Unable to fetch userprofile: ", error);
        return [];
    }
}

export const ClearCart = async () => {
    try {
        const response = await fetch(UPDATE_CART, {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error("Clear Cart Response Error");
        }
        const responseJson = await response.json();
        if (responseJson.success === false) {
            console.log("Unable to Clear Cart");
            return;
        }

    } catch (error) {
        console.log("Unable to Clear Cart", error);
    }
}

export const GetUserAddress = async () => {
    try {
        const response = await fetch(UPDATE_ADDRESS, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Fetch address Response Error");
        }
        const responseJson = await response.json();
        if (responseJson.success === false) {
            console.log("Unable to fetch address");
            return [];
        }
        return responseJson.data;

    } catch (error) {
        console.log("Unable to fetch Address: ", error);
    }
}

export const CheckPhoneNumber = (phoneNumber) => {
    // Remove any non-numeric characters from the input
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Check if the numeric phone number is 10 digits long and starts with 7, 8, or 9
    const isValid = /^[789]\d{9}$/.test(numericPhoneNumber);

    return isValid;
}