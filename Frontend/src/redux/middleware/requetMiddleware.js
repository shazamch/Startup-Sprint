import { apiGet, apiPost, apiPut } from '../../config/axiosIntance';
import { showErrorAlert, showSuccessAlert } from '../actions/alertActions';

const requestMiddleware = {
    GetAllRequests: () => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await apiGet("/protected/posts/");
                    if (response.success) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                } catch (e) {
                    console.log('Error', e);
                    reject(e);
                }
            });
        };
    },
    
    RequestResponse: (postdata) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await apiPost("/protected/posts/", postdata);
                    if (response.success) {
                        // dispatch(showSuccessAlert("Participant Created successfully"));
                        resolve(response);
                    } else {
                        reject(response);
                    }
                } catch (e) {
                    console.log('Error', e);
                    reject(e);
                }
            });
        };
    },

    SendResponse: (postdata) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await apiPost("/protected/posts/", postdata);
                    if (response.success) {
                        // dispatch(showSuccessAlert("Participant Created successfully"));
                        resolve(response);
                    } else {
                        reject(response);
                    }
                } catch (e) {
                    console.log('Error', e);
                    reject(e);
                }
            });
        };
    },
};


export default requestMiddleware;
