import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import hiddenchannel from '../img/nochannel.png';
import nochannel from '../img/noimage.png';
import {Button,Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Rating from '../components/ui/Rating';
export default class Channel extends Component {
    constructor(props) {
        super(props);
                       }

    static propTypes = {
        channelId: PropTypes.number.isRequired,
        programName: PropTypes.string.isRequired,
        channelImg: PropTypes.img,
        hiddenChannel: PropTypes.bool.isRequired,
        chosen: PropTypes.bool.isRequired,
        favorite: PropTypes.bool.isRequired,
                       };


    render() {
        return (
                <div    className={this.props.chosen ? 'menuItemStylefocus' : 'menuItemStyle'} onClick={this.props.onClick}>
                        <span className="span">{this.props.channelId}</span>
                        <img  width={40} height={40} src={this.props.hiddenChannel?hiddenchannel:nochannel} className="tvimg"/>
                        <span className="pname">
                            {this.props.programName}
                            <span className="pnameShadow"/>
                        </span>
                        {this.props.favorite ? <span className="pnameFav"><Icon className="small orange bookmark"/></span> : ''}
                        <Rating maxRate={5} rate={1} chosen={this.props.chosen}/>
                </div>
                )
             }
                                                }