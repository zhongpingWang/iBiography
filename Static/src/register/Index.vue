<template>
<div id="registerBox">

    <div class="tBox">
        
        <div class="header">
            注册
        </div>

          <div class="sItem">
            <span class="title">_id</span>
            <input type="text" v-model="txtId" class="txtName"/>
        </div>

        <div class="sItem">
            <span class="title">用户名</span>
            <input type="text" v-model="txtName" class="txtName"/>
        </div>

        <div class="sItem">
            <span class="title">密码</span>
            <input type="text" v-model="txtPwd" class="txtPwd"/>
        </div>

        <div class="sItem">
            <span class="title">年龄</span>
            <input type="text" v-model="txtAge" class="txtAge"/>
        </div>

        <div class="sItem">
            <span class="title">地址</span>
            <input type="text" v-model="txtAdress" class="txtAdress"/>
        </div>

        <div class="btnSubmit" @click="_regSubmit">
            提交
        </div>

        <div class="btnSubmit" @click="_updateUser">
            更新
        </div>

        

    </div>

    <div class="tBox">
        <ul>
            <li :key="'u_'+index" v-for="(item,index) in RegisterStore.UserList">
                  <span class="uName">{{item._id}}</span>
                <span class="uName">{{item.userName}}</span>
                <span class="upwd">{{item.passWord}}</span>
                <span class="uAge">{{item.age}}</span>
                <span class="uAddress">{{item.address}}</span>
                <span title="删除" @click="_delUser(item)">  删除</span>
            </li>
        </ul>
         <div class="btnFetch" @click="_fetchUser">
            获取
        </div>
    </div>
     
    <div class="tBox">
        <button @click="_getMe">我是谁</button>
         <button @click="_login">登录</button>
         <button @click="_loginOut">退出</button>
    </div>
     

</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import "./Index.less"

export default {

    data() {
        return {
            txtId:'',
            txtName: '',
            txtPwd: '',
            txtAge: '',
            txtAdress: ''
        }
    },

    computed: {
        ...mapGetters({
            RegisterStore: "RegisterStore/RegisterStore",
        })
    },

    methods: {
        ...mapActions({
            regiterUser: "RegisterStore/regiterUser",
            fetchUser:"RegisterStore/fetchUser",
            delUser:"RegisterStore/delUser",
            updateUser:"RegisterStore/updateUser",
           
        }),

        _getMe(){
             $.get({
                url:"/ibiography/userinfo/me"
            });
        },

        _login(){

             $.post({
                 url:"/ibiography/userinfo/login",
                 data:{
                     _id:this.txtId
                 }
             });
        },

        _loginOut(){
            $.get({
                url:"/ibiography/userinfo/loginout"
            });
        },

        _regSubmit() {

            var data = {
                userName: this.txtName,
                passWord: this.txtPwd,
                age: this.txtAge,
                address: this.txtAdress,
                posi: "-",
            }

            this.regiterUser({data});

        },

        //获取
        _fetchUser(){
            this.fetchUser();
        },
        
        //删除用户
        _delUser(item){

            this.delUser({
               data:{ _id:item._id}
            });
        },

        //更新用户
        _updateUser(){

            var data = {
                _id:this.txtId,
                userName: this.txtName,
                passWord: this.txtPwd,
                age: this.txtAge,
                address: this.txtAdress
               
            }

            this.updateUser({data});
        }
    },

    mounted() {

    },

}
</script>
