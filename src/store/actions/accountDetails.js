export const ADD_BASIC_INFO = 'ADD_BASIC_INFO';
export const ADD_ROOM_INFO = 'ADD_ROOM_INFO';
export const REMOVE_ROOM_INFO = 'REMOVE_ROOM_INFO';
export const UPDATE_ROOM_INFO = 'UPDATE_ROOM_INFO';
export const ADD_FACILITY_INFO = 'ADD_FACILITY_INFO'
export const ADD_AMENITIES = 'ADD_AMENITIES'
export const ADD_POLICIES = 'ADD_POLICIES'
export const ADD_ACCOUNT_DETAILS = 'ADD_ACCOUNT_DETAILS'


export const addBasicInfo = basicInfo => {
    return { type: ADD_BASIC_INFO, basicInfo: basicInfo };
};
export const addRoomInfo = roomInfo => {
    return { type: ADD_ROOM_INFO, roomInfo: roomInfo };
};
export const removeRoomInfo = key => {
    return { type: REMOVE_ROOM_INFO, key: key };
};
export const updateRoomInfo = roomInfo => {
    return { type: UPDATE_ROOM_INFO, roomInfo: roomInfo };
};
export const addFacilitiesInfo = facilityInfo => {
    return { type: ADD_FACILITY_INFO, facilityInfo };
};
export const addAmenities = selectedAmenities => {
    return { type: ADD_AMENITIES, selectedAmenities };
};
export const addPolicies = policies => {
    return { type: ADD_POLICIES, policies };
};
export const addAccountDetails = details => {
    return { type: ADD_ACCOUNT_DETAILS, details };
};
