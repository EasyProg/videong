import React, { Component,PropTypes } from 'react';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import pause from '../img/pause_button.png';
import play from '../img/play-button.png';
import '../styles/css/main_styles.css';
import  {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeVideo,toggleCategory,setChannelsVisible,toggleFullScreen} from '../actions/actions';
import * as $ from 'jquery';
class VideoUpperMenu extends Component                         {
        static propTypes = {
        toggleContext:PropTypes.func.isRequired,
        handleOnPlayContext:PropTypes.func.isRequred,
        handleCurrentTimeContext:PropTypes.func.isRequred,
        handleCurrPlaybackContext:PropTypes.func.isRequred,
        isPlaying:PropTypes.bool.isRequired
                           };
    //Constructor of the class
    constructor(props)  {
        super(props);
        this.switchKeyPress = this.switchKeyPress.bind(this);
                        }
    componentDidMount()                                        {
        var func = this.switchKeyPress;
        var t = this;
        $('#video').focus();
        $('#video').keydown(function(event)                    {
            //event.preventDefault();
            func(event);
                                                               });
        $('#video').click(
               function() {
                t.props.dispatch(setChannelsVisible(
                    {
                        channelsMenuVisible: false,
                        categoryMenuVisible: false,
                        settingsVisible:     false
                    }));
                this.focus();
            }
                        )
                                                               }
    switchKeyPress(event)                                      {
        switch (event.keyCode)                                 {
            case 40:
                this.switchChannel('prev');
                break;
            case 38:
                this.switchChannel('next');
                break;
            case 37:                                           {
                if (!this.props.menus.channelsMenuVisible)     {
                    this.props.dispatch(setChannelsVisible(
                        {
                            channelsMenuVisible: true,
                            categoryMenuVisible: false,
                            settingsVisible:     false
                        }
                    ));
                                                               }
                else if (this.props.menus.channelsMenuVisible) {
                    this.props.dispatch(setChannelsVisible(
                        {
                            channelsMenuVisible: true,
                            categoryMenuVisible: true,
                            settingsVisible:     false
                        }
                    ));
                    $('#categories').focus();
                                                               }
                break;
                                                               }
            case 39:                                           {
                this.props.dispatch(setChannelsVisible(
                    {
                            channelsMenuVisible: false,
                            categoryMenuVisible: false,
                            settingsVisible:     true
                    }
                ));
                break;
                                                               }
            default:break;
                                                               }
                                                               }
    switchChannel(param='next')                                {
    var i = this.props.channels.map(x => x.channelId).indexOf(this.props.video.channelId);
    let isOver =  i+1<this.props.channels.length;
    let isPos  =  i-1>=0;
    var nextElem = this.props.channels[i+1];
    var prevElem = this.props.channels[i-1];
    if (param==='next')                                         {
        if (!isOver) nextElem = this.props.channels[0];
        if (nextElem)
        {
            this.props.dispatch(changeVideo(nextElem));
            this.props.dispatch(toggleCategory(nextElem.category));
        }
                                                                }
    if (param==='prev'&&prevElem)                               {
        if (!isPos) prevElem = this.props.channels[this.props.channels.length - 1];
        if (prevElem)                                           {
            this.props.dispatch(changeVideo(prevElem));
            this.props.dispatch(toggleCategory(prevElem.category));
                                                                }
                                                                }
                                                                }
    render() {
         return (       <div id="vduppermenu" onKeyDown={(e)=>this.switchKeyPress(e)} tabIndex={1} className="displayNone">
                        <progress id='progress-bar' min='0' max='100' value='0' className='progressBar'>0% played</progress>
                        <div  className="divPlayer">
                        <div  className="videoTime" id="currentTime">{this.props.handleOnPlayContext.currentTime}</div>
                        <div  className="playerButtonsDiv">
                        <Icon className="large inverted step backward" onClick={(e)=>this.switchChannel('prev')}/>
                        <Icon className="large inverted backward" onClick={(e)=>this.props.handleCurrentTimeContext(0)}/>
                        <img  onClick={(e)=>this.props.toggleContext(this.props.isPlaying)} width={45} height={45} src={this.props.isPlaying?pause:play} />
                        <Icon className="large inverted forward" onClick={(e)=>this.props.handleCurrentTimeContext(1)}/>
                        <Icon className="large inverted step forward" onClick={(e)=>this.switchChannel('next')}/>
                        </div>
                        <div  className="videoTime" id="duration">{this.props.handleOnPlayContext.duration}</div>
                        </div>
                        </div>
                )
             }
                                                                }
const mapDispatchToProps = (dispatch) => bindActionCreators({
dispatch,changeVideo,toggleCategory,setChannelsVisible,toggleFullScreen
}, dispatch);
export default connect (
    state => ({fullScreen:state.videoReducer.fullScreen,
               channels:state.channelReducer.channels,
               video:state.videoReducer.video,
               menus:state.menuReducer.menus
              }),
              mapDispatchToProps
                       )(VideoUpperMenu);