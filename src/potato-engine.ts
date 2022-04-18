import chalk from 'chalk';
import writeToPage from './core/potato/page-compiler';
import { defPRI, defSEC, defTPL, getToken } from './core/potato/token-collector';
import fs from 'fs';
import { LC_CONFIG_DIR_NAME, LC_POTATO_DIR, TEMPLATE_DIR_NAME } from "lc-constants";
import { stdReadFile } from './util/std-read';
import { stdExistOrMkdir } from './util/std-write';
import exposeConfig from '../lc-config/front-end/global.expose';
import scenePlugin from 'core/potato/plugin/scene-plugin';

const PAGE_NAME_REG = /^[\w-]+\.page$/;

const potatoEngine = async () => {

    // col the token
    exposeConfig.initExpose();
    // 调用默认plugin
    scenePlugin( defPRI, defSEC, defTPL )();

    const INPUT_DIR_PATH = `${__dirname}/../${LC_CONFIG_DIR_NAME}/${ LC_POTATO_DIR }`;
    const OUTPUT_DIR_PATH = `${__dirname}/../${TEMPLATE_DIR_NAME}/src/pages`;
    await stdExistOrMkdir( OUTPUT_DIR_PATH );
    try {
        const filenames = await fs.promises.readdir( INPUT_DIR_PATH );
        const pagenames = filenames.filter( n => {
            return PAGE_NAME_REG.test( n );
        } )
        for( let pn of pagenames ) {
            const purePagename = pn.slice( 0, pn.length - 5 );
            // read <app>.page
            const raw = await stdReadFile( `${INPUT_DIR_PATH}/${pn}`) as string;
            // write to <app>.vue
            await writeToPage( `${OUTPUT_DIR_PATH}/${ purePagename }.vue`, raw, getToken() );
        }
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
    }
};
export default potatoEngine;