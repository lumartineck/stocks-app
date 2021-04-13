import React from 'react';
import { connect } from 'react-redux';
import { stocksActions } from '../_actions';

class Stock extends React.Component {

    componentDidMount() {
        this.props.getStocks();
    }

    handleBuyStock(id) {
        return (e) => this.props.buyStock(id);
    }

    handleSellStock(id) {
        return (e) => this.props.sellStock(id);
    }

    render() {
        const { stocks } = this.props;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>All registered stocks:</h3>
                {stocks.loading && <em>Loading stocks...</em>}
                {stocks.error && <span className="text-danger">ERROR: {stocks.error}</span>}
                {stocks.items &&
                    <ul>
                        {stocks.items.map((stock, index) =>
                            <li key={stock.id}>
                                {stock.name + ' ' + stock.price}
                                {
                                    stock.buying ? <em> - Buying...</em>
                                    : stock.buyingError ? <span className="text-danger"> - ERROR: {stock.buyingError}</span>
                                    : <span> - <a onClick={this.handleBuyStock(stock.id)}>Buy</a></span>
                                }
                                {
                                    stock.selling ? <em> - Selling...</em>
                                    : stock.sellingError ? <span className="text-danger"> - ERROR: {stock.sellingError}</span>
                                    : <span> - <a onClick={this.handleSellStock(stock.id)}>Sell</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { stocks } = state;
    return { stocks };
}

const actionCreators = {
    getStocks: stocksActions.getAll,
    buyStock: stocksActions.buyStock,
    sellStock: stocksActions.sellStock
}

const connectedStock = connect(mapState, actionCreators)(Stock);
export { connectedStock as Stock };