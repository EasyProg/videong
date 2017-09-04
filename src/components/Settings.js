import React, {Component,PropTypes} from 'react';
import Tv from '../img/television.png';
import Phone from '../img/smartphone.png';
import Tablet from '../img/tablet.png';
import Computer from '../img/computer.png';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import ToggleSwitch from '@trendmicro/react-toggle-switch'
export default class Settings extends Component {
    static props = {
        //itemChosen: this.props.number
    };
    constructor(props) {
        super(props);
        this.toggleDevState = this.toggleDevState.bind(this);
        this.toggleLanState = this.toggleLanState.bind(this);
        this.resetSettings =  this.resetSettings.bind(this);
        this.state= {
            device: 1,
            language:2,
        }
                        }
    toggleDevState(dev) {
        this.setState({
            device:dev
        });
                        }
    toggleLanState(lan) {
        this.setState({
            language:lan
        });
                        }
    resetSettings()     {
        this.setState({
            device:1,
            language:2
        });
                        }
    render()            {
        return (
                    <div className="settingsDiv">
                    <p>Select your device</p>
                    <div className="select_your_device">
                        <div className={this.state.device === 1 ? "divUsualImgFocus" : "divUsualImg"}
                             onClick={(e) => this.toggleDevState(1)}><img className="usualImg" src={Phone}/></div>
                        <div className={this.state.device === 2 ? "divUsualImgFocus" : "divUsualImg"}
                             onClick={(e) => this.toggleDevState(2)}><img className="usualImg" src={Tablet}/></div>
                        <div className={this.state.device === 3 ? "divUsualImgFocus" : "divUsualImg"}
                             onClick={(e) => this.toggleDevState(3)}><img className="usualImg" src={Tv}/></div>
                        <div className={this.state.device === 4 ? "divUsualImgFocus" : "divUsualImg"}
                             onClick={(e) => this.toggleDevState(4)}><img className="usualImg" src={Computer}/></div>
                    </div>
                    <p>Language</p>
                    <div className="languageDiv">
                        <div className={this.state.language === 1 ? "languageButtonFocus" : "languageButton"}
                             onClick={(e) => this.toggleLanState(1)}>Poland
                        </div>
                        <div className={this.state.language === 2 ? "languageButtonFocus" : "languageButton"}
                             onClick={(e) => this.toggleLanState(2)}>Ukrainian
                        </div>
                        <div className={this.state.language === 3 ? "languageButtonFocus" : "languageButton"}
                             onClick={(e) => this.toggleLanState(3)}>Russian
                        </div>
                        <div className={this.state.language === 4 ? "languageButtonFocus" : "languageButton"}
                             onClick={(e) => this.toggleLanState(4)}>English
                        </div>

                    </div>
                    <p>Autorun</p>
                    <ToggleSwitch checked={false}/>
                    <button className="resetToDefault" onClick={(e)=>this.resetSettings()}>Reset to default</button>
                </div>
        )
    }
}