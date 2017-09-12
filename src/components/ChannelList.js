import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeVideo,toggleCategory,togglePlay} from '../actions/actions';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
//import '../components/Channel';
import Channel from './Channel';
class ChannelList extends Component {
constructor(props)              {
    super(props);
    this.filterChannels = this.filterChannels.bind(this);
    this.handleClick = this.handleClick.bind(this);
                                }
static propTypes = {
playList:   PropTypes.array.isRequired,
category:   PropTypes.string.isRequired,
visibility: PropTypes.bool.isRequired,
visibleSetContext:PropTypes.func.isRequired
};
handleClick (link,ch,i,cat,channelId) {
this.props.dispatch(changeVideo(link,ch,i,channelId));
this.props.dispatch(toggleCategory(cat));
this.props.dispatch(togglePlay(!this.props.autoPlay));
this.props.visibleSetContext('left');
//Set UI
                                      }

filterChannels(channels) {
let cat = this.props.category;
let filteredChannels = [];
if (channels) {
     filteredChannels =  channels.filter(function(item)
     {
     if (cat !=='all'&&cat !=='любимые'&&cat !=='locked')
     return item.category === cat;
     else return item.category
     })
              }
 return filteredChannels;
                         };
//
render(){
this.massive = this.filterChannels(this.props.playList);
return         (
               <div>
               <div className={this.props.visibility?'menuChannel':'menuChannelNone'} onClick={this.props.onClick}>
               {this.massive.map((elem, i) =>
                            <Channel
                            key={i}
                            channelId       ={elem.channelId}
                            hiddenChannel   ={this.props.category==='locked'}
                            programName     ={elem.channel}
                            favorite        ={this.props.category==='любимые'}
                            chosen          ={elem.channelId===this.props.video.channelId&&elem.category===this.props.channelCategory}
                            onClick         ={e=>this.handleClick(elem.link,elem.channel,i,elem.category,elem.channelId)}/>
               )
               }
               </div>
               </div>
)
        }
                                }
const mapDispatchToProps = (dispatch) => bindActionCreators({
dispatch,changeVideo,toggleCategory,togglePlay
}, dispatch);
export default connect(
state => ({
video:state.videoReducer.video,
channelCategory:state.channelReducer.chosenCategory,
autoPlay:state.videoReducer.autoPlay
}),
mapDispatchToProps
)(ChannelList);




