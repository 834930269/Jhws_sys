package com.homework.pojo;

/*
 * 命名规则必须是名字全部小写,get第一个字符大写,其他必须小写......
 * 艹！
 */

public class User {
	private int id;
	private String name;
	private int grade;
	private String gravater;
	private int identified;
	private String username;
	private String password;
	private String timestamp;
	private String token="";
	public int getId(){
		return id;
	}
	/*public void setId(int id){
		this.ID=id;
	}*/
	public String getName(){
		return name;
	}
	public void setName(String name){
		this.name=name;
	}
	public int getGrade(){
		return grade;
	}
	public void setGrade(int grade){
		this.grade=grade;
	}
	public String getGravater(){
		return gravater;
	}
	public void setGravater(String gravater){
		this.gravater=gravater;
	}
	public int getIdentified(){
		return identified;
	}
	public void setIdentified(int identified){
		this.identified=identified;
	}
	public String getUsername(){
		return username;
	}
	public void setUsername(String username){
		this.username=username;
	}
	public String getPassword(){
		return password;
	}
	public void setPassword(String password){
		this.password=password;
	}
	public String getTimestamp(){
		return timestamp;
	}
	public void setTimestamp(String timestamp){
		this.timestamp=timestamp;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	@Override
	public String toString(){
		return "This user's name is: ["+name+"],and the user's id is: ["+id+"].";
	}
	
	public Boolean isAdministrator(){
		return this.identified==255?true:false;
	}
	public Boolean isTeacher(){
		return this.identified==15?true:false;
	}
}
