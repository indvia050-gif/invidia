import api from './api';

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

// Asset related APIs
export const searchImage = async ({ query, k }: { query: string; k: number }): Promise<ApiResponse<any[]>> => {
    try {
        const response = await api.get(`/image-search/search?query=${query}&k=${k}`);
        if (Array.isArray(response?.data?.results)) {
            return { success: true, data: response.data.results };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const searchElements = async ({ search_phrase }: { search_phrase: string }): Promise<ApiResponse<any[]>> => {
    try {
        const response = await api.get(`/element-search/search?search_phrase=${search_phrase}`);
        if (Array.isArray(response?.data?.results)) {
            return { success: true, data: response.data.results };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const generateAiImage = async ({ prompt }: { prompt: string }): Promise<ApiResponse<any[]>> => {
    try {
        const response = await api.post('/generate-ai-image', { prompt });
        if (response?.data?.status_code === 200 || response?.data?.status_code === 201) {
            return { success: true, data: response.data.images || [] };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

// Coin related APIs
export const getCoins = async (): Promise<ApiResponse<any[]>> => {
    try {
        const response = await api.get('https://api.coinpaprika.com/v1/coins');
        if (response?.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const getCoinsDetails = async (user_input: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('https://n8nnode.bestworks.cloud/webhook/crypto', user_input);
        if (response?.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const addUserSearch = async (user_input: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('user/user-search-manage/add', user_input);
        if (response?.data?.status_code === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const checkAvailableSearch = async (): Promise<ApiResponse<any>> => {
    try {
        const response = await api.get('user/user/search-available');
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

// Search History APIs
export const getSearchHistory = async ({ week = 0 }: { week?: number }): Promise<ApiResponse<any>> => {
    try {
        const response = await api.get(`user/user-search-manage/sidebar?days=7&week=${week}&limit=10`);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const getSearchHistoryDetails = async (user_input: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post(`user/user-search-manage/details`, user_input);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data?.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

// Auth APIs
export const registerCustomer = async (userData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('auth/register', userData);
        if (response?.data?.status_code === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const otpVerifyCustomer = async (otpData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('auth/verify-otp', otpData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const resendOtpCustomer = async (resendData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('auth/resend-otp', resendData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const loginCustomer = async (loginData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('auth/login', loginData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const detectIccid = async (iccidData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('auth/detect-iccid', iccidData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

// Plan APIs
export const getPlans = async (): Promise<ApiResponse<any>> => {
    try {
        const response = await api.get('plans');
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const createSubscriptions = async (subscriptionData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('subscriptions/create', subscriptionData);
        if (response?.data?.status_code === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const completeSubscriptions = async (completionData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('subscriptions/complete', completionData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

// Profile APIs
export const getProfile = async (): Promise<ApiResponse<any>> => {
    try {
        const response = await api.get('user/profile');
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const checkSubscription = async (): Promise<ApiResponse<any>> => {
    try {
        const response = await api.get('user/subscription/check');
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const cancelSubscription = async (): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('user/subscription/cancel');
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const uploadPhoto = async (formData: FormData): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('user/user-profile/change-avatar', formData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const changePassword = async (passwordData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('user/change-password', passwordData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

// Pwgns APIs (assuming these are for some service)
export const activeEsn = async (esnData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('pwgns/active-esn', esnData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const addWfc = async (wfcData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('pwgns/add-wfc', wfcData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const updateE911 = async (e911Data: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('pwgns/update-e911', e911Data);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};

export const purchasePlan = async (planData: any): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('pwgns/purchase-plan', planData);
        if (response?.data?.status_code === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: response?.data?.errors || 'Something went wrong.' };
        }
    } catch (error: any) {
        return { success: false, error: error.message || 'Network error' };
    }
};