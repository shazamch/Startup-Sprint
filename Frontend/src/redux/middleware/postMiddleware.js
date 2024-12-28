import { apiGet, apiPost, apiPut } from '../../config/axiosIntance';
import { showErrorAlert, showSuccessAlert } from '../actions/alertActions';

const postMiddleware = {
    GetAllPosts: () => {
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

    GetPostsByUserID: (UserID) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await apiGet(`/protected/posts/user/${UserID}`);
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
    
    AddPost: (postdata) => {
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


export default postMiddleware;
