const { VITE_REACT_APP_API_URL, VITE_REACT_APP_TOKEN_NAME } = import.meta.env;

const settings = {
	apiUrl: VITE_REACT_APP_API_URL || 'http://localhost:5173',
	participationsURL: '/api/participations/',
	tokenName: VITE_REACT_APP_TOKEN_NAME
};

export default settings;
