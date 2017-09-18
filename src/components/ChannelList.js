import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeVideo,toggleCategory,togglePlay,getChannels,setChannelsVisible} from '../actions/actions';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
//import '../components/Channel';
import Channel from './Channel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
class ChannelList extends Component   {
constructor(props)                    {
    super(props);
    this.handleClick = this.handleClick.bind(this);
                                      }
static propTypes = {
playList:   PropTypes.array.isRequired,
category:   PropTypes.string.isRequired,
visibility: PropTypes.bool.isRequired,
visibleSetContext:PropTypes.func.isRequired
};
handleClick (elem)                    {
this.props.dispatch(changeVideo(elem));
this.props.dispatch(toggleCategory(elem.category));
this.props.dispatch(togglePlay(!this.props.autoPlay));
this.props.dispatch(setChannelsVisible({
    channelsMenuVisible:false,
    categoryMenuVisible:false,
    settingsVisible:false
}));
//this.props.visibleSetContext('left');
//Set UI
                                      }
render(){
this.props.dispatch(getChannels(this.props.playList));
return         (
               <div>
               <div className={!this.props.visibility?'menuChannelNone':this.props.categoryMenuVisible?'menuChannelLeft':'menuChannel'} onClick={this.props.onClick}>
               <PerfectScrollbar>
               {this.props.playList.map((elem, i) =>
                            <Channel
                            key={i}
                            channelId       =   {elem.channelId}
                            hiddenChannel   =   {this.props.category==='Locked'}
                            programName     =   {elem.channel}
                            favorite        =   {this.props.category==='Любимые'}
                            chosen          =   {elem.channelId===this.props.video.channelId&&elem.category===this.props.channelCategory}
                            onClick         =   {e=>this.handleClick(elem)}/>
               )
               }
               </PerfectScrollbar>
               </div>
               </div>
                )
        }
                                        }
const mapDispatchToProps = (dispatch) => bindActionCreators({
dispatch,changeVideo,toggleCategory,togglePlay,getChannels,setChannelsVisible
}, dispatch);
export default connect(
state => ({
video:state.videoReducer.video,
channelCategory:state.channelReducer.chosenCategory,
autoPlay:state.videoReducer.autoPlay,
categoryMenuVisible:state.menuReducer.menus.categoryMenuVisible
}),
mapDispatchToProps
)(ChannelList);




