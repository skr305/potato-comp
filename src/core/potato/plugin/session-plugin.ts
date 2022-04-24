import { PotatoPluginType } from ".";

const sessionPlugin:PotatoPluginType = ( defPRI, defSEC, defTPL ) => {
    return () => {
defPRI( [`
import { setLocal, getLocal,
setSession, getSession } from '../storage';
`] );        
    }
};
export default sessionPlugin;