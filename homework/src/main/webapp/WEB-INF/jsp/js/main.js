function clearCookie(){
    var date = new Date(); 
    date.setTime(date.getTime() - 10000); 
	document.cookie+=name + "=a; expires=" + date.toGMTString();
}

function emt(me){
    me.$Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'load-c',
                        size: 18
                    }
                }),
                h('div', 'Waiting...')
            ])
        }
    });
    setTimeout(() => {
        me.$Spin.hide();
    }, 1000);
}

Vue.component('t_menu',{
	template:`<div></div>`
});

Vue.component('menu_',{
	template: `
			<Menu mode="horizontal" theme="dark" active-name="1">
	            <Tooltip always :content="Tip" placement="right-end" style="height:0px;width:0px;display:inherit;">
					<div class="layout-logo">
					</div>
	            </Tooltip>
	            <div class="layout-nav">
	            	<Avatar :src="msg.gravater" :size="sz" @mouseenter.native="enter" @mouseleave.native="leave"/>
	                <MenuItem name="1">
	                    <router-link to="/" tag="p"><Icon type="ios-navigate"></Icon>
	                    主页
	                    </router-link>
	                </MenuItem>
	                <MenuItem name="2">
	                    <router-link to="/topic" tag="p"><Icon type="ios-keypad"></Icon>
	                    题目
	                    </router-link>
	                </MenuItem>
	                <MenuItem name="3">
	                    <router-link to="/status" tag="p"><Icon type="ios-analytics"></Icon>
	                    提交记录
	                    </router-link>
	                </MenuItem>
	                <MenuItem name="4">
	                    <router-link to="/info" tag="p"><Icon type="ios-paper"></Icon>
	                     个人信息
	                    </router-link>
	                </MenuItem>
	                <MenuItem name="5" @click.native="logout">
	                    <p><Icon type="paper-airplane"></Icon>
	                    退出登录
	                    </p>
	                </MenuItem>
	                <t_menu></t_menu>
	            </div>
	        </Menu>
	`,
	props:['msg'],
	data:function(){
		return{
			sz:"default",
			Tip:"你好啊"+this.msg.grade+"年级的"+this.msg.name+"小盆友~"
		}
	},
	methods:{
		logout:function(){
			clearCookie();
            document.location.href="../";
		},
		enter:function(){
			this.sz="large";
		},
		leave:function(){
			this.sz="default";
		}
	}
});

Vue.component('New_modal',{
	template:`
	    <Modal v-model="visible" :title="{{title}}">{{message}}</Modal>
	`,
	data:function(){
		return{
			visible:false
		}
	}
});

Vue.component('LHeader',{
	template:`	   
	    <breadcrumb :style="{margin: \'12px 0\'}">
        	<breadcrumb-item to="/">主页</breadcrumb-item>
        	<breadcrumb-item to="">作业</breadcrumb-item>
        	<breadcrumb-item to="/taolun" >讨论</breadcrumb-item>
        	<breadcrumb-item v-if="msg.teacher" to="/" @click.native="logtc">教师端</breadcrumb-item>
		</breadcrumb>
		`,
	props:['msg'],
	methods:{
		logtc:function(){
			window.location.href="./tc.html";
		}
	}
});

var main=Vue.component('main_',{
	template:`
		<Layout>
	    <Sider hide-trigger :style="{background: \'#fff\'}">
	    <Menu active-name="1-1" theme="light" width="auto" :open-names="[\'1\']">
	        <Submenu name="1">
	            <template slot="title">
	                <Icon type="ios-navigate"></Icon>
	                主·题·版
	            </template>
	            <MenuItem name="1-1"><router-link to="/" tag="p">主·题·页</router-link></MenuItem>
	            <MenuItem name="1-2">近·期·活·动</MenuItem>
	            <MenuItem name="1-3">知·索</MenuItem>
	        </Submenu>
	        <Submenu name="2">
	            <template slot="title">
	                <Icon type="ios-keypad"></Icon>
	                互·动·版
	            </template>
	            <MenuItem name="2-1">提·问</MenuItem>
	            <MenuItem name="2-2">建·议</MenuItem>
	        </Submenu>
	        <Submenu name="3">
	            <template slot="title">
	                <Icon type="ios-analytics"></Icon>
	                关·于·我·们
	            </template>
	            <MenuItem name="3-1"><router-link to="/union" tag="p">集合·框架</router-link></MenuItem>
	            <MenuItem name="3-2"><router-link to="/initial" tag="p">初·创</router-link></MenuItem>
	        </Submenu>
	    </Menu>
	</Sider>
	<Content :style="{padding: \'24px\', minHeight: \'280px\', background: \'#fff\'}">
		<router-view></router-view>
	</Content>
	</Layout>
	`
});

