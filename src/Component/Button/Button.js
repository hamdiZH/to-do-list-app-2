import React, {Component} from 'react';
import './Styles.css'

class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button className={this.props.isPurple? 'add-btn': 'delete-btn'}
                    onClick={this.props.handleClick} >
                {this.props.text}
            </button>
        );
    }
}

export default Button;