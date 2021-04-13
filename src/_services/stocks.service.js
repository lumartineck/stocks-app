
export const stocksService = {
    getAll,
    buy,
    sell
};

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${process.env.REACT_APP_URL}/stocks`, requestOptions).then(handleResponse);
}

function buy(stock) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${process.env.REACT_APP_URL}/stocks/buy/${stock.id}`, requestOptions).then(handleResponse);
}

function sell(stock) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${process.env.REACT_APP_URL}/stocks/sell/${stock.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}