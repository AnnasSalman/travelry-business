import {
    ADD_BASIC_INFO,
    ADD_ROOM_INFO,
    REMOVE_ROOM_INFO,
    UPDATE_ROOM_INFO,
    ADD_FACILITY_INFO,
    ADD_AMENITIES,
    ADD_POLICIES,
    ADD_ACCOUNT_DETAILS
} from '../actions/accountDetails';

const initialState = {
    basicInfo:{},
    roomInfo:[],
    facilityInfo:{},
    amenities: {},
    policies: {}
};

export default (state= initialState, action) => {
    switch(action.type){
        case ADD_BASIC_INFO:
            return {
                ...state,
                basicInfo: action.basicInfo
            }
        case ADD_ROOM_INFO:
            return {
                ...state,
                roomInfo: [...state.roomInfo, action.roomInfo]
            }
        case REMOVE_ROOM_INFO:
            const roomsAfterRemove = []
            state.roomInfo.forEach((room)=>{
                if(action.key!==room.key){
                    roomsAfterRemove.push(room)
                }
            })
            return {
                ...state,
                roomInfo: roomsAfterRemove
            }
        case UPDATE_ROOM_INFO:
            const roomsAfterUpdate = []
            state.roomInfo.forEach((room)=>{
                if(action.roomInfo.key!==room.key){
                    roomsAfterUpdate.push(room)
                }
            })
            return {
                ...state,
                roomInfo: [...roomsAfterUpdate, action.roomInfo]
            }
        case ADD_FACILITY_INFO:
            return{
                ...state,
                facilityInfo: action.facilityInfo
            }
        case ADD_AMENITIES:
            return{
                ...state,
                amenities: action.selectedAmenities
            }
        case ADD_POLICIES:
            return{
                ...state,
                policies: action.policies
            }
        case  ADD_ACCOUNT_DETAILS:
            return{
                ...action.details
            }

    }
    return state
}
