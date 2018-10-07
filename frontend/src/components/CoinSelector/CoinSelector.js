import React, {Component} from 'react';

//styles
import './CoinSelector.css';

class CoinSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {coins, amount, selectedCoins, selectAll} = this.props;

        //var isAboveZero = (amount > 0);

        var selectMessage = (selectedCoins.length > 0) ? 'Deselect All' : 'Select All';

        return(
            <div className='coin-options'>
                        {coins.map(coin => {
                            return (<div key={coin.id}><img src={coin.src} className={coin.isSelected ? 'coin-img selected' : 'coin-img unselected'} onClick={() => selectedCoins(coin.id)} /></div>);
                        })}
                <button className='coinselect-button' onClick={() => selectAll()}>{selectMessage}</button>
                <p><span className='cost'>
                {
                '$' + amount
                }
                </span></p>
            </div>
        );
    }

}

export default CoinSelector;