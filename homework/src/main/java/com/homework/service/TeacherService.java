package com.homework.service;
import java.util.List;
import com.homework.pojo.Teacher;
import com.homework.pojo.Topic;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.pojo.User;
import com.homework.util.Page;
public interface TeacherService {
	void add(Teacher teacher);
	/*int insert(TopicWithBLOBs topic);*/
	int selectByPrimaryKey(Integer id);
	int selectByID(Integer userid);
	
}
