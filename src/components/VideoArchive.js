import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
export default class VideoArchive extends Component {
constructor(props)      {
    super(props);
                        }
    static propTypes = {
        //itemChosen: this.props.number
        visible:PropTypes.bool.isRequired
    };
    render() {
        return (
                <div className='homeDiv'/>
                )
            }
}