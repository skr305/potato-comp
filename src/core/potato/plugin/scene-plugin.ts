import { PotatoPluginType } from ".";

const scenePlugin:PotatoPluginType = ( defPRI, defSEC, defTPL ) => {
    return () => {
defPRI( [`
import { SButton, SDatetime, SInput, 
    SDialog, SNumberInput, SPaymentInput ,
    SRadio, SSelect, SScrollbar, 
    SCheckbox, SCheckboxButton, SCheckboxGroup, 
    SCard, STextarea ,SceneMessage, 
    SceneLoading } from 'scene-ui';
`] );        
    }
};
export default scenePlugin;