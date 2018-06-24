package com.homework.controller;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.homework.pojo.User;
import com.homework.service.TeacherService;
import com.homework.service.UserService;
import com.homework.util.Page;
import com.homework.util.token;
import com.homework.util.tools;

//告诉spring mvc这是一个控制器类
@Controller
@RequestMapping("")
public class UserController {
	@Autowired
	UserService userService;
	@Autowired
	TeacherService teacherService;
	///加token,未设时限
	@RequestMapping("/checkUser")
	@ResponseBody
	public String check(@RequestBody Map<String,String> map){
		String username=map.get("userName");
		String password=map.get("passWord");
		String TimeStamp=tools.Get_TimeStamp();
		System.out.println("刚才("+TimeStamp+")访问的是: "+username+" : "+password);
		User us=userService.get_by_username(username);
		JSONObject json=new JSONObject();
		if(us==null){
			json.put("result", "not_exist");
			return json.toJSONString();
		}else{
			if(us.getPassword().equals(password)){
				//登入成功,置入新token
				us.setToken(token.generate_token(username, password, TimeStamp));
				userService.update(us);
				json=JSONObject.parseObject(JSONObject.toJSON(us).toString());
				if(us.isTeacher()){
					json.put("tid", teacherService.selectByID(us.getId()));
				}
				json.put("result", "ok");
				System.out.println(json.toJSONString());
				return json.toJSONString();
			}else{
				json.put("result", "invilid_password");
				return json.toJSONString();
			}
		}
	}
	
	@RequestMapping("/AddUser")
	@ResponseBody
	public String add_user(@RequestBody Map<String,String> map){
		System.out.println("Regist");
		String username=map.get("userName");
		String password=map.get("passWord");
		String TimeStamp=tools.Get_TimeStamp();
		String name=map.get("Name");
		int grade=map.get("Grade")==null?-1:Integer.parseInt(map.get("Grade"));
		User us=userService.get_by_username(username);
		JSONObject json=new JSONObject();
		if(us!=null){
			json.put("result", "exist");
			return json.toJSONString();
		}else if(name.equals("") || username.equals("") || password.equals("") || grade==-1){
			json.put("result", "fail");
			return json.toJSONString();
		}else{
			us=new User();
			us.setGrade(grade);
			us.setTimestamp(TimeStamp);
			us.setName(name);
			us.setUsername(username);
			us.setPassword(password);
			us.setGravater(tools.Default_Gravater);
			us.setIdentified(tools.Default_Identified);
			userService.add(us);
			us=userService.get_by_username(username);
			if(us==null){
				json.put("result", "fail");
				return json.toJSONString();
			}else{
				json=JSONObject.parseObject(JSONObject.toJSON(us).toString());
				json.put("result", "ok");
				System.out.printf("在%s,%s注册成功!\n",TimeStamp,username);
				return json.toJSONString();
			}
		}
	}
	
	@RequestMapping("")
	public String index(){
		System.out.println("IN");
		return "redirect:/web/login.html";
	}
	
	@RequestMapping("/alter_gravater")
	@ResponseBody
	public String agt(@RequestBody Map<String,String> map){
		String username=map.get("userName");
		String token=map.get("token");
		String data=map.get("data");
		JSONObject json=new JSONObject();
		User us=userService.get_by_username(username);
		if(us==null||!token.equals(us.getToken())){
			json.put("status", "id_error");
			return json.toJSONString();
		}
		String classpath = this.getClass().getResource("/").getPath().replaceFirst("/", "");
		String webappRoot = classpath.replaceAll("WEB-INF/classes/", "");
		System.out.println(username+"修改头像!");
		if(tools.GenerateImage(data, username, webappRoot)){
			String url="../images/Gravater/"+username+".jpg"+"?rdm="+tools.rand.nextInt(100);
			json.put("status","ok");
			json.put("Gravater", url);
			us.setGravater(url);
			userService.update(us);
			System.out.println(username+"Alter Gravater Success!");
			return json.toJSONString();
		}else{
			json.put("status","fail");
			System.out.println(username+"Alter Gravater fail!");
			return json.toJSONString();
		}
	}
}
