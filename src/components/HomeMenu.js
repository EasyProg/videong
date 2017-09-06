import React, {Component,PropTypes} from 'react';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import baby from '../img/smiling-baby.png';
import settings from '../img/settings.png';
import arch from '../img/play.png';
import LoginDiv from '../components/LoginDiv';
import Settings from '../components/Settings';
import ParentalControl from '../components/ParentalControl';
import VideoArchive from '../components/VideoArchive';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class HomeMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            itemChosen:null
        };
        this.handleItem = this.handleItem.bind(this);
    };
    handleItem(num) {
        let c = num;
        this.state.itemChosen===c?c = null: c = num;
        this.setState (
            {
                itemChosen:c
            }
        )
    };
    ConditionalRendering (item) {
        console.log(this.state.itemChosen);

        switch (item)          {
            case 1:
                       return  (
                <VideoArchive key={item}/>
                                );
            case 2:
                       return  (
                <ParentalControl key={item}/>
            );
            case 3:    return  (
                <Settings key={item}/>
            );
            default: return <div/>
                                }
                                }

    render() {
        return (
            <div>
            <div className="homeButton" onClick={(e)=>this.setState({visible:!this.state.visible})}>
            <Icon className="big inverted home"/>
            </div>
            <div className={this.state.visible?'homeDiv':'homeDivNone'}>
                <LoginDiv userName="Hatori Hanzo"/>
                <hr/>
                <div className={this.state.itemChosen!==1?"menuItemStyle":"menuItemStylefocus"} onClick={(e)=>this.handleItem(1)}>
                <span><img src={arch} width="35" height="35" className="imgStyle"/></span>Video archive</div>
                <div className={this.state.itemChosen!==2?"menuItemStyle":"menuItemStylefocus"} onClick={(e)=>this.handleItem(2)}>
                <img src={baby} width="35" height="35" className="imgStyle"/>Parental control</div>
                <ReactCSSTransitionGroup transitionName="settings_transition">
                    {(this.state.itemChosen===2)?this.ConditionalRendering(this.state.itemChosen):null}
                </ReactCSSTransitionGroup>
                <div className={this.state.itemChosen!==3?"menuItemStyle":"menuItemStylefocus"} onClick={(e)=>this.handleItem(3)}>
                <img src={settings} width="35" height="35" className="imgStyle"/>Settings</div>
                <ReactCSSTransitionGroup transitionName="settings_transition">
                    {(this.state.itemChosen===3)?this.ConditionalRendering(this.state.itemChosen):null}
                </ReactCSSTransitionGroup>
            </div>
            </div>
        )
    }
}