var info=Vue.component('info_',{
	template:`
		<div>
		    <Tabs>
		        <TabPane label="姓名" icon="social-apple">
		        	{{msg.name}}
		        </TabPane>
		        <TabPane label="账户" icon="social-windows">
			        用户名: {{msg.username}}<br>
			        密码: {{msg.password}}
		        </TabPane>
		        <TabPane label="头像" icon="social-tux">
		        	<img :src="msg.gravater" style="width:200px;height:200px;"></img>
		        </TabPane>
		        <TabPane label="修改头像" icon="ios-color-wand">
					  <croppa v-model="myCroppa" canvas-color="transparent"></croppa>
					  <Button @click="generateImage" type="primary">创建头像</Button>
					  <Button v-if="ok" type="primary" loading>请选择一个图片</Button>
					  <Button v-else @click="uploadCroppedImage" type="primary">确定上传</Button>	  
					  <img id="gvt" class="output" :src="imgUrl" >
		        </TabPane>
		    </Tabs>
		</div>
	`,
	data:function(){
		var doc=JSON.parse(document.cookie);
		return{
			myCroppa:null,
			msg:doc,
			imgUrl:'',
			ok:true
		}
	},
    methods: {
		uploadCroppedImage() {
			var me=this;
			var mg;
	    	$.ajax({
	    		url: "../alter_gravater",
	    		type:"POST",
	    		dataType:"json",
	    		contentType:"application/json;charset=UTF-8",
	    		data:JSON.stringify({
	    			userName:me.msg.username,
	    			token:me.msg.token,
	    			data:me.imgUrl.substring(22)
	    		}),
	    		beforeSend:function(){
	    			me.$Notice.open({
	                    title:  '正在拼命联系服务菌!!',
	                    desc:  'Checking...'
	                });
	    		},
	    		success:function(result){
	    			mg=result;
	    		},
	    		complete:function(){
	    			if(mg.status=="ok"){
		                me.$Notice.success({
		                    title: '修改成功~',
		                    desc: '重新进入中...'
		                });
		                me.msg.gravater=mg.Gravater;
		                clearCookie();
		                document.cookie=JSON.stringify(me.msg);
		                document.location.href="../web/index.html"
	    			}else if(mg.status=="id_error"){
		                me.$Notice.error({
		                    title: '身份验证失败',
		                    desc: '请重新登陆...'
		                });
	    			}else{
		                me.$Notice.warning({
		                    title: '迷之错误...QAQ',
		                    desc: '迷,请稍后重试,或换张图片...'
		                });
	    			}
	    		}
	    	});
		},
	  	generateImage: function() {
	  		let url = this.myCroppa.generateDataUrl();
		    if (!url) {
		    	alert('请选择一个图片');
		    	return;
		    }
		    this.imgUrl = url;
		    this.ok=false;
	    }
    }
});

var id=Vue.component('index',{
	template:`
	<div class="layout">
	<Layout>
	    <Header>
	    	<menu_ :msg="msg"></menu_>
	    </Header>
	    <Layout :style="{padding: \'0 50px\'}">
			<LHeader :msg="msg"></LHeader>
	        <Content :style="{padding: \'24px 0\', minHeight: \'280px\', background: \'#fff\'}">
				<router-view :msg="msg"></router-view>
	        </Content>
	    </Layout>
	    <Footer class="layout-footer-center">2018- &copy; 青岛工学院</Footer>
	</Layout>
	</div>
	</div>`,
	props:['msg']
});

