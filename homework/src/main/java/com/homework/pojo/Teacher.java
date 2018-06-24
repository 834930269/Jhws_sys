package com.homework.pojo;

public class Teacher {
	private int id;
	private String exprience;
	private int userid;
	private String adapt;
	
	public Teacher(int d){
		this.userid=d;
	}
	
	public int getId() {
		return id;
	}
	public String getExprience() {
		return exprience;
	}
	public void setExprience(String exprience) {
		this.exprience = exprience;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getAdapt() {
		return adapt;
	}
	public void setAdapt(String adapt) {
		this.adapt = adapt;
	}
}
