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
                h('div', '正在登出...')
            ])
        }
    });
    setTimeout(() => {
        me.$Spin.hide();
    }, 1000);
}
var ct=Vue.component('ct_',{
	template:`
		<div>
		    <Table border :columns="columns7" :data="this.data6"></Table>
			<Page :total="totalRecord" :page-size="pageSize" @on-change="handleChange" style="margin-top:10px" show-elevator></Page>
		</div>
	`,
	created:function(){
		var doc=JSON.parse(document.cookie);
		this.load(this.setdata,0,doc.tid);
		this.setGravater(doc.gravater);
	},
	data:function(){	
		return{
			data6:[],
			totalRecord:0,
			pageSize:0,
            columns7: [
                {
                    title: '题干概述',
                    key: 'content',
                    render: (h, params) => {
                    	console.log(params);
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'document-text'
                                }
                            }),
                            h('strong', " "+params.row.content)
                        ]);
                    }
                },
                {
                    title: '所属年级',
                    key: 'grade'
                },
                {
                    title: 'ID',
                    key: 'id'
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 200,
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
                                    this.del(params.index)
                                }
                            }
                        }, '删除');
                    	let C=h('Button', {
                            props: {
                                type: 'success',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                        }, '编辑');
                        return h('div', [
                            A,C,B
                        ]);
                    }
                }
            ]
		}
	},
    methods: {
        show (index) {
            this.$Modal.info({
                title: '题目信息',
                content: `	           
                	<img src="${this.gravater}"  style="height:50px;width:50px"/><br>
                	题干：${this.data6[index].content}<br>
                	选项A：${this.data6[index].c[0]}<br>
                	选项B：${this.data6[index].c[1]}<br>
                	选项C：${this.data6[index].c[2]}<br>
                	选项D：${this.data6[index].c[3]}<br>
                	答案：${this.data6[index].answer}<br>
                	分值: ${this.data6[index].score}<br>
                	题解: ${this.data6[index].analysis}<br>
                `
            })
        },
        del (index) {
            var pid=this.data6[index].id;
            var me=this;
            $.get("../topic/delete?id="+pid,function(result){
            	if(result.result==false){
		            me.$Notice.error({
		                title: '修改失败.' 
		            });
            	}else{
		            me.$Notice.success({
		                title: '修改成功!'
		            });
		            me.load(me.setdata,me.page-1,me.tid);
            	}
            });
        },
        check(index){
        	return this.data6[index].teacher || this.data6[index].administrator;
        },
        load(callback,index,tid){
        	const This=this;
        	this.page=index+1;
        	This.tid=tid;
    		var tq,ps,tr;
    		var d6=[];
    		$.get("../topic/topiclist?index="+index+"&tid="+tid,function(result){
        		tq=result;
        		console.log(tq);
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
        	console.log(page);
        	this.page=page;
            this.load(this.setdata,page-1,this.tid);
        },
        setGravater(url){
        	this.gravater=url;
        }
    }
});

var tk=Vue.component('tk_',{
	template:`
	<Form :model="formItem" :label-width="80" style="margin:30px">
        <FormItem label="题干:">
            <Input v-model="formItem.content" placeholder="请在此处输入题干..." type="textarea" style="width:20%"></Input>
        </FormItem>
        <FormItem label="年级:">
            <Select v-model="formItem.grade" style="width:20%">
                <Option value="1">一年级</Option>
                <Option value="2">二年级</Option>
                <Option value="3">三年级</Option>
                <Option value="4">四年级</Option>
                <Option value="5">五年级</Option>
                <Option value="6">六年级</Option>
            </Select>
        </FormItem>
        <FormItem label="选项:">
            <Input v-model="formItem.c1" style="width:20%" placeholder="A选项..."></Input>
            <Input v-model="formItem.c2" style="width:20%" placeholder="B选项..."></Input>
            <Input v-model="formItem.c3" style="width:20%" placeholder="C选项..."></Input>
            <Input v-model="formItem.c4" style="width:20%" placeholder="D选项..."></Input>
        </FormItem>
        <FormItem label="正确答案:">
            <RadioGroup v-model="formItem.answer">
                <Radio label="1">{{formItem.c1}}</Radio>
                <Radio label="2">{{formItem.c2}}</Radio>
                <Radio label="3">{{formItem.c3}}</Radio>
                <Radio label="4">{{formItem.c4}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="题目类型:">
            <RadioGroup v-model="formItem.type">
                <Radio label="1">数学</Radio>
                <Radio label="2">英语</Radio>
                <Radio label="3">语文</Radio>
                <Radio label="4">政治</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="解析:">
            <Input v-model="formItem.analysis" placeholder="请在此处输入解析..." type="textarea" style="width:20%"></Input>
        </FormItem>
        <FormItem label="分值:">
			<Slider v-model="formItem.score" style="width:30%" show-input></Slider>
        </FormItem>
        <FormItem>
            <Button type="primary" @click.native="up">添加</Button>
            <router-link to="/" tag="span"><Button type="ghost" style="margin-left: 8px">取消</Button></router-link>
        </FormItem>
    </Form>
	`,
	props:['tid'],
	data () {
		return {
		    formItem: {
		        content: '',
		        grade: 1,
		        answer: 1,
		        type: 1,
		        analysis: '',
		        score: 0,
			    c1:'',
			    c2:'',
			    c3:'',
			    c4:''
		    }
		}
	},
	methods:{
		up:function(){
			var me=this;
			var mg;
			var ts=me.formItem;
			if(!me.allExt(ts) || me.tid==null){
    			me.$Notice.error({
                    title:  '不能为空!!',
                });
				return;
			}
			$.ajax({
				url: "../topic/publish",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data:JSON.stringify({
					teacherid:me.tid,
					content:ts.content,
					grade:parseInt(ts.grade),
					answer:ts.answer,
					type:parseInt(ts.type),
					analysis:ts.analysis,
					score:parseInt(ts.score),
					choices:ts.c1+","+ts.c2+","+ts.c3+","+ts.c4
				}),
				beforeSend:function(){
	    			me.$Notice.open({
	                    title:  '正在上传题目!!',
	                    desc:  'Uploading...'
	                });
	    		},
	    		success:function(result){
	    			mg=result;
	    			console.log(result);
	    		},
	    		complete:function(){
	    			if(mg.status=="ok"){
		    			me.$Notice.success({
		                    title:  '上传成功!!',
		                });
	    			}else{
		    			me.$Notice.error({
		                    title:  '上传失败!!',
		                });
	    			}
	    		}
			});
			//ajaxend
		},
		allExt: function(obj){
			for(var i in obj){
				if(obj[i]==null){
					return false;
				}
			}
			return true;
		}
	}
});


const routes=[
	{path:'/',component:ct},
	{path:'/tk',component:tk}
];

const router=new VueRouter({
	routes:routes
});
new Vue({
	created:function(){
		var doc=JSON.parse(document.cookie); 
		if(!doc.teacher || doc==null){
            document.location.href="../web/login.html";
		}
		this.setTid(doc.tid);
	},
	router,
	el:'#app',
	template:`
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <router-link to="/" tag="span">管理题目</router-link>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <router-link to="/tk" tag="span">出题</router-link>
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
					<router-view :tid="tid"></router-view>
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
            },
            setTid(tid){
            	this.tid=tid;
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