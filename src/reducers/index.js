
import {combineReducers} from 'redux';


const initialState = {
        video: {videoStr:'https://cdnua01.hls.tv/hls/aef8a6a3b11ae0ae60938e653fcdd7aa/51/stream.m3u8',
        channelId:51,
        channel: '1+1',
        itemChosen:null,
        },
        isPlaying:true,
        autoPlay:true,
        isControlElemsVisible:false,
        fullScreen:false,
        channelCategory:'',
        isControlMenuVisible:false,
                     };
const channelState = {
        category:''
                     };
const menuState = {

                  };

function videoReducer(state=initialState,action=null)           {
    switch (action.type) {
        case 'CHANGE':
            return {...state,video:action.video};
        case 'TOGGLE_PLAY':
        return {...state,isPlaying:action.isPlaying};
        case 'TOGGLE_AUTO_PLAY':
            return {...state,autoPlay:action.autoPlay};
        case 'TOGGLE_BUTTONS':
            return {...state,isControlElemsVisible:action.isControlElemsVisible};
        case 'TOGGLE_FULLSCREEN':
            return {...state,fullScreen:action.fullScreen};
        // case 'TOGGLE_CATEGORY':
        //     return {...state,channelCategory:action.category};
        default:
            return state;
                        }
                                                                }

function channelReducer (state=channelState,action=null)        {
    switch (action.type) {
        case 'TOGGLE_CATEGORY' :
            return {...state,chosenCategory:action.category};
        default:
            return state;
                        }
                                                                }

const videoApp = combineReducers({
    videoReducer,
    channelReducer
});
export default videoApp;