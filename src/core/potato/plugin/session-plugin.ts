import { PotatoPluginType } from ".";

const sessionPlugin:PotatoPluginType = ( defPRI, defSEC, defTPL ) => {
    return () => {
defPRI( [`
import { setLocal as __sL, getLocal as __gL,
setSession as __sS, getSession as __gS } from '../storage';
`] );        
    }
};
export default sessionPlugin;