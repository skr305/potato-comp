
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

import { getMesParams } from '../api';
import { getMesResponse } from '../api';
import { getMesApiPath } from '../api'

import { sendMesParams } from '../api';
import { sendMesResponse } from '../api';
import { sendMesApiPath } from '../api'

import { recvMesParams } from '../api';
import { recvMesResponse } from '../api';
import { recvMesApiPath } from '../api'

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

const __ChatPath = "/chat"
const __IndexPath = "/"
const __MainPath = "/main"

    

const chatID = __gS( 'curChatID' ) as string;
const mes = ref<Array<{content: string, isMe: boolean}>>( [] );


const { open: openL, close: closeL } = __loading.service({
    target: 'body',
    fullScreen: true,
    text: 'loading...',
    onClose: () => { }
});
onMounted( async () => {
    try {
        openL();
        const historyMes = await post<getMesParams, getMesResponse>( { url: getMesApiPath, payload: { chatID } } ).then( r => r.data );
;
        mes.value = historyMes;
    } catch {
        __mes( {
            type: "error",
            text: "历史信息加载错误..."
        } );
    } finally {
        closeL();
    }
} );
const send = ( p: { chatID: string, message: string } ) => {
    const date = String( new Date().getTime() );
    return post<sendMesParams, sendMesResponse>( { url: sendMesApiPath, payload: { ...p, date } } ).then( r => r.data );

};
const receive = ( p: { chatID: string } ) => {
    return post<recvMesParams, recvMesResponse>( { url: recvMesApiPath, payload: p } ).then( r => r.data );
;
};

</script>
<template>

    <div>
        <s-chat :chatID="chatID" :send="send" :receive="receive" ></s-chat>
    </div>

</template>
    