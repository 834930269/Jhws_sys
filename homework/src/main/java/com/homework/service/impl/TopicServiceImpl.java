package com.homework.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.mapper.TopicMapper;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.service.TopicService;
import com.homework.util.Page;

@Service
public class TopicServiceImpl implements TopicService{
	@Autowired
	TopicMapper topicMapper;
	
	@Override
	public Page<TopicWithBLOBs> getAllTopic(int start, int size, Integer id) {
		int total = topicMapper.total(id);
        Page<TopicWithBLOBs> allpage = new Page<TopicWithBLOBs>(start, size, total);
        allpage.setTid(id);
        allpage.setDateList(topicMapper.getAllTopic(allpage));
        return allpage;
	}
	
	@Override
	public int insertSelective(TopicWithBLOBs topic) {
		// TODO Auto-generated method stub
		/*int result=topicMapper.insertSelective(topic);*/
		return topicMapper.insertSelective(topic);
	}

	@Override
	public TopicWithBLOBs selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return topicMapper.selectByPrimaryKey(id);
	}


	@Override
	public boolean updateByPrimaryKeySelective(TopicWithBLOBs topic) {
		
		int result=topicMapper.updateByPrimaryKeySelective(topic);
		return result==1;
	}

	@Override
	public boolean deleteByPrimaryKey(Integer id) throws Exception {
		// TODO Auto-generated method stub
		try {
            int result = topicMapper.deleteByPrimaryKey(id);

            return result == 1;
        } catch (Exception e) {
            return false;
        }
	}
	
	@Override
	public int total_G(Integer grade){
		return topicMapper.total(grade);
	}
	
	@Override
	public int total(Integer id) {
		// TODO Auto-generated method stub
		return topicMapper.total(id);
	}
	@Override
	public TopicWithBLOBs selectByGrade(Integer grede) {
		// TODO Auto-generated method stub
		return topicMapper.selectByGrade(grede);
	}

	@Override
	public TopicWithBLOBs selectByTeacherId(Integer teacherID) {
		// TODO Auto-generated method stub
		return topicMapper.selectByTeacherId(teacherID);
	}

	@Override
	public Page<TopicWithBLOBs> getAllTopic(int start, int size) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<TopicWithBLOBs> getAllTopicByGrade(int start, int size, Integer grade) {
		int total = topicMapper.total_G(grade);
        Page<TopicWithBLOBs> allpage = new Page<TopicWithBLOBs>(start, size, total);
        allpage.setGrade(grade);
        allpage.setDateList(topicMapper.getAllTopicByGrade(allpage));
        return allpage;
	}
}