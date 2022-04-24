
<script setup lang="ts">
import { SButton, SDatetime, SInput, 
    SDialog, SNumberInput, SPaymentInput ,
    SRadio, SSelect, SScrollbar, 
    SCheckbox, SCheckboxButton, SCheckboxGroup, 
    SCard, STextarea ,SceneMessage, 
    SceneLoading } from 'scene-ui';
import { useRouter, useRoute } from 'vue-router';
import { post } from '../request';
import LoginParams from '../api';
import LoginResponse from '../api';
import LoginApiPath from '../api'

import DeleteUserParams from '../api';
import DeleteUserResponse from '../api';
import DeleteUserApiPath from '../api'

import InsertUserParams from '../api';
import InsertUserResponse from '../api';
import InsertUserApiPath from '../api'

import { setLocal, getLocal,
setSession, getSession } from '../storage';



    // innerPluginsGenerated
    /**************/
    
const __router = useRouter();
const __pushR = ( routername: string ) => __router.push( routername );
const __replaceR = ( routername: string ) => __router.replace( { path: routername } ); 

const __AppPath = "/app"

    
    const username = "";
    const password = "";
    post<LoginParams, LoginResponse>( { url: LoginApiPath, payload: { username, password } } ).then( r => r.data );
;

</script>
<template>

    <div></div>

</template>
    