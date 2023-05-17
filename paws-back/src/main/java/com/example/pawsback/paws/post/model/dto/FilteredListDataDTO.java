package com.example.pawsback.paws.post.model.dto;

import com.example.pawsback.paws.post.model.AgeType;
import com.example.pawsback.paws.post.model.Races;
import com.example.pawsback.paws.post.model.Sex;
import lombok.Data;

@Data
public class FilteredListDataDTO {
    private Races race;
    private Sex sex;
    private AgeType ageType;


}
