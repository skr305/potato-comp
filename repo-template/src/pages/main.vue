
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

    
</script>
<template>

    <div>233 Main</div>

</template>
    