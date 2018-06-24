package com.homework.service;

import java.util.List;
import com.homework.pojo.User;
import com.homework.util.Page;

public interface UserService {
	List<User> list();
	int total();
	Page<User> getAllUser(int start,int size);
	String gettoken(int id);
	void add(User us);
	User get(int id);
	User get_by_username(String username);
	void update(User us);
}
