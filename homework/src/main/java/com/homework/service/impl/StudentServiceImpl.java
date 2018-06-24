package com.homework.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.mapper.RecordMapper;
import com.homework.mapper.TopicMapper;
import com.homework.pojo.Record;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.service.StudentService;
import com.homework.util.Choices;
import com.homework.util.Page;
import com.homework.vo.Topics;

@Service
public class StudentServiceImpl implements StudentService{
	@Autowired
	TopicMapper topicMapper;
	@Autowired
	RecordMapper recordMapper;
	
	@Override
	public Page<Record> getAllRecord(int start, int size,Integer id) {
	   int total = recordMapper.total(id);
	   Page<Record> allpage = new Page<Record>(start, size, total);
	   allpage.setSid(id);
	   allpage.setDateList(recordMapper.getAllRecord(allpage));
	   return allpage;
	}
	@Override
	public Topics topics(Integer id) {
		// TODO Auto-generated method stub
		TopicWithBLOBs topic = topicMapper.selectByPrimaryKey(id);
		if(topic!=null) {			
			List<String> options = Choices.sp(topic.getChoices());
			Topics topics=new Topics();
			topics.setContent(topics.getContent());
			topics.setAnalysis(topics.getAnalysis());
			return topics;
		}
		return null;
	}
}
