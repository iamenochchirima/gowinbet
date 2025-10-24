import appConfig from '@/configs/app.config';
import axios from 'axios';

const AxiosBase = axios.create({
    baseURL: appConfig.baseUrl,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AxiosBase;
