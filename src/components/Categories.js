import React, {Component} from 'react';
//import images
import glasses from '../img/3d-glasses.png';
import caravan from '../img/caravan.png';
import film from '../img/film-roll.png';
import scene from '../img/scene.png';
import mask from '../img/mask.png';
import headphones from '../img/headphones.png';
import star from '../img/shooting-star.png';
import masks from '../img/theater.png';
//import elements
import {Icon} from 'semantic-ui-react';
import ChannelList from '../components/ChannelList';
import hlsArray from '../hls';
//import Css
import '../styles/css/main_styles.css';
import 'semantic-ui-css/semantic.min.css';
export default class Categories extends Component {
constructor(props) {
    super(props);
    this.state = {  visible:false,
                    itemChosen:'',
                    category:''
                 };
                   }
    handleClick (index,cat) {
       this.setState(
           {
            itemChosen:index,
            category:cat
           }
           );
                            }
    parse(arr) {
    var channels = [];
    var t = '';
    var link ='';
    let parseCategory ='';
    let parseChannelID = 0;
    if (arr) {
        arr.map((e, i) => {
            if (typeof e === 'object')  {
                for (var key in e.EXTINF) {
                    if (key !== 'aspect-ratio') {
                        t = key;
                    }
                    else {
                        var c =  e.EXTINF['aspect-ratio'];
                        parseCategory = c.substring(c.indexOf('category=',1)+9,c.indexOf(';keycode',1));
                        parseChannelID= Number(c.substring(c.indexOf('id=',1)+3,c.indexOf(';category',1)));
                         }
                }
                                        }
            if (typeof e === 'string')  {
                link = e;
                channels.push({channelId:parseChannelID,channel: t, link: link, category:parseCategory});
                                        }
        });
    }
     return(channels);
}
    Menu = [
    {name:'All',         src:'none',    category:'all'},
    {name:'Now watching',src:star},
    {name:'TV Shows',    src:scene},
    {name:'Films',       src:film,      category:'фильмы'},
    {name:'Music',       src:headphones,category:'музыкальный'},
    {name:'Popular',     src:mask},
    {name:'3D / VR',     src:glasses},
    {name:'Travel',      src:caravan},
    {name:'Comedy',      src:masks,     category:'развлекательный'}];
    render()    {
        return (
            <div>
            <div className="divSideBar" onClick={(e)=>this.setState({visible:!this.state.visible})}>
            <Icon className="large inverted sidebar"/>
            </div>
            <div className={this.state.visible?"categoryPanel":"categoryPanelNone"}>
                {
                            this.Menu.map((item,i)=>
                            <div key={i} className={this.state.itemChosen===i?'categoryItemChosen':'categoryItem'}
                                     onClick={(e)=>this.handleClick (i,item.category)}>
                            <div className="categoryImage"><img src={item.src} width="40" height="40"/></div>
                            <div className="categoryText">
                            {item.name}
                            </div>
                        </div>
                                        )
                }
            </div>
            <div className="innerDiv">
            <ChannelList playList={this.parse(hlsArray)} category={this.state.category} visibility={this.state.visible}/>
            </div>
            </div>
                )
                }
}