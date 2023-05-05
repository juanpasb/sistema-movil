import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'sistema-android',
    webDir: 'dist',
    bundledWebRuntime: false,
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
    server: {
        url: 'http://192.168.0.8:5173',
        cleartext: true
    }
};

export default config;
