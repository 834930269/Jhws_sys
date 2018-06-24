package com.homework.util;

import java.util.List;

public class Page<T> {
    private int pagNum;// ��ǰ��ҳ��
    private int pageSize;// ÿҳ��ʾ������limit�����ڶ�������
    private int totalRecord;// �ܼ�¼��
    private int totalPage;// ��ҳ��
    private int startIndex;// ��ʼλ�ã�limit������һ������
    private List<T> dateList;
    private int start;
    private int end;
    private int tid;
    private int grade;
    private int sid;
    public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public int getTid() {
		return tid;
	}

	public void setTid(int tid) {
		this.tid = tid;
	}

	public int getPagNum() {
		return pagNum;
	}

	public void setPagNum(int pagNum) {
		this.pagNum = pagNum;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public List<T> getDateList() {
		return dateList;
	}

	public void setDateList(List<T> dateList) {
		this.dateList = dateList;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public Page() {
    }

    public Page(int pagNum, int pageSize, int totalRecord) {
        this.pagNum = pagNum;
        this.pageSize = pageSize;
        this.totalRecord = totalRecord;
        // ������ҳ��
        if (totalRecord % pageSize == 0) {
            this.totalPage = totalRecord / pageSize;
        } else {
            this.totalPage = (totalRecord / pageSize) + 1;
        }
        // ȷ��limit�����ĵ�һ��������ֵ
        this.startIndex = pagNum * pageSize;
        this.start = 1;
        this.end = 5;
        if (totalPage <= 5) {
            this.end = this.totalPage;
        } else {// pagNum=6;start=4;end=8
            this.start = pagNum - 2;
            this.end = pagNum + 2;
        }
        if (start < 0) {
            this.start = 1;
            this.end = 5;
        }
        // �ٸ����ӣ�һ����10ҳ�����ھ��ڵ�10ҳ����ô����������߼�end=12��������end=this.totalPage;�����浼��������Ҫ����5������start=end-5
        if (end > this.totalPage) {
            this.end = totalPage;
            this.start = end - 5;
        }
    }
	@Override
	public String toString() {
		return "Page [pagNum=" + pagNum + ", pageSize=" + pageSize + ", totalRecord=" + totalRecord + ", totalPage="
				+ totalPage + ", startIndex=" + startIndex + ", dateList=" + dateList + ", start=" + start + ", end="
				+ end + "]";
	}

}
