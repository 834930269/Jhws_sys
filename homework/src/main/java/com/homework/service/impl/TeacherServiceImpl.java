package com.homework.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.mapper.TeacherMapper;
import com.homework.mapper.TopicMapper;
import com.homework.pojo.Teacher;
import com.homework.pojo.Topic;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.pojo.User;
import com.homework.service.TeacherService;
import com.homework.util.Page;

@Service
public class TeacherServiceImpl implements TeacherService{
	@Autowired
	TeacherMapper teacherMapper;
	
	@Override
	public void add(Teacher te) {
		teacherMapper.add(te);
	}

	@Override
	public int selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return teacherMapper.selectByPrimaryKey(id);
	}

	@Override
	public int selectByID(Integer userid) {
		// TODO Auto-generated method stub
		return teacherMapper.selectByID(userid);
	}

}
