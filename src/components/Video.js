import  React, {Component,PropTypes} from 'react';
import       '../styles/css/main_styles.css';
import  {connect} from 'react-redux';


export default class Video extends Component {
    constructor(props) {
    super(props);
                       }
    static propTypes = {
    fullSize: PropTypes.bool.isRequired,
    isPlaying:PropTypes.bool.isRequired,
    video:    PropTypes.object.isRequired
                       };
    shouldComponentUpdate(nextProps,nextState)  {
    console.log(nextProps.fullSize+'  '+this.props.fullSize);
    if         (nextProps.fullSize!==   this.props.fullSize//||nextProps.isPlaying!==this.props.isPlaying
    //|| nextProps.video.channelId!==this.props.video.channelId
               )
    {
        return false}
    else {
        return true}

                                                }
    render() {
        console.log('Render');
        return (
                        <div id="videoDiv">
                            <video id="video" ref={(video)=>this.video=video}
                                   autoPlay={this.props.isPlaying}
                                   tabIndex={1}
                            />
                        </div>
               )
             }
                                            }

//Merge request to master project