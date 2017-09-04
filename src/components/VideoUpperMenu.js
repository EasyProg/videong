import React, { Component,PropTypes } from 'react';
import {Button,Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import  {connect} from 'react-redux';
class VideoUpperMenu extends Component {
    static propTypes = {
        toggleContext:PropTypes.func.isRequired,
        handleOnPlayContext:PropTypes.func.isRequred,
        handleCurrentTimeContext:PropTypes.func.isRequred,
        handleCurrPlaybackContext:PropTypes.func.isRequred,
        isPlaying:PropTypes.bool.isRequired

    };
    //Constructor of the class
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(typeof this.props.handleCurrentTimeContext);
    }
    render() {
         return (       <div id="vduppermenu" className={this.props.fullScreen?"centerDivFull":"centerDiv"}>
                        <progress id='progress-bar' min='0' max='100' value='0' className={this.props.fullScreen?'progressBarFull':'progressBar'}>0% played</progress>
                        <div className={this.props.fullScreen?"divPlayerFullSize":"divPlayer"}>
                        <div className="videoTime" id="currentTime">{this.props.handleOnPlayContext.currentTime}</div>
                        <div className="playerButtonsDiv">
                        <Icon className="large inverted step backward" onClick={(e)=>this.props.handleCurrentTimeContext(0)}/>
                        <Icon className="large inverted backward" onClick={(e)=>this.props.handleCurrPlaybackContext(0)}/>
                        <Button className="tiny circular ui icon button" onClick={(e)=>this.props.toggleContext(this.props.isPlaying)}>
                        <Icon className={this.props.isPlaying?"large violet pause":"large violet play"}/>
                        </Button>
                        <Icon className="large inverted forward" onClick={(e)=>this.props.handleCurrPlaybackContext(1)}/>
                        <Icon className="large inverted step forward" onClick={(e)=>this.props.handleCurrentTimeContext(1)}/>
                        </div>
                        <div className="videoTime" id="duration">{this.props.handleOnPlayContext.duration}</div>
                        </div>
                        </div>
                )
            }
}
export default connect(
    state => ({fullScreen:state.videoReducer.fullScreen}),
    ({})
)(VideoUpperMenu);