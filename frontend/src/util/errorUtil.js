export const extractErrorMessages = (error)=>{
    if(!error) return null;

    if(error.response?.data){
        const data = error.response.data;

        // handle Zod validation errors (array format)

        if(data.error && Array.isArray(data.error)){
            return data.error.map(err=> err.message).join(',');
        }

        // handle single error message
        if(data.message){
            return data.message;
        }

        // handle error field
        // if(data.error ){
        //     return data.error;
        // }
    }

    // handle network error
    if(error.request && !error.response){
        return "Network error, Please check your connection";
    }

    // fall back to general error
    if(error.message){
        return error.message;
    }

    // handle other types of errors
    return "Something went wrong. please try again later"
}