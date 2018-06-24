function clearCookie(){
    var date = new Date(); 
    date.setTime(date.getTime() - 10000); 
	document.cookie+=name + "=a; expires=" + date.toGMTString();
}
var ct=Vue.component('ct_',{
	template:`
		<div>
		    <Table border :columns="columns7" :data="this.data6"></Table>
			<Page :total="totalRecord" :page-size="pageSize" @on-change="handleChange" show-elevator></Page>
		</div>
	`,
	created:function(){
		this.load(this.setdata,0);
	},
	data:function(){	
		return{
			data6:[],
			totalRecord:0,
			pageSize:0,
            columns7: [
                {
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: '用户名',
                    key: 'username'
                },
                {
                    title: '注册时间',
                    key: 'timestamp'
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                    	let A=h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.show(params.index)
                                }
                            }
                        }, '查看');
                    	let B=h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.generate(params.index)
                                }
                            }
                        }, '设置教师');
                    	let C=h('Button', {
                            props: {
                                type: 'success',
                                size: 'small'
                            }
                        }, '教师');
                    	if(this.check(params.index)){
                            return h('div', [
                                A,C
                            ]);
                    	}else{
                            return h('div', [
                                A,B
                            ]);
                    	}
                    }
                }
            ]
		}
	},
    methods: {
        show (index) {
            this.$Modal.info({
                title: '用户信息',
                content: `	            	
                	<img src="${this.data6[index].gravater}"  style="height:50px;width:50px"/><br>
                	名字：${this.data6[index].name}<br>
                	用户名：${this.data6[index].username}<br>
                	密码：${this.data6[index].password}<br>
                	创建时间: ${this.data6[index].timestamp}
                `
            })
        },
        generate (index) {
            var user=this.data6[index].username;
            var ck=$.getUrlParam('ru');  
            var me=this;
            $.get("../backend/add_teacher",{username:user,key:ck},function(result){
            	if(result=="false"){
		            me.$Notice.error({
		                title: '修改失败.' 
		            });
            	}else{
		            me.$Notice.success({
		                title: '修改成功!'
		            });
		            me.data6[index].teacher=true;
		            me.data6[index].identified=15;
            	}
            });
        },
        check(index){
        	return this.data6[index].teacher || this.data6[index].administrator;
        },
        load(callback,index){
        	const This=this;
    		var tq,ps,tr;
    		var d6=[];
    		$.get("../backend/userlist?index="+index,function(result){
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

const routes=[
	{path:'/',component:ct}
];

const router=new VueRouter({
	routes:routes
});
new Vue({
	created:function(){
		var doc=JSON.parse(document.cookie);
		var up= $.getUrlParam('ru');  
		if(doc.b!=up || doc.b==null || up==null){
            document.location.href="../web/login.html";
		}
	},
	router,
	el:'#app',
	template:`
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>管理模块</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <router-link to="/" tag="span">用户列表</router-link>
                    </MenuItem>
                    <MenuItem name="1-3" @click.native="logout">
                        <Icon type="settings"></Icon>
                        <span >退出登录</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '85vh'}">
					<router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
	`,
        data () {
            return {
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            logout(){
            	clearCookie();
    	        setTimeout(() => {
                    document.location.href="../web/login.html";
    	        }, 1000);
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