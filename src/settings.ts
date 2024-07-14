const settings = {
	apiUrl: import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5173',
	participationsURL: '/api/participations/',
	tokenName: import.meta.env.VITE_REACT_APP_TOKEN_NAME,
};

export default settings;
