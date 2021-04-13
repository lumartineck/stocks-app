import { stocksConstants } from '../_constants';
import { stocksService } from '../_services';
import { alertActions } from './';

export const stocksActions = {
    getAll,
    buyStock,
    sellStock
};

function getAll() {
    return dispatch => {
        dispatch(request());

        stocksService.getAll()
            .then(
                stocks => dispatch(success(stocks)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: stocksConstants.GETALL_REQUEST } }
    function success(stocks) { return { type: stocksConstants.GETALL_SUCCESS, stocks } }
    function failure(error) { return { type: stocksConstants.GETALL_FAILURE, error } }
}

function buyStock(stock) {
    return dispatch => {
        dispatch(request(stock));

        stocksService.buy(stock)
            .then(
                stock => { 
                    dispatch(success());
                    dispatch(alertActions.success('Buy stock successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(stock) { return { type: stocksConstants.BUY_REQUEST, stock } }
    function success(stock) { return { type: stocksConstants.BUY_SUCCESS, stock } }
    function failure(error) { return { type: stocksConstants.BUY_FAILURE, error } }
}

function sellStock(stock) {
    return dispatch => {
        dispatch(request(stock));

        stocksService.sell(stock)
            .then(
                stock => { 
                    dispatch(success());
                    dispatch(alertActions.success('Sell stock successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(stock) { return { type: stocksConstants.SELL_REQUEST, stock } }
    function success(stock) { return { type: stocksConstants.SELL_SUCCESS, stock } }
    function failure(error) { return { type: stocksConstants.SELL_FAILURE, error } }
}