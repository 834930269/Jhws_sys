function clearCookie(){
    var date = new Date(); 
    date.setTime(date.getTime() - 10000); 
	document.cookie+=name + "=a; expires=" + date.toGMTString();
}
var lg=Vue.component('in_',{
	created:()=>{
		clearCookie();
	},
	template:`
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" style="float:left;width:50%;">登录</Button>
                            <router-link to="/regist"><Button type="default" style="float:right;width:50%" @click="open()">注册</Button></router-link>
                        </FormItem>
                    </Form>
                    <p class="login-tip">Welcome To ~ 小学僧</p>
                </div>
            </Card>
        </div>
    </div>`,
    data:function() {
	       return{
	        message: 'None',
	    	form: {
	            userName: '',
	            password: ''
	        },
	        rules: {
	            userName: [
	                { required: true, message: '账号不能为空', trigger: 'blur' }
	            ],
	            password: [
	                { required: true, message: '密码不能为空', trigger: 'blur' }
	            ]
	        }
	       }
	},
	methods: {
	    handleSubmit: function(){
	    	//在原型链最上层获取this
	    	var me=this;
	    	var msg;
	    	var user=this.form.userName;
	    	var password=this.form.password;
	    	$.ajax({
	    		url: "../checkUser",
	    		type:"POST",
	    		dataType:"json",
	    		contentType:"application/json;charset=UTF-8",
	    		data:JSON.stringify({
	    			userName:user,
	    			passWord:password
	    		}),
	    		beforeSend:function(){
	    			me.$Notice.open({
	                    title:  '正在拼命联系服务菌!!',
	                    desc:  'Checking...'
	                });
	    		},
	    		success:function(result){
	    			msg=result;
	    			me.message=msg.result;
	    		},
	    		complete:function(){
	    			if(me.message=="ok"){
		                me.$Notice.success({
		                    title: '登陆成功~',
		                    desc: '正在连线快乐星球的老顽童爷爷~'
		                });
		                me.setCookie(msg);
		                document.location.href="../web/index.html"
	    			}else if(me.message=="not_exist"){
		                me.$Notice.error({
		                    title: '登陆失败...TAT',
		                    desc: '你是不是忘记加入快乐星球了啊...'
		                });
	    			}else{
		                me.$Notice.warning({
		                    title: '密码错了...QAQ',
		                    desc: '原谅前端猿懒得加改密码...已祭天...'
		                });
	    			}
	    		}
	    	});
	    },
	    open: function(){
            this.$Notice.open({
                title:  '欢迎注册~',
                desc: '好孩子就要一起加入小学僧哦!'
            });
	    },
		setCookie:function(msg){
            console.info(msg);
            document.cookie=JSON.stringify(msg);
            console.info(document.cookie);
		},
        //获取cookie
        getCookie: function (cname) {
            var msg = JSON.parse(document.cookie);
            console.info(msg);
            return msg;
        },
        //清除cookie
        clearCookie: function () {
			clearCookie();
        },
        checkCookie: function (usname) {
            var msg = JSON.parse(document.cookie);
            console.log(msg);
            if(msg.username==usname)return true;
            else return false;
        }
	}
});



