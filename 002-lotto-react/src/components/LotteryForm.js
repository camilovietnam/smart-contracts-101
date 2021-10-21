import React, { Component } from 'react';

class LotteryForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            onFormSubmit: props.onFormSubmit,
            onBetChange: props.onBetChange,
            bet: '',
            status: props.status,
        }        
    }

    static getDerivedStateFromProps(props, state) {
        return {
            bet: props.bet,
            status: props.status,
        }
    }

    render = () => {
        return (
            <div>
                <form onSubmit={this.state.onFormSubmit} className='App-form'>
                <h4>
                    Try your luck! <span role="img" aria-label="emoji">👇👇👇</span>
                </h4>

                <input type="text"
                    placeholder="0Ξ"
                    onChange={ this.state.onBetChange }
                    value={ this.state.bet }>    
                </input>
                
                <button value="enter">Enter Lottery</button>
            </form>

            <p><b>Status</b>: {this.state.status}</p>
            </div>
        )
    }
}

export default LotteryForm;