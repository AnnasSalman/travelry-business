import axios from "axios";

const updateCoordinates = async(hotelId, geometry) => {
    const status = await axios.request({
        url: '/hotels/'+hotelId+'/updatehotellocation',
        method: 'post',
        data: {
            geometry
        }
    })
    return status.status
}

export {
    updateCoordinates
}
