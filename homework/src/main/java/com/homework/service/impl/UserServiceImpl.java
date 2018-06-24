package com.homework.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.mapper.UserMapper;
import com.homework.pojo.User;
import com.homework.service.UserService;
import com.homework.util.Page;


@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserMapper userMapper;
	
	public List<User> list(){
		return userMapper.list();
	}
	
	///start -第几页
	@Override
	public Page<User> getAllUser(int start,int size){
		int total = userMapper.total();
        Page<User> allpage = new Page<User>(start, size, total);
        //将获取到的集合数据，添加到page中的datalist参数中
        allpage.setDateList(userMapper.getAllUser(allpage));
        //返回所有的分页参数和数据
        return allpage;
	}
	@Override
	public int total(){
		return userMapper.total();
	}

	@Override
	public String gettoken(int id) {
		return userMapper.gettoken(id);
	}

	@Override
	public void add(User us) {
		userMapper.add(us);
	}

	@Override
	public User get(int id) {
		return userMapper.get(id);
	}

	@Override
	public User get_by_username(String username) {
		return userMapper.get_by_username(username);
	}

	@Override
	public void update(User us) {
		userMapper.update(us);
	}
}
