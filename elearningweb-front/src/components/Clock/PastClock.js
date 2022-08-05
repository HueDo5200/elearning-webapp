import './PastClock.css';
import React, { Component } from "react";
class PastClock extends Component {
    constructor(props) {
       super(props);
       this.state = {
           days: 0
       }
    }
    componentWillMount() {
        this.getTimeUntil(this.props.time);
    }
    componentDidMount() {
        setInterval(() => this.getTimeUntil(this.props.time));
    }
    leading0(num) {
        return num < 10 ? "0" + num : num;
    }

    getTimeUntil(time) {

            const t = Date.parse(new Date()) - parseInt(time);
           
            if(t < 0) {
                this.setState({days: 0});
            } else {
                const days = Math.floor(t / (1000 * 60 * 60 * 24));
                this.setState({days});
            }
    }
    render() {
        return (   
                <div className = 'pClock-days'>{this.leading0(this.state.days) == "00" ? 'Today' : this.leading0(this.state.days) + ' days ago'}</div>
        )
    }
}
export default PastClock;