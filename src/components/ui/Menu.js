import React, {Component,PropTypes} from 'react';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/css/main_styles.css';
import Categories from '../Categories';
import HomeMenu from '../HomeMenu';
import  {connect} from 'react-redux';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftMenuVisible: false,
            rightMenuVisible: false
                     };
        this.toggleMenuState = this.toggleMenuState.bind(this);
    }
    toggleMenuState(menuType = 'left') {
        if (menuType === 'left')
        this.setState({leftMenuVisible: !this.state.leftMenuVisible});
        else this.setState({rightMenuVisible: !this.state.rightMenuVisible});
                                       }
    shouldComponentUpdate(now,next) {
        if (now.fullScreen!==next.fullScreen)
        {
            this.setState({
                leftMenuVisible:  false,
                rightMenuVisible: false
            });
        }
        return true
                                    }
    render() {
        return (
            <div id="menu" className={this.props.fullScreen ? 'mainMenuDivFull' : "mainMenuDiv"}>
                <div className="menuDives">
                    <div className="divSideBar"
                         onClick={(e) => this.setState({leftMenuVisible: !this.state.leftMenuVisible})}>
                        <Icon className="big inverted sidebar"/>
                    </div>
                    <Categories visible={this.state.leftMenuVisible} toggleMenuStateContext={this.toggleMenuState}/>
                    <div className={this.props.fullScreen?"menuCenterText":'displayNone'}>{this.props.channelId}{'. '}{this.props.channel}<br/>
                    А здесь должно быть название того что идет
                    </div>
                </div>
                <div className="menuDives">
                    <div className="homeButton"
                         onClick={(e) => this.setState({rightMenuVisible: !this.state.rightMenuVisible})}>
                        <Icon className="big inverted home"/>
                    </div>
                    <HomeMenu visible={this.state.rightMenuVisible}/>
                </div>
            </div>
        )
            }

}
export default connect(
state => ({fullScreen:state.videoReducer.fullScreen,
           channel:   state.videoReducer.video.channel,
           channelId: state.videoReducer.video.channelId
}),
({})
)(Menu);