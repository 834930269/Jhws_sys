package com.homework.service;

import com.homework.pojo.Record;
import com.homework.util.Page;
import com.homework.vo.Topics;

public interface StudentService {
	public Topics topics(Integer id) ;
	Page<Record> getAllRecord(int start, int size,Integer id);
}
