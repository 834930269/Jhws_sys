package com.homework.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSONObject;
import com.homework.pojo.Record;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.service.RecordService;
import com.homework.service.StudentService;
import com.homework.service.TopicService;
import com.homework.util.Page;
import com.homework.util.TaotaoResult;
import com.homework.util.tools;
import com.homework.vo.Topics;

@Controller
@RequestMapping("student")
public class StudentController {
	@Autowired
	private TopicService topicService;
	@Autowired
	private StudentService studentService;
	@Autowired
	private RecordService  recordService;
	
	@RequestMapping(value="/show")
	@ResponseBody
	public TaotaoResult show(@RequestBody Integer id ) {
		Topics topics=studentService.topics(id);	
/*		topic.getChoices();*/
/*		String [] as=topic.getChoices().split(",");
		for(int i=0;i<as.length;i++) {
			String [] a=topic.getChoices().split(",");
			System.out.println(a[i]);
		}*/
				
		return TaotaoResult.ok(topics);
	}
	
	@RequestMapping(value="/edithomework")
	@ResponseBody
	public boolean edithomework(HttpServletRequest request) {
		int topic_id=Integer.parseInt(request.getParameter("topic_id"));
		int uid=Integer.parseInt(request.getParameter("uid"));
		int ans=Integer.parseInt(request.getParameter("answer"));
		TopicWithBLOBs topic=topicService.selectByPrimaryKey(topic_id);
		Record record = new Record();
		boolean flag=false;
		if(ans==topic.getAnswer().intValue()) {			
			record.setStudentid(uid);
			record.setTopicid(topic_id);
			record.setStatus(true);
			record.setTimestamp(tools.Get_TimeStamp());
			if(recordService.insertSelective(record)!=0){
				flag=true;
			}
		}
		else {			
			record.setStudentid(uid);
			record.setTopicid(topic_id);
			record.setStatus(false);
			record.setTimestamp(tools.Get_TimeStamp());
			recordService.insertSelective(record);
		}
		return flag;
	}
	@RequestMapping("/findrecord")
	@ResponseBody
	public Page<Record> getAllRecord( Integer id,Integer index){
	   Page<Record> page1 = studentService.getAllRecord(index,tools.per_page_size,id);
	   return page1;
	}
}