var u=Vue.component('u_',{
	template:`
		<div>
	    <Alert show-icon>
	        本产品仅供交流使用,请勿商用.
	        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
	        <template slot="desc">如果只有一个星期的记忆,你会告诉我些什么呢?是你的名字,还是只有五厘米的速度...Merely one answer that ...</template>
	    </Alert>
		<Collapse v-model="value1">
	        <Panel name="1">
	            Java
	            <p slot="content">SSM</p>
	        </Panel>
	        <Panel name="2">
	            JS
	            <p slot="content">Vue、Jquery</p>
	        </Panel>
	        <Panel name="3">
	            Server
	            <p slot="content">Tomcat</p>
	        </Panel>
	      	<Panel name="4">
	            Database
	            <p slot="content">Mysql</p>
	        </Panel>
	    </Collapse>
		</div>
	`,
    data:function() {
        return {
            value1: '1'
        }
    }
});
var initial=Vue.component('ini_',{
	template:`
		<div>
	    <Timeline>
	        <TimelineItem color="green">
	            <Icon type="trophy" slot="dot"></Icon>
	            <span>2018/5/28-发布里程碑版本</span>
	        </TimelineItem>
	        <TimelineItem>发布1.0版本</TimelineItem>
	        <TimelineItem>发布2.0版本</TimelineItem>
	        <TimelineItem>发布3.0版本</TimelineItem>
	        <TimelineItem color="red">
	            <Icon type="trophy" slot="dot"></Icon>
	            <span>2018/6/24-终结版本</span>
	        </TimelineItem>
	        <TimelineItem color="blue">系统发布</TimelineItem>
	    </Timeline>
		</div>
	`
});

var page=Vue.component('page_',{
	template:`
		<div>
		<Tag closable color="#19be6b" checkable>Homework - version 2.0</Tag>
	    <Carousel autoplay :autoplay-speed="spd" v-model="value2" :height="het" style="margin-left:25%;margin-right:25%;"  dots="outside" loop>
	        <CarouselItem>
	        	<p :style="in1"></p>
	        </CarouselItem>
	        <CarouselItem>
	            <div :style="in2"></div>
	        </CarouselItem>
	        <CarouselItem>
	            <div :style="in3"></div>
	        </CarouselItem>
	        <CarouselItem>
	            <div :style="in4"></div>
	        </CarouselItem>
	    </Carousel>
        <Tag closable color="#2b85e4" checkable>Clever boy,Life was like a box of chocolates, you never know what you\'re going to get.</Tag>
		</div>
	`,
    data () {
		var df="background-size: cover;height:350px;width:600px;background-position:center center;"
        return {
            value2: 0,
            spd:5000,
            het:350,
            in1:df+"background-image: url('../images/inform/1.jpg');",
            in2:df+"background-image: url('../images/inform/2.jpg');",
            in3:df+"background-image: url('../images/inform/3.jpg');",
            in4:df+"background-image: url('../images/inform/4.jpg');",
        }
    }
});


var topic = Vue.component('topic_',{
	template:`
	<div>
	    <Tabs style="width:60%;float:left">
	        <TabPane label="一年级" icon="social-twitter-outline">
	        	<tg_ :grade="grade[0]" :uid="msg.id"></tg_>
	        </TabPane>
	        <TabPane label="二年级" icon="social-twitter">
	        	<tg_ :grade="grade[1]" :uid="msg.id"></tg_>
			</TabPane>
	        <TabPane label="三年级" icon="social-snapchat-outline">
				<tg_ :grade="grade[2]" :uid="msg.id"></tg_>
			</TabPane>
	        <TabPane label="四年级" icon="social-snapchat">
	        	<tg_ :grade="grade[3]" :uid="msg.id"></tg_>
	        </TabPane>
	        <TabPane label="五年级" icon="social-reddit-outline">
				<tg_ :grade="grade[4]" :uid="msg.id"></tg_>
			</TabPane>
	        <TabPane label="六年级" icon="social-reddit">
				<tg_ :grade="grade[5]" :uid="msg.id"></tg_>
			</TabPane>
	    </Tabs>
        <Card :bordered="false" style="width:30%;float:right;margin:30px">
            <p slot="title" style="height:100px">
				<center>
            		<Avatar :src="msg.gravater" style="width:100px;height:100px;" />
            	</center>
			</p>
			<div class="summary-block">
				<div class="summary-item">
					<div class="summary-number" style="color: rgb(103, 120, 225);">
						<span>
							<span>1092</span>&nbsp;/&nbsp;<span>1092</span>
						</span>
					</div>
					<div>
						<span>1~3年级题目</span>
					</div>
						<div>
							<span>已通过</span>&nbsp;<span class="summary-percent">100%</span>
						</div>
					</div>
					<div style="height:100px; width:5px; border-left:1px #E3E3E3 solid;"></div>
					<div class="summary-item">
					<div class="summary-number" style="color: rgb(250, 122, 145);">
						<span>
							<span>0</span>&nbsp;/&nbsp;<span>13</span>
						</span>
					</div>
					<div>
						<span>4~6年级题目</span>
					</div>
					<div>
						<span>已提交</span>&nbsp;<span class="summary-percent">0%</span>
					</div>
				</div>
			</div>
		</Card>
	</div>
	`,
	props:['msg'],
	data:function(){
		return{
			grade:[1,2,3,4,5,6]
		}
	},
	methods:{
		watch:function(){
			emt(this);
		}
	}
});


