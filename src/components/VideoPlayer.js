import  React, {Component} from 'react';
import  {connect} from 'react-redux';
import  {ReactTransitionGroup} from 'react-transition-group';
//import own components
import  VideoBottomMenu from '../components/VideoBottomMenu';
import  VideoUpperMenu from '../components/VideoUpperMenu'  ;
import  Hls from 'hls.js';
//import Event Listener
import {bindActionCreators} from 'redux';
import {togglePlay,toggleButtons,toggleFullScreen} from '../actions/actions';
import * as $ from 'jquery';
//import css//
//import 'semantic-ui-css/semantic.min.css'//;
import '../styles/css/main_styles.css';
var proxy = 'https://cors-anywhere.herokuapp.com/';
var timeFormat = function(seconds)  {
    var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
    var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
    if (m&&s)
    return m+":"+s;
    else return '00:00'
                                    };
//window.$ = window.JQuery = JQuery;
const hls = new Hls();
class VideoPlayer extends Component                 {

constructor(props)                  {
        super(props);
        this.handleOnPlay = this.handleOnPlay.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.changeRes = this.changeRes.bind(this);
        this.handleCurrTime = this.handleCurrTime.bind(this);
        this.handleCurrPlayback = this.handleCurrPlayback.bind(this);
        this.toggle = this.toggle.bind(this);
        this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
        this.handlePlay=this.handlePlay.bind(this);
        this.escFullScreen = this.escFullScreen.bind(this);
        this.state = {playerButtonsAppear:false};
        this.timer = '';
                                    }
//Component Functions
        shouldComponentUpdate(nextProps,nextState)  {
        if (nextProps.fullScreen!==this.props.fullScreen)
        {return false}
        else return true                            }
        componentDidMount() {
        this.videoOnLoad();

                            }
        componentWillUnmount() {
        const vd = this.video;
        vd.removeEndEventListener('timeupdate');
                                }
        toggle(isPlaying) {
        const vd = this.video;
        this.props.dispatch(togglePlay(isPlaying));
        if (isPlaying) {
            vd.play();
        }
        else vd.pause();
        }
        changeRes(res) {
        var videoSets = this.video
    }
        videoOnLoad() {
        const video = document.getElementById('video');
        if (navigator.userAgent.indexOf('WOW64')!==-1) {
            hls.loadSource(this.props.video.videoStr);
        }
        else {hls.loadSource(proxy+this.props.video.videoStr);}
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function () {
            video.play();
                                                      });
        if (video)  {
            video.addEventListener('timeupdate', this.handleOnPlay);
                    }
                    }
        handleOnPlay() {
        var videoSets = this.video;
        const time = videoSets.currentTime||0;
        const duration = videoSets.duration||100;
        var currentTime = document.getElementById('currentTime');
        var durationTime = document.getElementById('duration');
        currentTime.innerText = timeFormat(time);
        durationTime.innerText   = timeFormat(duration);
        var progressBar = document.getElementById('progress-bar');
        var percentage = Math.floor((100 / duration) * time);
        progressBar.value     = percentage;
        progressBar.innerHTML = percentage+'%';
                        }
        handleCurrTime(param)       {
        var videoSets = this.video;
        if (param===1)
        {videoSets.currentTime+=10; }
        else videoSets.currentTime-=10;
        console.log(videoSets.currentTime);
                                    }
        handleCurrPlayback (param)  {
        var videoSets = this.video;
        if (param===1)
        {videoSets.playbackRate+=0.1;}
        else videoSets.playbackRate-=0.1;
                                    }
        handlePlay()                                {
        this.timer = setTimeout(function()          {
        //Скрыть плей
        $("#vduppermenu,#vdbottommenu").fadeOut(1000);
        },5000);                                    }
        menuFullScreenAppears()
        {
        //Отобразить плей
        console.log('menuFullScreenAppears');
        clearTimeout(this.timer);
        $("#vduppermenu,#vdbottommenu").fadeIn(1000);
        //Запустить скрытие
        this.handlePlay();
        }
        escFullScreen()                            {
        var videoSets = this.video;
         if  (!document.fullscreenElement
             && !document.mozFullScreenElement
             && !document.webkitFullscreenElement
             && !document.msRequestFullscreen)
         {   //clearTimeout(this.timer);
             this.props.dispatch(toggleFullScreen(false));
             clearTimeout(this.timer);
             $("#vduppermenu,#vdbottommenu").fadeIn(100);
             this.hoverDiv.removeEventListener('mousemove',this.menuFullScreenAppears);
             //clearTimeout(this.timer);
         }
        //this.props.dispatch(toggleFullScreen(false));

                                                  }
        changeSize()                              {
        var videoSets = this.video;
        if (   !document.fullscreenElement
            && !document.mozFullScreenElement
            && !document.webkitFullscreenElement
            && !document.msRequestFullscreen)
        //from Normal Screen to Full
        {
       this.handlePlay();
        if (videoSets.webkitEnterFullscreen)      {
            videoSets.webkitEnterFullscreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else if (videoSets.mozRequestFullScreen)  {
            videoSets.mozRequestFullScreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else if (videoSets.msRequestFullscreen)   {
            videoSets.msRequestFullscreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else if (videoSets.requestFullscreen)     {
            videoSets.requestFullscreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else                                      {
            alert('Your browsers doesn\'t support fullscreen');
                                                  }

        //add listeners
        //$("#vduppermenu,#vdbottommenu").fadeOut(5000);
        this.hoverDiv.addEventListener('mousemove',this.menuFullScreenAppears);
        document.addEventListener ("webkitfullscreenchange", this.escFullScreen, false);
        //this.props.dispatch(toggleFullScreen(true));
        }
        //from fullScreen to Normal
        else                                       {
          if        (document.cancelFullScreen)
        {
                document.cancelFullScreen();
        } else if   (document.mozCancelFullScreen)
        {
                document.mozCancelFullScreen();
        } else if   (document.webkitCancelFullScreen)
        {
                document.webkitCancelFullScreen();
        }
         this.props.dispatch(toggleFullScreen(false));
         this.hoverDiv.removeEventListener('mousemove',this.menuFullScreenAppears);
         clearTimeout(this.timer);
         //clearTimeout(this.timer);
                                                   }
                                                   }
        //Component Functions
        render() {
        this.videoOnLoad();
            return (
                <div                 ref={(dv)=>this.div=dv} className="centerDiv">
                    <video           width={1200} height={750} id="video" ref={(video)=>this.video=video}
                                     autoPlay={this.props.isPlaying}
                                     //onClick={}
                                        />
                    <VideoUpperMenu  isPlaying={this.props.isPlaying}
                                     toggleContext={this.toggle}
                                     handleOnPlayContext={this.handleOnPlay}
                                     handleCurrentTimeContext={this.handleCurrTime}
                                     handleCurrPlaybackContext={this.handleCurrPlayback}/>
                    <VideoBottomMenu changeSizeContext={this.changeSize}
                                     changeResContext={this.changeRes}/>
                    <div id="hoverDiv" className="hoverDiv" ref={(div)=>this.hoverDiv=div}/>
                </div>
                    )
                }
                                                    }
                       const mapDispatchToProps = (dispatch) => bindActionCreators({
                       dispatch,togglePlay,toggleButtons,toggleFullScreen
                       }, dispatch);
                       export default connect   (
                       state => ({
                       video:                state.videoReducer.video,
                       isPlaying:            state.videoReducer.isPlaying,
                       fullScreen:           state.videoReducer.fullScreen
                       }),
                       mapDispatchToProps
                                                     )(VideoPlayer);