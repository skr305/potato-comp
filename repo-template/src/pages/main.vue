
<script setup lang="ts">
import { SButton, SDatetime, SInput, 
    SDialog, SNumberInput, SPaymentInput ,
    SRadio, SSelect, SScrollbar, 
    SCheckbox, SCheckboxButton, SCheckboxGroup, 
    SCard, STextarea ,SceneMessage as __mes, 
    SceneLoading as __loading, SLoginReg, 
    SChat, SPaper, SSearchPanel, 
    SSessionList } from 'scene-ui';
import { useRouter, useRoute } from 'vue-router';
import { post } from '../request';
import { getSessParams } from '../api';
import { getSessResponse } from '../api';
import { getSessApiPath } from '../api'

import { creSesParams } from '../api';
import { creSesResponse } from '../api';
import { creSesApiPath } from '../api'

import { deleteUserParams } from '../api';
import { deleteUserResponse } from '../api';
import { deleteUserApiPath } from '../api'

import { insertUserParams } from '../api';
import { insertUserResponse } from '../api';
import { insertUserApiPath } from '../api'

import { loginParams } from '../api';
import { loginResponse } from '../api';
import { loginApiPath } from '../api'

import { regParams } from '../api';
import { regResponse } from '../api';
import { regApiPath } from '../api'

import { setLocal as __sL, getLocal as __gL,
setSession as __sS, getSession as __gS } from '../storage';

import { onMounted, ref } from 'vue';




    // innerPluginsGenerated
    /**************/
    
const __router = useRouter();
const __pushR = ( routername: string ) => __router.push( routername );
const __replaceR = ( routername: string ) => __router.replace( { path: routername } ); 

const __IndexPath = "/"
const __MainPath = "/main"

    
const { open: openL, close: closeL } = __loading.service({
    target: 'body',
    fullScreen: true,
    text: 'loading...',
    onClose: () => { }
});
const sesMeta = ref<{title:string, id: string}[]>();
onMounted( async () => {
    try {
        openL();
        const currentSess = await post<getSessParams, getSessResponse>( { url: getSessApiPath, payload: {} } ).then( r => r.data );
;
        if( !currentSess.push ) {
             __mes( {
                type: "error",
                text: "页面元信息加载错误..."
            } );
        } else {
            sesMeta.value = currentSess;
        }
    } catch {
        __mes( {
            type: "error",
            text: "页面元信息加载错误..."
        } );
    } finally {
        closeL();
    }
} );
const onSearch = async ( toID: string ) => {
    try {
        openL();
        const params = { toID };
        const { done, chatID } = await post<creSesParams, creSesResponse>( { url: creSesApiPath, payload: params } ).then( r => r.data );
;
        if( !done ) {
            __mes( {
                type: "warning",
                text: "此userID不存在"
            } );
        } else {
            __mes( {
                type: "success",
                text: "添加会话成功"
            } );
            sesMeta.value.push( { title: chatID, id: chatID } );
            console.log( sesMeta.value );
        }
    } catch {
        __mes( {
            type: "error",
            text: "建立新会话或搜寻用户时错误"
        } );
    } finally {
        closeL();
    }
}

</script>
<template>

    <div>
        <s-search-panel :onSearch="onSearch"></s-search-panel>
        <s-session-list :metas="sesMeta"></s-session-list>
    </div>

</template>
    