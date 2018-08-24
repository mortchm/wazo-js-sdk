!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("axios"),require("sip.js")):"function"==typeof define&&define.amd?define(["axios","sip.js"],t):e["@wazo/sdk"]=t(e.axios,e.SIP)}(this,function(e,t){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t;var a={server:null,token:null};var n=t=>{const n=`https://${a.server}/api/auth/0.1/token`,o={backend:t.backend||"wazo_user",expiration:t.expiration||3600},i={auth:{username:t.username,password:t.password}};e.post(n,o,i).then(e=>((e,t)=>{a.token=e.data.data.token,t&&t(a.token)})(e,t.callback))};var o=t=>{if(a.token){const n=`https://${a.server}/api/auth/0.1/token/${a.token}`;e.delete(n).then((e=>{a.token=null,e&&e(a.token)})(t.callback))}};const i=(e,t)=>{a.data=e.data,404===e&&(a.data={error:"Token is not found"}),204===e&&(a.data={message:"Token is found"}),t&&t(a.data)};const s=["STATUS_NULL","STATUS_NEW","STATUS_CONNECTING","STATUS_CONNECTED","STATUS_COMPLETED"];return{client:class{constructor(e){this.logIn=n,this.logOut=o,this.server=e}},init:e=>{a.server=e.server},logIn:n,logOut:o,checkAuth:t=>{const n=`https://${a.server}/api/auth/0.1/token/${t.token}`;e.head(n,{validateStatus:e=>{i(e,t.callback)}}).then(e=>i(e,t.callback)).catch(e=>i(e,t.callback))},calls:t=>{const n=`https://${a.server}/api/ctid-ng/1.0/applications/${t.applicationUuid}/calls`,o={headers:{"X-Auth-Token":t.token,"Content-Type":"application/json"}};e.get(n,o).then(e=>((e,t)=>{a.data=e.data,t&&t(a.data)})(e,t.callback))},hangupCall:t=>{const n=`https://${a.server}/api/ctid-ng/1.0/applications/${t.applicationUuid}/calls/${t.callID}`,o={headers:{"X-Auth-Token":t.token,"Content-Type":"application/json"}};e.delete(n,o).then(e=>((e,t)=>{a.data=e.data,t&&t(a.data)})(e,t.callback))},answerCall:t=>{const n=`https://${a.server}/api/ctid-ng/1.0/applications/${t.applicationUuid}/nodes`,o={calls:[{id:t.callID}]},i={headers:{"X-Auth-Token":t.token,"Content-Type":"application/json"}};e.post(n,o,i).then(o=>{const s=o.data.uuid;e.post(`${n}/${s}/calls`,{context:"default",exten:"8000",autoanswer:!0},i).then(e=>{((e,t)=>{a.data=e.data,t&&t(a.data)})(e,t.callback)})})},listNodes:t=>{const n=`https://${a.server}/api/ctid-ng/1.0/applications/${t.applicationUuid}/nodes`,o={headers:{"X-Auth-Token":t.token,"Content-Type":"application/json"}};e.get(n,o).then(e=>((e,t)=>{a.data=e.data,t&&t(a.data)})(e,t.callback))},listCallsNodes:t=>{const n=`https://${a.server}/api/ctid-ng/1.0/applications/${t.applicationUuid}/nodes/${t.nodeUuid}`,o={headers:{"X-Auth-Token":t.token,"Content-Type":"application/json"}};e.get(n,o).then(e=>((e,t)=>{a.data=e.data,t&&t(a.data)})(e,t.callback))},removeCallNodes:t=>{const n=`https://${a.server}/api/ctid-ng/1.0/applications/${t.applicationUuid}/nodes/${t.nodeUuid}/calls/${t.callId}`,o={headers:{"X-Auth-Token":t.token,"Content-Type":"application/json"}};e.delete(n,o).then(e=>((e,t)=>{a.data=e.data,t&&t(a.data)})(e,t.callback))},playCall:t=>{const n=`https://${a.server}/api/ctid-ng/1.0/applications/${t.applicationUuid}/calls/${t.callID}/play`,o={headers:{"X-Auth-Token":t.token,"Content-Type":"application/json"}},i={language:t.language,uri:t.uri};e.post(n,i,o).then(e=>((e,t)=>{a.data=e.data,t&&t(a.data)})(e,t.callback))},WebRTCPhone:class{constructor(e,t){this.config=e,this.ua=this.configureUa(),this.callback=t}configureUa(){const e=new t.Web.Simple(this.getConfig());return e.on("registered",()=>{this.callback("phone-events-registered")}),e.on("unregistered",()=>{this.callback("phone-events-unregistered")}),e.on("new",e=>{const t={callerid:function(e){return{caller_id_name:e.remoteIdentity.displayName,caller_id_number:e.remoteIdentity.uri.user}}(e),autoanswer:function(e){return!!e.getHeader("alert-info")}(e.request)};this.callback("phone-events-new",t)}),e.on("ringing",()=>{this.callback("phone-events-ringing")}),e.on("connected",()=>{this.callback("phone-events-connected")}),e.on("ended",()=>{this.callback("phone-events-ended")}),e}getConfig(){return{media:{remote:{audio:this.config.media.audio}},ua:{traceSip:!1,displayName:this.config.displayName,uri:this.config.uri,wsServers:this.config.wsServers,authorizationUser:this.config.authorizationUser,password:this.config.password,sessionDescriptionHandlerFactoryOptions:{peerConnectionOptions:{iceCheckingTimeout:500,rtcpMuxPolicy:"negotiate",rtcConfiguration:{iceServers:{urls:["stun:stun.l.google.com:19302","stun:stun1.l.google.com:19302"]}}}}}}}getState(){return s[this.ua.state]}call(e){/^\+?[0-9#*]+$/.exec(e)&&this.ua.call(e)}answer(){this.ua.answer()}reject(){this.ua.reject()}hangup(){this.ua.hangup()}}}});
