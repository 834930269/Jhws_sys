package com.homework.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.Base64;

public final class tools {
	public static String Default_Gravater="../images/Gravater/default.jpg";
	public static String Default_Gravater_Path="WEB-INF/jsp/images/Gravater/";
	public static int Default_Identified=2;
	public static Random rand =new Random(25);
	//��ҳʱÿҳ��С
	public static int per_page_size=10;
	//ǰ�����̨������
	private static String key_="permit";
	public static String getkey(){
		return key_;
	}
	public static SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	///��ȡʱ���
	public static String Get_TimeStamp(){
		Date day=new Date();
		return df.format(day);
	}
	/**
	 * ת��url:data����Ϊ����ͼƬ
	 * @param imgStr
	 * @param imgName
	 * @param imgPath
	 * @return
	 * by yanqingwen
	 * modify by zwt
	 */
	final static Base64.Decoder decoder = Base64.getDecoder();
	final static Base64.Encoder encoder = Base64.getEncoder();

	public static boolean GenerateImage(String imgStr,String imgName,String imgPath){
		//��Base64�ַ������벢����ͼƬ
		if (imgStr == null){
	        	return false;
	    } //ͼ������Ϊ��
        try{ 
           	//Base64����
           	byte[] b = decoder.decode(imgStr);
			File headPath = new File(imgPath);//��ȡ�ļ���·�� 
			if(!headPath.exists()){//�ж��ļ����Ƿ񴴽���û�д����򴴽����ļ��� 
				headPath.mkdirs(); 
			}
			//����ͼƬ·��
			String imgFilePath = imgPath+Default_Gravater_Path+imgName+".jpg";
			System.out.println(imgFilePath);
			//�����ɵ�ͼƬ
			OutputStream out = new FileOutputStream(imgFilePath);
			out.write(b);
			out.flush();
			out.close();
			return true;
       	}catch (Exception e){
    		System.out.println("Error"+e);
       		return false;
       	}
    }
}