// 题目初始化
var tg=Vue.component('tg_',{
	created:function(){
		this.load(this.setdata,0);
	},
	template:`
    <div>
		<Table :columns="columns1" :data="data6" @on-row-click="show"></Table>
		<Page :total="totalRecord" :page-size="pageSize" @on-change="handleChange" style="float:right;margin-top:10px" show-elevator></Page>
    </div>
	`,
	props:['grade','uid'],
    data: function(){
        return {
        	zl:['',"数学","英语","语文","政治"],
			data6:[],
			totalRecord:0,
			pageSize:0,
			ans:0,
            columns1: [
                {
                    title: '题干',
                    key: 'content',
                    align: 'center',
                    render: (h, params) => {
                    	let A=h('Tag', {
                            props: {
                                color: 'blue'
                            },
                            style: {
                                marginRight: '5px'
                            }
                        }, '数学');
                    	let B=h('Tag', {
                            props: {
                                color: 'green'
                            },style: {
                                marginRight: '5px'
                            }
                        }, '英语');
                    	let C=h('Tag', {
                            props: {
                                color: 'red'
                            },
                            style: {
                                marginRight: '5px'
                            }
                        }, '语文');
                    	let D=h('Tag', {
                            props: {
                                color: '#EF6AFF'
                            },
                            style: {
                                marginRight: '5px'
                            }
                        }, '政治');
                    	let id=this.check(h,params.index);
                    	if(id.type==1){
                            return h('div', [
                                A,id.obj
                            ]);
                    	}else if(id.type==2){
                            return h('div', [
                                B,id.obj
                            ]);
                    	}else if(id.type==3){
                            return h('div', [
                                C,id.obj
                            ]);
                    	}else if(id.type==4){
                            return h('div', [
                                D,id.obj
                            ]);
                    	}
                    }
                },{
                	title: '分值',
                	key: 'score',
                	width: 100
                }
            ]
        }
    },
    methods:{
    	show(obj){
    		console.log(obj);
    		var me=this;
            this.$Modal.confirm({
            	title: '<p style="color:#f60;width:350px;text-align:center">'+me.zl[obj.type]+'</p>',
                render: (h) => {
                    return h('RadioGroup', {
                        props: {
                            'v-model': "this.ans",
                            vertical: true
                        },
                        on:{
                        	'on-change':(status)=>{
                        		me.ans=status;
                        	}
                        }
                    },
                    [h("span", {
                        props: {
                            label: obj.content
                          },
                          style:{
                              'font-size': '20px',
                              'text-align': 'center',
                          }
                        },"题干: "+obj.content),
                      h("Radio", {
                        props: {
                          label: "1",
                        }
                      },"A: "+obj.c[0]),
                        h("Radio", {
                          props: {
                            label: "2",
                          }
                        },"B: "+obj.c[1]),
                        h("Radio", {
                          props: {
                            label: "3",
                          }
                        },"C: "+obj.c[2]),
                        h("Radio", {
                            props: {
                              label: "4",
                            }
                        },"D: "+obj.c[3])
                      ])
                },
                onOk:()=>{
                	this.checkAns(obj.id);
                }
            })
    	},
    	checkAns(tid){
    		var me=this;
    		$.get('../student/edithomework',{topic_id:tid,uid:me.uid,answer:me.ans},function(result){
    			if(result){
	                me.$Notice.success({
	                    title: '回答正确!'
	                });
    			}else{
	                me.$Notice.error({
	                    title: '回答错误!'
	                });
    			}
    		});
    	},
    	check(h,index){
    		return {
    			type: this.data6[index].type,
    			obj: h('p',{
                    style: {
                    	width: '80%',
                        float: 'right',
                        marginTop: '5px'
                    }
    			},this.data6[index].content)
    		}
    	},
        load(callback,index){
        	const This=this;
    		var tq,ps,tr;
    		var d6=[];
    		$.get("../topic/topiclist_student?index="+index+"&grade="+This.grade,function(result){
        		tq=result;
        		for(var t in tq.dateList){
        			d6.push(tq.dateList[t]);
        		}
        		callback(tq,d6);
    		});
        },
        setdata(res,data){
        	this.data6=data;
        	this.totalRecord=res.totalRecord;
        	this.pageSize=res.pageSize;
        },
        handleChange(page) {
            this.load(this.setdata,page-1);
        }
    }
});

