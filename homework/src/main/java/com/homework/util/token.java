package com.homework.util;
public final class token {
	///ªÒ»°token
	public static String generate_token(String userName,String passWord,String TimeStamp){
		return SHA1.encode(userName+passWord+TimeStamp);
	}
}
