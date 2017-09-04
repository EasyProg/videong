import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
export default class ParentalControl extends Component {
    constructor(props) {
        super(props);
                       }
    render() {
            return (
                <div className="divInputPassword">
                    <input className="inputPassword" placeholder="Current password" type="password" required />
                    <input className="inputPassword" placeholder="New password"     type="password" required />
                    <button className="saveButton">Save all</button>
                </div>
            )
    }
}