var reg=Vue.component('reg_',{
	template:`
	    <div class="login" @keydown.enter="handleSubmit">
	        <div class="login-con">
	            <Card :bordered="false">
	                <p slot="title">
	                    <Icon type="log-in"></Icon>
	                    欢迎注册
	                </p>
	                <div class="form-con">
	                    <Form ref="loginForm" :model="form" :rules="rules">
	                        <FormItem prop="name">
	                            <Input v-model="form.name" placeholder="请输入你的真实姓名~">
	                                <span slot="prepend">
	                                    <Icon :size="14" type="at"></Icon>
	                                </span>
	                            </Input>
	                        </FormItem>
	                        <FormItem prop="userName">
	                            <Input v-model="form.userName" placeholder="请输入用户名">
	                                <span slot="prepend">
	                                    <Icon :size="16" type="person"></Icon>
	                                </span>
	                            </Input>
	                        </FormItem>
	                        <FormItem prop="password">
	                            <Input type="password" v-model="form.password" placeholder="请输入密码">
	                                <span slot="prepend">
	                                    <Icon :size="14" type="locked"></Icon>
	                                </span>
	                            </Input>
	                        </FormItem>
	                        <FormItem prop="grade">
								<Select v-model="form.grade" placeholder="请问你是几年级的~?">
					                <Option value="1">一年级</Option>
					                <Option value="2">二年级</Option>
					                <Option value="3">三年级</Option>
					                <Option value="4">四年级</Option>
					                <Option value="5">五年级</Option>
					                <Option value="6">六年级</Option>
					            </Select>
	                        </FormItem>
	                        <FormItem>
	                            <router-link to="/login"><Button type="default" style="float:left;width:50%;" @click="open()">登录</Button></router-link>
	                            <Button @click="handleSubmit" type="primary" style="float:right;width:50%">注册</Button>
	                        </FormItem>
	                    </Form>
	                    <p class="login-tip">Welcome To ~ 小学僧</p>
	                </div>
	            </Card>
	        </div>
	    </div>`,
	    methods:{
	    	handleSubmit:function(){
	    		var me=this;
		    	var msg;
		    	var user=this.form.userName;
		    	var password=this.form.password;
		    	var name=this.form.name;
		    	var grade=this.form.grade;
		    	$.ajax({
		    		url: "../AddUser",
		    		type:"POST",
		    		dataType:"json",
		    		contentType:"application/json;charset=UTF-8",
		    		data:JSON.stringify({
		    			userName:user,
		    			passWord:password,
		    			Name:name,
		    			Grade:grade
		    		}),
		    		beforeSend:function(){
		    			me.$Notice.open({
		                    title:  '正在拼命联系服务菌!!',
		                    desc:  'Checking...'
		                });
		    		},
		    		success:function(result){
		    			msg=result;
		    			me.message=msg.result;
		    		},
		    		complete:function(){
		    			if(me.message=="ok"){
			                me.$Notice.success({
			                    title: '注册成功~',
			                    desc: '请登录~'
			                });
			                router.go(-1);
		    			}else if(me.message=="exist"){
			                me.$Notice.warning({
			                    title: '注册失败...TAT',
			                    desc: '已经有重名(用户名)的小盆友入住快乐星球啦...换一个用户名吧~'
			                });
		    			}else{
			                me.$Notice.error({
			                    title: '此乃错误信息...QAQ',
			                    desc: '请输入完整的信息.或者,原谅程序猿...已祭天...'
			                });
		    			}
		    		}
		    	});	
	    	},
	    	open:function(nodesc){
	            this.$Notice.open({
	                title: 'Remote to 注册^_^' ,
	                desc: '好孩子就要一起加入小学僧哦!'
	            });
	    	}
	    },
	    data:function() {
		       return{
		        message: 'None',
		    	form: {
		            userName: '',
		            password: '',
		            name: '',
		            grade: null
		        },
		        rules: {
		            name: [
		                { required: true, message: '姓名不能为空', trigger: 'blur' }
		            ],
		            grade: [
		                { required: true, message: '年级不能为空', trigger: 'blur' }
		            ],
		            userName: [
		                { required: true, message: '账号不能为空', trigger: 'blur' }
		            ],
		            password: [
		                { required: true, message: '密码不能为空', trigger: 'blur' }
		            ]
		        }
		       }
		}
});

var admin=Vue.component('admin_',{
	template:`
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    管理员登入
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">Welcome To ~ 小学僧</p>
                </div>
            </Card>
        </div>
    </div>`,
    data:function() {
	       return{
	        message: 'None',
	    	form: {
	            userName: '',
	            password: ''
	        },
	        rules: {
	            userName: [
	                { required: true, message: '账号不能为空', trigger: 'blur' }
	            ],
	            password: [
	                { required: true, message: '密码不能为空', trigger: 'blur' }
	            ]
	        }
	       }
	},
	methods: {
	    handleSubmit: function(){
	    	//在原型链最上层获取this
	    	var me=this;
	    	var msg;
	    	var user=this.form.userName;
	    	var password=this.form.password;
	    	$.get("../backend/in?username="+user+"&Password="+password,function(result){
	    		if(result=="deny"){
		            me.$Notice.error({
		                title: '权限不足' ,
		                desc: '请确认您的账号是否有权限!'
		            });
	    		}else{
		            me.$Notice.success({
		                title: '确认成功!' 
		            });
		            var ck=
		            {
		            	a:"管理员",
		            	b:result
		            };
		            document.cookie=JSON.stringify(ck);
	                document.location.href="../web/backend.html?ru="+result;
	    		}
	    	});
	    }
	}
});


const routes=[
	{path:'/',component:lg},
	{path:'/login',component:lg},
	{path:'/regist',component:reg},
	{path:'/backend',component:admin}
]

const router=new VueRouter({
	routes:routes
})

new Vue({
	cretead:function(){
		this.DelCookie();
	},
	router,
	el:'#app',
	template:`
	<router-view></router-view>`,
	methods:{
		DelCookie:function(){
			clearCookie();
		}
	}
});
clearCookie();