import axios from "axios";
import {uri} from "../../constants/Addresses";

const postHotelCoverImage = async(hotelid, uri) => {
    const formData = new FormData()
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    formData.append('hotel1', {
        uri: uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    }, `image/${fileType}`)
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    const res = await axios.post('/hotels/'+hotelid+'/uploadimages', formData, config)
    return res
}

const getHotelCoverURI = async(hotelId) => {
    const images = await axios.request({
        url: '/hotels/'+hotelId+'/getimages',
        method: 'get'
    })
    return images.data[0]
}

export {
    postHotelCoverImage,
    getHotelCoverURI
}
