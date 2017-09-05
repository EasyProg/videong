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
export function toggleButtons(isVisible) {
var result = !isVisible;
    return  {
        type:'TOGGLE_BUTTONS',
        isControlElemsVisible:result
            }
}
export function toggleFullScreen(isFullScreen) {
    return  {
        type:'TOGGLE_FULLSCREEN',
        fullScreen:isFullScreen
            }
}
export function toggleCategory(category) {
    return  {
        type:'TOGGLE_CATEGORY',
        category
            }
}