var sta=Vue.component('status_',{
	created:function(){
		this.init();
		this.load(this.setdata,0);
	},
	template:`
	<div>
		<Table :columns="columns1" :data="data6" @on-row-click=""></Table>
		<Page :total="totalRecord" :page-size="pageSize" @on-change="handleChange" style="float:right;margin-top:10px" show-elevator></Page>
    </div>
	`,
	data:function(){
		return{
			uid:null,
			data6:[],
			totalRecord:0,
			pageSize:0,
			ans:0,
            columns1: [
            	{
            		title: '题目id',
            		key: 'id',
            		width: 100
            	},{
            		title: '姓名',
            		align:'center',
            		render: (h)=>{
            			return h('div',[
            					this.getname(h)
                        	]);
            		}
            	},
                {
                    title: '状态',
                    key: 'status',
                    render:(h,params)=>{
                    	let AC=h('Tag', {
                            props: {
                                color: '#5eb95e'
                            },
                            style: {
                                marginRight: '5px'
                            }
                        }, 'Accept');
                    	let WA=h('Tag', {
                            props: {
                                color: '#e74c3c'
                            },
                            style: {
                                marginRight: '5px'
                            }
                        }, 'Wrong Answer');
                    	let obj=this.check(h,params.index);
                    	if(obj.type==1){
                        	return h('div',[
                        		AC
                        	]);      		
                    	}else{
                        	return h('div',[
                        		WA
                        	]);
                    	}

                    }
                },{
                	title: '提交时间',
                    align: 'center',
                	key: 'timestamp'
                }
            ]
		}
	},
	methods:{
		init(){
			var ob=JSON.parse(document.cookie);
			this.uid=ob.id;
			this.uname=ob.name;
		},
		load(callback,index){
	    	const This=this;
			var tq,ps,tr;
			var d6=[];
			$.get("../student/findrecord",{id:This.uid,index:index},function(result){
	    		tq=result;
	    		for(var t in tq.dateList){
	    			d6.push(tq.dateList[t]);
	    		}
	    		callback(tq,d6);
			});
        },
        setdata(res,data){
        	this.data6=data;
        	this.totalRecord=res.totalRecord;
        	this.pageSize=res.pageSize;
        },
        handleChange(page) {
            this.load(this.setdata,page-1);
        },    	
        check(h,index){
    		return {
    			type: this.data6[index].status
    		}
    	},
    	getname(h){
    		if(this.u_obj){
    			return this.u_obj;
    		}else{
    			this.u_obj=h('p',{
                    style: {
                        marginTop: '5px'
                    }
    			},this.uname);
    			return this.u_obj;
    		}
    	}
	}
});

const routes=[
	{
		path:'/',component:main,
		children:[
			{
				path:'/',
				component:page
			},
			{
				path:'/union',
				component:u
			},{
				path:'/initial',
				component:initial
			},{
				path:'/info',
				component:info
			}
		]
	},{
		path:'/topic',component:topic,
	},{
		path:'/status',component:sta
	}
];

const router=new VueRouter({
	routes:routes
});
Vue.use(Croppa);

const app=new Vue({
	router,
	el:'#app',
	data:function(){
		var ck=JSON.parse(document.cookie);
		this.$Message.config({
		    top: 70,
		    duration: 10
		});
        this.$Notice.config({
            top: 70,
            duration: 3
        });
        this.$Notice.info({
            title: '呦,'+ck.name+',又要开始新的一天啦!',
            desc: '偷偷给你点学习资料:'+'http://www.baidu.com',
            duration: 0
        });
		return{
			msg:ck
		}
	},
	watch: {//使用watch 监听$router的变化
	    $route(to, from) {
	        this.$Spin.show({
	            render: (h) => {
	                return h('div', [
	                    h('Icon', {
	                        'class': 'demo-spin-icon-load',
	                        props: {
	                            type: 'load-c',
	                            size: 18
	                        }
	                    }),
	                    h('div', 'Loading')
	                ])
	            }
	        });
	        setTimeout(() => {
	            this.$Spin.hide();
	        }, 1000);
	    }
	  }
});