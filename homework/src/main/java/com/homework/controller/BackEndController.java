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
import com.homework.pojo.Teacher;
import com.homework.pojo.User;
import com.homework.service.TeacherService;
import com.homework.service.UserService;
import com.homework.util.Page;
import com.homework.util.token;
import com.homework.util.tools;

@Controller
@RequestMapping("backend")
public class BackEndController {
	@Autowired
	UserService userService;
	@Autowired
	TeacherService teacherService;
	
    @RequestMapping("/userlist")
    @ResponseBody
    public Page<User> getAll(int index) {
    	System.out.println("我进来了,index是: "+index);
        Page<User> page1 = userService.getAllUser(index,tools.per_page_size);
        return page1;
    }
    
    @RequestMapping("/add_teacher")
    @ResponseBody
    public String add_teacher(String username,String key){
    	if(key.equals(tools.getkey())){
    		User user=userService.get_by_username(username);
    		user.setIdentified(15);
    		userService.update(user);
    		Teacher te=new Teacher(user.getId());
    		teacherService.add(te);
    		return "true";
    	}else{
    		return "false";
    	}
    }
    
	@RequestMapping("/in")
	@ResponseBody
	public String ck(String username,String Password){
		System.out.println(username+" "+Password);
		User us=userService.get_by_username(username);
		if(us==null || !us.getPassword().equals(Password) || !us.isAdministrator()){
			return "deny";
		}else{
			return tools.getkey();
		}
	}
}
