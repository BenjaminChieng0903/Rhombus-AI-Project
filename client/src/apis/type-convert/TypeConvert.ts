import axiosApi from './../../axios/app'
import { ApiResponse } from 'src/type/ApiResponse';
const TypeConvertApi = async(file:File | null):Promise<ApiResponse | null>=>{

    if (!file) {
        alert("Please select a file first!");
        return null;
    }
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosApi.post('/dataprocessing/typeconvert/',formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        alert("upload successfully");
        console.log(res)
        return res.data.data;

    }).catch((err)=>{
        alert("Oops, something went wrong, try again");
        return null;
    })
    return response;
}

export default TypeConvertApi;