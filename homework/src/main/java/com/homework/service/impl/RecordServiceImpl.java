package com.homework.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.mapper.RecordMapper;
import com.homework.mapper.TopicMapper;
import com.homework.pojo.Record;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.service.RecordService;
import com.homework.service.TopicService;
import com.homework.util.Page;
import com.homework.util.tools;

@Service
public class RecordServiceImpl implements RecordService{
	@Autowired
	RecordMapper recordMapper;
	@Autowired
	TopicService topicService;

	@Override
	public int insertSelective(Record record) {
		// TODO Auto-generated method stub
		record.setId(record.getId());
		record.setStudentid(record.getStudentid());
		record.setTopicid(record.getTopicid());
		/*record.setTimestamp(tools.Get_TimeStamp());*/
		
		return recordMapper.insertSelective(record);
	}
}
