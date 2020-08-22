import Constants from "expo-constants";

const { manifest } = Constants;

export const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
export const hotelRoomImagesURI = uri +'/hotels/room/images/'
export const deleteHotelRoomImagesURI = uri + '/hotels/room/deleteimage/'
export const getCalendarData = '/bookings/hotel/5f2dee4f37d2a654ecfaacf1/month/8/year/2020'
