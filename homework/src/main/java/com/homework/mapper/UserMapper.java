package com.homework.mapper;

import java.util.List;
import com.homework.pojo.User;
import com.homework.util.Page;

public interface UserMapper {
	public void add(User user);
	public void delete(int id);
	public User get(int id);
	public void update(User user);
	public List<User> list();
	public int count();
	public List<User> getAllUser(Page<User> page);
	public int total();
	public String gettoken(int id);
	public User get_by_username(String username);
}
