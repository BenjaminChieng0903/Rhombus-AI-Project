import axiosApi from './../../axios/app'
const TypeConvertApi = async(file:File | null)=>{
    if (!file) {
        alert("Please select a file first!");
        return;
    }
    const formData = new FormData();
    formData.append('file', file);

    await axiosApi.post('/dataprocessing/typeconvert/',formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        alert("upload successfully");
        console.log(res)

    }).catch((err)=>{
        alert("Oops, something went wrong, try again");
    })
}

export default TypeConvertApi;