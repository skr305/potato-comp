import { startOnSec, endOnSec } from './util/time';
import { PotatoPluginType } from './core/potato/plugin/index';
import { StringGeneratorWithNoArgs } from './alias-type';
import chalk from 'chalk';
import writeToPage from './core/potato/page-compiler';
import { defPRI, defSEC, defTPL, getToken } from './core/potato/token-collector';
import fs from 'fs';
import { LC_CONFIG_DIR_NAME, LC_POTATO_DIR, TEMPLATE_DIR_NAME } from "./lc-constants";
import { stdReadFile } from './util/std-read';
import { stdExistOrMkdir } from './util/std-write';
import exposeConfig from '../lc-config/front-end/global.expose';
import scenePlugin from './core/potato/plugin/scene-plugin';
import writeRouterToPaths from './core/potato/gen-router';
import routerPlugin, { routerInnerPlugin } from './core/potato/plugin/router-plugin';

const PAGE_NAME_REG = /^[\w-]+\.page$/;
export interface PotatoEngineBootOptions {
    innerPlugins ?: StringGeneratorWithNoArgs[];
    potatoPlugins ?: PotatoPluginType[]
};

const potatoEngine = async ( options : PotatoEngineBootOptions = {} ) => {

    // col the token
    exposeConfig.initExpose();
    console.log( chalk.greenBright( 'expose config hooks mounted...' ) )
    // 调用默认plugin
    scenePlugin( defPRI, defSEC, defTPL )();
    routerPlugin(  defPRI, defSEC, defTPL  )();
    console.log( chalk.cyan( 'loading scene-plugin and router-plugin' ) )

    if( options.potatoPlugins !== undefined && options.potatoPlugins.length ) {
        options
        .potatoPlugins
        .map( p => {
            p( defPRI, defSEC, defTPL )()
        } );
    }
    const extraInnerPlugins = options.innerPlugins || [];

    const INPUT_DIR_PATH = `${__dirname}/../../${LC_CONFIG_DIR_NAME}/${ LC_POTATO_DIR }`;
    const OUTPUT_DIR_PATH = `${__dirname}/../../${TEMPLATE_DIR_NAME}/src/pages`;

    const ROUTER_OUTPUT_PATH = `${__dirname}/../../${TEMPLATE_DIR_NAME}/src/router-path.ts`;
    await stdExistOrMkdir( OUTPUT_DIR_PATH );
    try {
        const filenames = await fs.promises.readdir( INPUT_DIR_PATH );
        const pagenames = filenames.filter( n => {
            return PAGE_NAME_REG.test( n );
        } )
        const allPurePagenames = pagenames.map( pn => pn.slice( 0, pn.length - 5 ) );
        for( let pn of pagenames ) {
            
            const purePagename = pn.slice( 0, pn.length - 5 );
            // read <app>.page
            const raw = await stdReadFile( `${INPUT_DIR_PATH}/${pn}`) as string;
            console.log( chalk.blueBright( `transfer ${ pn } to ${ purePagename }.vue` ) )
            startOnSec()
            // write to <app>.vue
            await writeToPage(
                 `${OUTPUT_DIR_PATH}/${ purePagename }.vue`,
                  raw, 
                  getToken(),
                  [
                      routerInnerPlugin( allPurePagenames ),
                      ...extraInnerPlugins
                  ] 
            );
            console.log( chalk.blueBright( `transfer ${ pn } done in ${ endOnSec() } ms` ) )
        }
        console.log( chalk.bold( chalk.cyanBright( ` loading page router: ${ allPurePagenames } ` ) ) )
        // write to router config
        await writeRouterToPaths( 
            ROUTER_OUTPUT_PATH, 
            allPurePagenames 
        );
    } catch( error ) {
        
        console.error( chalk.bgWhite( chalk.redBright( `
bad-config-dir-structure
the directory structure should be
lc_config/
	model.json
	operation.json
	front-end/
		<>.expose.ts
		<>.page
		global.expose.ts	
        ` ) ) );
        throw error
    }
    
    
};
export default potatoEngine;