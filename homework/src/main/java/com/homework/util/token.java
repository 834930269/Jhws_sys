package com.homework.util;
public final class token {
	///��ȡtoken
	public static String generate_token(String userName,String passWord,String TimeStamp){
		return SHA1.encode(userName+passWord+TimeStamp);
	}
}
