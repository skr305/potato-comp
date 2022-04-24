
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



    // innerPluginsGenerated
    /**************/
    
const __router = useRouter();
const __pushR = ( routername: string ) => __router.push( routername );
const __replaceR = ( routername: string ) => __router.replace( { path: routername } ); 

const __IndexPath = "/"
const __MainPath = "/main"

    

    const onLogin = ( p: { userID: string, pwd: string } ) => post<loginParams, loginResponse>( { url: loginApiPath, payload: p } ).then( r => r.data );
;
    const onReg = ( p: { userID: string, pwd: string, userNick: string } ) => post<regParams, regResponse>( { url: regApiPath, payload: p } ).then( r => r.data );
; 
    const onRegSuc = ( userID: string ) => {
        __mes( {
            type: "success",
            text: "注册完成，跳转..."
        } );
        __pushR( __MainPath );
        __sS( "__userID",  userID );
    };

</script>
<template>

    <s-login-reg
    :onLogin="onLogin"
    :onReg="onReg"
    :onRegSuc="onRegSuc"
    >
    </s-login-reg>

</template>
    