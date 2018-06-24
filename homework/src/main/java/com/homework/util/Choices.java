package com.homework.util;

import java.util.ArrayList;
import java.util.List;

public class Choices {
	
	public static  List<String> sp(String topic) {
		List<String> list =new ArrayList<>();
	String [] as=topic.split(",");
	for(int i=0;i<as.length;i++) {
		list.add(as[i]);
		
	}
	return list;
	}

}
