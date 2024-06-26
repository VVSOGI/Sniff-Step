package SniffStep.dto.board;

import SniffStep.entity.Board;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardPatchDTO {

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "내용을 입력해주세요.")
    private String description;

    private String activityLocation;

   private List<MultipartFile> addedImages = new ArrayList<>();

   private List<Long> deletedImages = new ArrayList<>();
}

