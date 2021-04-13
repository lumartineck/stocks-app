// array in local storage for registered stocks
let stocks = JSON.parse(localStorage.getItem('stocks')) || [];
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // get stocks
                if (url.endsWith('/stocks') && opts.method === 'GET') {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(stocks))});

                    return;
                }

                // Add stock
                if (url.endsWith('/stocks/') && opts.method === 'POST') {
                    // get new stock object from post body
                    let newStock = JSON.parse(opts.body);

                    // validation
                    let duplicatedStock = stocks.filter(stock => { return stock.id === newStock.id; }).length;
                    if (duplicatedStock) {
                        reject('Stock "' + newStock.id + '" is already taken');
                        return;
                    }

                    // save new stock
                    newStock.id = stocks.length ? Math.max(...stocks.map(stock => stock.id)) + 1 : 1;
                    stocks.push(newStock);
                    localStorage.setItem('stocks', JSON.stringify(stocks));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // Buy stock
                if (url.endsWith('/stocks/buy') && opts.method === 'POST') {

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // Sell stock
                if (url.endsWith('/stocks/sell') && opts.method === 'POST') {

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}