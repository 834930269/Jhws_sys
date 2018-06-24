package com.homework.pojo;

import java.util.Date;

public class Topic {
    private Integer id;

    private Integer teacherid;

    private Integer grade;

    private Integer answer;

    private Integer type;

    private Integer score;

    private String timestamp;

    private String choices;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(Integer teacherid) {
        this.teacherid = teacherid;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Integer getAnswer() {
        return answer;
    }

    public void setAnswer(Integer answer) {
        this.answer = answer;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getChoices() {
        return choices;
    }

    public void setChoices(String choices) {
		this.choices = choices == null ? null : choices.trim();
    }

	public String[] getC(){
		String [] as=choices.split(",");
		return as;
	}
}