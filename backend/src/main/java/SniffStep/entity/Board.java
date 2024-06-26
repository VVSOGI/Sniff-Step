package SniffStep.entity;

import SniffStep.common.BaseTime;
import SniffStep.dto.board.BoardPatchDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    private String title;

    private String description;

    private String activityLocation;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name = "board_type")
    private BoardType boardType;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_date")
    private ActivityDate activityDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_time")
    private ActivityTime activityTime;

    public Board(String title, String description, String activityLocation, List<Image> images, Member member) {
        this.title = title;
        this.description = description;
        this.activityLocation = activityLocation;
        this.images = new ArrayList<>();
        this.member = member;
        addImages(images);
    }


    public ImageUpdatedResult updateBoard(BoardPatchDTO patch) {
        this.title = patch.getTitle();
        this.description = patch.getDescription();
        ImageUpdatedResult result = findImageUpdatedResult(patch.getAddedImages(), patch.getDeletedImages());
        this.activityLocation = patch.getActivityLocation();
        addImages(result.getAddedImages());
        deleteImages(result.getDeletedImages());
        onPreUpdate();
        return result;
    }

    public boolean isOwnBoard(Member member) {
        return this.member.equals(member);
    }

    private ImageUpdatedResult findImageUpdatedResult(List<MultipartFile> addedImageFiles, List<Long> deletedImageIds) {
        List<Image> addedImage = convertImageFilesToImages(addedImageFiles);
        List<Image> deletedImages = convertImageIdsToImages(deletedImageIds);
        return new ImageUpdatedResult(addedImageFiles, addedImage, deletedImages);
    }

    private List<Image> convertImageIdsToImages(List<Long> imageIds) {
        return imageIds.stream()
                .map(id -> convertImageIdsToImage(id))
                .filter(i -> i.isPresent())
                .map(i -> i.get())
                .collect(toList());
    }

    private Optional<Image> convertImageIdsToImage(Long id) {
        return this.images.stream()
                .filter(i -> i.getId() == (id)).findAny();
    }

    private List<Image> convertImageFilesToImages(List<MultipartFile> imageFiles) {
        return imageFiles.stream().map(imageFile ->
                new Image(imageFile.getOriginalFilename())).collect(toList());
    }

    private void addImages(List<Image> added) {
        List<Image> toBeAdded = added.stream()
                .peek(i -> i.initBoard(this))
                .collect(Collectors.toList());
        images.addAll(toBeAdded);
    }

    public void saveMember(Member member) {
        this.member = member;
    }

    private void deleteImages(List<Image> deletedImages) {
        deletedImages.forEach(di -> this.images.remove(di));
    }

    @Getter
    @AllArgsConstructor
    public static class ImageUpdatedResult {
        private List<MultipartFile> addedImageFiles;
        private List<Image> addedImages;
        private List<Image> deletedImages;
    }
}
