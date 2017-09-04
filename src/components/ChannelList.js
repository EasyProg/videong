import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeVideo,toggleCategory} from '../actions/actions';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
var proxy = 'https://cors-anywhere.herokuapp.com/';
class ChannelList extends Component {
constructor(props) {
    super(props);
    this.filterChannels = this.filterChannels.bind(this);
    this.handleClick = this.handleClick.bind(this);
}
static propTypes = {
playList:   PropTypes.array.isRequired,
category:   PropTypes.string.isRequired,
visibility: PropTypes.bool.isRequired
};
handleClick (link,ch,i,cat,channelId) {
    console.log(channelId+'      '+ this.props.video.channelId);
this.props.dispatch(changeVideo(link,ch,i,channelId));
this.props.dispatch(toggleCategory(cat));
//Set UI
}

filterChannels(channels) {
let cat = this.props.category;
let filteredChannels = [] ;
if (channels) {
     filteredChannels =  channels.filter(function(item)
     {
     if (cat !=='all')
     return item.category === cat;
     else return item.category
     })
 }
 return filteredChannels;
                        }
//
render(){
    //filterChannels to category
this.massive = this.filterChannels(this.props.playList);
console.log(this.massive);
return         (
               <div>
               <div className={this.props.visibility?'menuChannel':'menuChannelNone'}>
               {this.massive.map((elem, i) =>
               <div key={i} className={elem.channelId===this.props.video.channelId&&elem.category===this.props.channelCategory?'menuItemStylefocus':'menuItemStyle'}
               onClick={e=>this.handleClick(elem.link,elem.channel,i,elem.category,elem.channelId)} tabIndex={i}>
               <span className="span">{i+1}</span>
               <span>{elem.channel}</span>
               <div className={elem.channelId===this.props.video.channelId&&elem.category===this.props.channelCategory?'circleButtonSpan':'circleButtonSpanNone'}>
               <Button circular icon='angle right' color="violet" onClick={(e)=>{e.stopPropagation()}}/>
               </div>
               </div>
               )}
               </div>
               </div>
               )
}
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
dispatch,changeVideo,toggleCategory
}, dispatch);
export default connect(
state => ({
video:state.videoReducer.video,
channelCategory:state.channelReducer.chosenCategory
}),
mapDispatchToProps
)(ChannelList);




