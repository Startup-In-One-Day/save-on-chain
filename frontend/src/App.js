import React, { Component } from 'react'
import './App.css'
import DragDrop from './components/Inputs/DragDrop/DragDrop'
import Description from './components/Description/Description.js'
import Header from './components/Header/Header.js'
// import {StripeProvider} from 'react-stripe-elements'
// import MyStoreCheckout from './components/stripe/MyStoreCheckout'
// import EasyCheckoutForm from './components/stripe/EasyCheckout'
import CoinSelector from './components/CoinSelector/CoinSelector'
import Inputs from './components/Inputs/Inputs'
import Payment from './components/stripe/Payment'
// import STRIPE_PUBLISHABLE from './constants/stripe'

// functional imports for the API Calls
import axios from 'axios'
import TESTNET_SERVER_URL from './constants/testnetserver'

class App extends Component {
  // we need the constructor to have props
  // we need this to pass data from inputs to
  // payment as you need to use the nearest common
  // relative. in this case APP
  constructor (props) {
    super(props)

    // our two values being passed down
    this.state = {
      coins: [
        {
          id: 0,
          name: 'Bitcoin',
          symbol: 'BTC',
          cost: 2.00,
          src: './images/bitcoin.png',
          isSelected: false
        },
        {
          id: 1,
          name: 'Ethereum',
          symbol: 'ETH',
          cost: 1.00,
          src: './images/ethereum.png',
          isSelected: false
        },
        {
          id: 2,
          name: 'EOS',
          symbol: 'EOS',
          // cost: 0.01,
          cost: 0,
          src: './images/eos.png',
          isSelected: false
        },
        {
          id: 3,
          name: 'DogeCoin',
          symbol: 'DOGE',
          cost: 69.69,
          src: './images/dogecoin.png',
          isSelected: false
        },
        {
          id: 4,
          name: 'TestNet',
          symbol: 'TEST',
          cost: 0.00,
          src: './images/testnet.png',
          isSelected: true
        }
      ],
      selectedCoins: 4,
      // amount: 0
      hash: '',
      message: '',
      amount: 0
    }

    // bind dem functions
    this.handleHashChange = this.handleHashChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.burnOnChain = this.burnOnChain.bind(this)

    // bind the functions to the this keyword
    this.selectCoin = this.selectCoin.bind(this)
  }

  // select a coin
  selectCoin (id) {
    console.log('id', id)
    var {coins, selectedCoins, amount} = this.state
    coins[selectedCoins].isSelected = false
    // console.log(selectedCoins.length)
    coins[id].isSelected = true
    this.setState({selectedCoins: coins[id].id, amount: coins[id].cost})
    this.handleAmountChange(coins[id].cost)
    // //does the coin exist?
    // var index = selectedCoins.indexOf(coins[id])
    // //if yes remove from our selected coins
    // //else add
    // if(index > -1){
    //     var newAmount = amount - coins[id].cost
    //     coins[id].isSelected = false
    //     selectedCoins.splice(index, 1)
    //     this.setState({amount: newAmount})
    //     this.props.handleAmountChange(newAmount)
    // } else {
    //     selectedCoins.push(coins[id])
    //     var newAmount = amount + coins[id].cost
    //     coins[id].isSelected = true
    //     this.setState({amount: newAmount})
    //     this.props.handleAmountChange(newAmount)
    // }
  }

  // select/deselect all the coins
  selectAll () {
    const {selectedCoins, coins} = this.state
    // are any coins selected?
    if (selectedCoins.length > 0) {
      // empty the array, reduce the amount
      this.setState({selectedCoins: [], amount: 0})
      // loop through the coins and make them all deselected
      coins.forEach(coin => {
        coin.isSelected = false
      })
    } else {
      // create a variable to hold the total amount
      var newAmount = 0
      // add all the coins to the selectedcoins
      coins.forEach(coin => {
        selectedCoins.push(coin)
        // sum up the cost
        newAmount += coin.cost
        // deselect all
        coin.isSelected = true
      })
      this.setState({amount: newAmount})
      this.handleAmountChange(newAmount)
    }
  }

  handleHashChange (hash) {
    this.setState({hash})
  }
  handleMessageChange (message) {
    this.setState({hash: message})
  }
  handleAmountChange (amount) {
    this.setState({amount})
  }

  // this dirty little hack, Tom has added the button to burn onto the test net here
  // thus we are going to do the HTTP POST here as well. Thanks TOM
  burnOnChain () {
    const {hash} = this.state
    console.log('front end hash: ' + hash)

    // for ETH testnet
    if (this.state.selectedCoins === 4) {
      axios.post(`${TESTNET_SERVER_URL}/putOnChain`, {
      message: hash
    })
      .then(function (responce) {
        console.log('Successfully burnt onto the testnet')
        let new_url = 'https://rinkeby.etherscan.io/tx/' + responce.data
        console.log(responce)
        window.location = new_url
      })
      .catch(error => {
        console.log('Error')
      })
    }
    // for EOS
    else if (this.state.selectedCoins === 2) {
      axios.post(`${TESTNET_SERVER_URL}/putOnEOS`, {
      message: hash
    })
      .then(function (responce) {
        console.log('Successfully burnt onto EOS')
        let new_url = `https://eosflare.io/account/eosvanforfun`
        console.log(responce)
        window.location = new_url
      })
      .catch(error => {
        console.log('Error')
      })
    }
  }

  render () {
    return (
      <main className='App'>
        <Header title='Save-on-Chain' usp='Add Your Proof to the Public Record' />
        <Inputs handleHashChange={this.handleHashChange} handleMessageChange={this.handleMessageChange} />
        <Description/>
        <CoinSelector handleAmountChange={this.handleAmountChange}
                      coins={this.state.coins}
                      selectedCoins={this.selectCoin}
                      selectAll={this.selectAll}
                      amount={this.state.amount}
        />
        {
          this.state.amount > 0 &&
          <Payment
            amount={this.state.amount}
            hash={this.state.hash}
            message={this.state.message}
          />
        }
        {
          this.state.amount === 0 &&
            <button onClick={() => this.burnOnChain()}>Burn it in!</button>
        }
      </main>
    )
  }
}

export default App
