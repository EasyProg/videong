export function changeVideo(videoStr,channel,itemChosen,channelId) {
    console.log(channelId);
    return  {
        type: 'CHANGE',
        video:{videoStr,channel,itemChosen,channelId}
            }
}
export function togglePlay(isPlaying)    {
var result = !isPlaying;
    return  {
        type:'TOGGLE_PLAY',
        isPlaying:result
            }
}

export function toggleAutoPlay(isPlaying)    {
    var result = !isPlaying;
    console.log(result);
    return  {
        type:'TOGGLE_AUTO_PLAY',
        autoPlay:result
            }
}
export function toggleButtons(isVisible) {
var result = !isVisible;
    return  {
        type:'TOGGLE_BUTTONS',
        isControlElemsVisible:result
            }
}
export function toggleFullScreen(isFullScreen) {
    var isNotFullScreen = isFullScreen;
    return  {
        type:'TOGGLE_FULLSCREEN',
        fullScreen:isNotFullScreen
            }
}
export function toggleCategory(category) {
    return  {
        type:'TOGGLE_CATEGORY',
        category
            }
}






