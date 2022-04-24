import { PotatoPluginType } from ".";

const scenePlugin:PotatoPluginType = ( defPRI, defSEC, defTPL ) => {
    return () => {
defPRI( [`
import { SButton, SDatetime, SInput, 
    SDialog, SNumberInput, SPaymentInput ,
    SRadio, SSelect, SScrollbar, 
    SCheckbox, SCheckboxButton, SCheckboxGroup, 
    SCard, STextarea ,SceneMessage as __mes, 
    SceneLoading as __loading, SLoginReg, 
    SChat, SPaper, SSearchPanel, 
    SSessionList } from 'scene-ui';
`] );        
    }
};
export default scenePlugin;