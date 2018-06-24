package com.homework.mapper;

import com.homework.pojo.Teacher;


public interface TeacherMapper {
	public void add(Teacher teacher);
	int selectByPrimaryKey(Integer id);
	int selectByID(Integer userid);
}