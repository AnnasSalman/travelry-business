import Constants from "expo-constants";

const { manifest } = Constants;

export const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
export const hotelRoomImagesURI = uri +'/hotels/room/images/'
export const deleteHotelRoomImagesURI = uri + '/hotels/room/deleteimage/'
