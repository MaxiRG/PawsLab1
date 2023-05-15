const request = (url, method, body, config) => {

    let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };
    const configuration = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: Object.keys(config).length === 0 ? headers : config.headers,
    };
    

    console.log(configuration)
// insert your used port in http://localhost:num
    return fetch('http://localhost:8080' + url, configuration)
    .then((response) => {
        if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.startsWith('application/json')) {
            return response.json();
            } else {
            return response.arrayBuffer();
            }
        } else {
            // Handle error response
            if (response.headers.get('Content-Type').startsWith('application/json')) {
            return response.json().then((error) => {
                throw new Error(error.message || 'Unexpected server error');
            });
            } else {
            throw new Error('Unexpected server error');
            }
        }
        })
        .catch((error) => {
        throw error;
        });
    }

export const get = (url, config = {}) => request(url, "GET", null, config);
export const getWithBody = (url, body, config = {}) => request(url, "GET", body, config);
export const post = (url, body, config = {}) => request(url, "POST", body, config);
export const put = (url, body, config = {}) => request(url, "PUT", body, config);
export const del = (url, config = {}) => request(url, "DELETE", null, config);