import React,{Component} from 'react';

export class Counter extends Component{

    // Default state define in constructor 
    //state => counter - 0
    constructor()
    {
        super();
        this.state = {
            counter : 0,
            secondCounter: 100
        }

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.callReset = this.callReset.bind(this)


    }

    render() {
        return(
            <div className='counter'>
                <CounterButton incrementmethod={this.increment} decrementmethod={this.decrement}></CounterButton>
                <CounterButton by={10} incrementmethod={this.increment} decrementmethod={this.decrement}></CounterButton>
                <CounterButton by={5} incrementmethod={this.increment} decrementmethod={this.decrement}></CounterButton>
                <span> {this.state.counter}</span>
                <div><button onClick={this.callReset}> RESET </button></div>
            </div>
            )
        }
       
        callReset() {
            this.setState(
                {
                    counter: 0
                }
            )
        }
        increment(val) {
            // console.log("increased")
     
            this.setState(
                (prevState) =>
                {
                    return {counter: prevState.counter + val}
                }
            );
         }

         decrement(val) {
            // console.log("increased")
     
            this.setState(
                (prevState) =>
                {
                    return {counter: prevState.counter - val}
                }
            );
         }

}
export default class CounterButton extends Component{

  
    constructor()
    {
        super();
        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)

    }
   
    render() {

        return (
                <div>
                    <button onClick={() => this.props.incrementmethod(this.props.by)}>+{this.props.by}</button>
                    <button onClick={this.moveDown}>-{this.props.by}</button>
                    
                </div>
        );
    }

    moveUp() {
        this.props.incrementmethod(this.props.by);
     }

     moveDown() {
        this.props.decrementmethod(this.props.by);
     }
    

}

CounterButton.defaultProps = {
    by : 1
}