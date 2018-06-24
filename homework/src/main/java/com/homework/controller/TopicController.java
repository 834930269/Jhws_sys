package com.homework.controller;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.junit.runner.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.homework.mapper.TopicMapper;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.pojo.User;
import com.homework.service.TeacherService;
import com.homework.service.TopicService;
import com.homework.service.UserService;
import com.homework.util.Page;
import com.homework.util.token;
import com.homework.util.tools;


@Controller
@RequestMapping("topic")
public class TopicController {
	@Autowired
	private TopicService topicService;
	@Autowired
	private TeacherService teacherService;
	@Autowired
	private UserService userService ;
	
	@RequestMapping(value="",method=RequestMethod.GET)
	public String  publish() throws Exception{
		return "publish";
	}
		
	//上传提交
	@RequestMapping(value="/publish",method=RequestMethod.POST)
	@ResponseBody
	public String publishSubmit(@RequestBody TopicWithBLOBs topic) {
		int Id=teacherService.selectByPrimaryKey(topic.getTeacherid());
		System.out.println(Id);
		User user=userService.get(Id);
		JSONObject json=new JSONObject();	
		if(user.getIdentified()==15) {
			topic.setTeacherid(topic.getTeacherid());
			topic.setContent(topic.getContent());
			topic.setGrade(topic.getGrade());
			topic.setAnswer(topic.getAnswer());
			topic.setType(topic.getType());
			topic.setAnalysis(topic.getAnalysis());
			topic.setScore(topic.getScore());
			topic.setChoices(topic.getChoices());
			topic.setTimestamp(tools.Get_TimeStamp());
			topicService.insertSelective(topic);
			json.put("status", "ok");
		}else{
			json.put("status", "error");
		}
		/*System.out.println(topic.getChoices().split(","));*/
		/*topic.setTimestamp(tools.Get_TimeStamp());*/		
		return json.toJSONString();
			
	}
		//��ҳչʾ
	@RequestMapping(value="/showindex" ,method=RequestMethod.GET)
	@ResponseBody
	public String  find(@RequestBody Integer teacherID) {	
		
		return  JSONObject.toJSON(topicService.selectByTeacherId(teacherID)).toString();
		
	}
	//��Ŀ�༭ҳ
	@RequestMapping(value="/editTopic",method=RequestMethod.POST)
	@ResponseBody
	public String editTopic(@RequestParam(value = "id", required = true,defaultValue="1") Integer id) {
		TopicWithBLOBs topicWithBLOBs=topicService.selectByPrimaryKey(id);				
		return JSONObject.toJSON(topicWithBLOBs).toString();//������ת��ΪJson�ַ���
	}
	//��Ŀ�༭ҳ�ύ
	@RequestMapping(value="/editSubmit",method=RequestMethod.POST)
	@ResponseBody
	public String editSubmit(@RequestBody TopicWithBLOBs topic) {
		if(topic.getId()==1) {
		topic.setTeacherid(topic.getTeacherid());
		topic.setContent(topic.getContent());
		topic.setGrade(topic.getGrade());
		topic.setAnswer(topic.getAnswer());
		topic.setType(topic.getType());
		topic.setAnalysis(topic.getAnalysis());
		topic.setScore(topic.getScore());
		topic.setChoices(topic.getChoices());
		/*topic.setTimestamp(tools.Get_TimeStamp());*/
		}		
		topicService.updateByPrimaryKeySelective(topic);
		return JSONObject.toJSON(topicService.updateByPrimaryKeySelective(topic)).toString();
		
	}
	//ɾ����Ŀ
	@RequestMapping(value="/delete")
	@ResponseBody
	public
    Map<String, Object> delete(Integer id) throws Exception {
		 Map<String, Object> map = new HashMap<>();
		 if (topicService.deleteByPrimaryKey(id)) { // ɾ���ɹ�
		    map.put("code", 200);
		    map.put("result", true);
		} else {    // ɾ��ʧ��
		    map.put("code", 500);
		    map.put("message", "删除失败");
		    map.put("result", false);
		}
		
		return map;
    }
	@RequestMapping("/topiclist")
    @ResponseBody
    public Page<TopicWithBLOBs> getAll(HttpServletRequest request) {	
		int index=Integer.parseInt(request.getParameter("index"));
		int tid=Integer.parseInt(request.getParameter("tid"));
		System.out.println("我来查找教室"+index+" "+tid);
        Page<TopicWithBLOBs> page1 = topicService.getAllTopic(index,tools.per_page_size,tid);
		System.out.println(page1.toString());
        return page1;
    }	
	
	@RequestMapping("/topiclist_student")
    @ResponseBody
    public Page<TopicWithBLOBs> getAllS(HttpServletRequest request) {	
		int index=Integer.parseInt(request.getParameter("index"));
		int gid=Integer.parseInt(request.getParameter("grade"));
        Page<TopicWithBLOBs> page1 = topicService.getAllTopicByGrade(index,tools.per_page_size,gid);
		System.out.println(page1.toString());
        return page1;
    }	
}


