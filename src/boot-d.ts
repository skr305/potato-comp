import modelEngine from './model-engine';
import chalk from 'chalk';
import RequestPluginGenerator from './core/potato/plugin/request-plugin';
import potatoEngine from './potato-engine';
import sessionPlugin from './core/potato/plugin/session-plugin';

console.log( "IN-boot-demo run 233" );
const boot = async () => {
    const { operationNameSets } = await modelEngine();
    const requestPlugins = RequestPluginGenerator( operationNameSets["Auth"].concat(operationNameSets["Unauth"] ) );
    await potatoEngine( {
        "potatoPlugins": [
            requestPlugins,
            sessionPlugin
        ]
     } );
    console.log( chalk.blueBright( "finish" ) );
};

boot();