package com.homework.service;
import java.util.List;

import com.homework.pojo.TopicWithBLOBs;
import com.homework.pojo.User;
import com.homework.util.Page;
public interface TopicService {
	//�ϴ���ҵ
	public int insertSelective(TopicWithBLOBs topic);
	//�鿴
	public TopicWithBLOBs selectByPrimaryKey(Integer id);
	//��ҵ�༭�ύ
	boolean updateByPrimaryKeySelective(TopicWithBLOBs record);
	boolean deleteByPrimaryKey(Integer id) throws Exception;
	Page<TopicWithBLOBs> getAllTopic(int start,int size);
	TopicWithBLOBs selectByGrade(Integer grede);
	int total(Integer id);
	int total_G(Integer grade);
	TopicWithBLOBs selectByTeacherId(Integer teacherID);
	Page<TopicWithBLOBs> getAllTopic(int start, int size, Integer id);
	Page<TopicWithBLOBs> getAllTopicByGrade(int start, int size, Integer grade);
}
