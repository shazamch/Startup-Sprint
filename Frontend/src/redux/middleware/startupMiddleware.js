import { apiGet, apiPost, apiPut } from '../../config/axiosIntance';
import { showErrorAlert, showSuccessAlert } from '../actions/alertActions';

const startupMiddleware = {
    GetAllStartups: () => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await apiGet("/protected/startups/");
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

    GetStartupsByUserID: (UserID) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await apiGet(`/protected/startups/user/${UserID}`);
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

    AddStartup: (postdata) => {
        return async (dispatch, getState) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await apiPost("/protected/startups/", postdata);
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


export default startupMiddleware;
