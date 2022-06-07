import { SUC_LOG_GETTER } from './util/log-info';
import { stdWriteFileCover } from './util/std-write';
import { startOnSec, endOnSec } from './util/time';
import modelEngine from './model-engine';
import chalk from 'chalk';
import RequestPluginGenerator from './core/potato/plugin/request-plugin';
import potatoEngine from './potato-engine';
import sessionPlugin from './core/potato/plugin/session-plugin';
import prompt from 'prompt-sync'

console.log( "In Loading LC-CONFIG..." );
const boot = async () => {

    const inOpt = prompt( {} )( '> need optimize ? y/n' )

    console.log( chalk.cyanBright( "LOADING MODEL __" ) );
    startOnSec()
    const { operationNameSets } = await modelEngine();
    console.log( chalk.blueBright( `DONE:  ${ endOnSec() } ms` ) );

    console.log( chalk.cyanBright( "LOADING PAGE __" ) );
    startOnSec();
    const requestPlugins = RequestPluginGenerator( operationNameSets["Auth"].concat(operationNameSets["Unauth"] ) );
    /** @param: 土豆编译器的插件 */
    /** 这些将会在编译时 作为预设模板注入应用源码  */
    await potatoEngine( {
        "potatoPlugins": [
            requestPlugins,
            sessionPlugin
        ]
     } );
    console.log( chalk.blueBright( `PAGE_DONE:  ${ endOnSec() } ms` ) );
    console.log( chalk.blueBright( "finish" ) );

    setTimeout( () => {
        console.log( '\n\n\n' )
        console.log( chalk.cyan( 'write log to locale root' ) )
        stdWriteFileCover( './compile-log', SUC_LOG_GETTER() )
    }, 3000 )
};

boot();