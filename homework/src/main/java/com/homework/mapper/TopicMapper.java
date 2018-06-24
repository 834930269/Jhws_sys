package com.homework.mapper;

import com.homework.pojo.Topic;
import com.homework.pojo.TopicExample;
import com.homework.pojo.TopicWithBLOBs;
import com.homework.pojo.User;
import com.homework.util.Page;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TopicMapper {
    int countByExample(TopicExample example);

    int deleteByExample(TopicExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(TopicWithBLOBs record);

    int insertSelective(TopicWithBLOBs record);
    
    int total(Integer id);
    int total_G(Integer grade);
    
    TopicWithBLOBs selectByTeacherId(Integer teacherID);
    
    List<TopicWithBLOBs> getAllTopic(Page<TopicWithBLOBs> page);
    
    List<TopicWithBLOBs> getAllTopicByGrade(Page<TopicWithBLOBs> page);

    List<TopicWithBLOBs> selectByExampleWithBLOBs(TopicExample example);

    List<Topic> selectByExample(TopicExample example);

    TopicWithBLOBs selectByPrimaryKey(Integer id);
    
    TopicWithBLOBs selectByGrade(Integer grede);

    int updateByExampleSelective(@Param("record") TopicWithBLOBs record, @Param("example") TopicExample example);

    int updateByExampleWithBLOBs(@Param("record") TopicWithBLOBs record, @Param("example") TopicExample example);

    int updateByExample(@Param("record") Topic record, @Param("example") TopicExample example);

    int updateByPrimaryKeySelective(TopicWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(TopicWithBLOBs record);

    int updateByPrimaryKey(Topic record);
    
}