export const getError = (error) => { //takes an error object
    return (
        // if error.response exists and error.response.data.message exists
        error.response && error.response.data.message
        ? error.response.data.message // return error.response.data.message
        : error.message // else return error.message
    )
}