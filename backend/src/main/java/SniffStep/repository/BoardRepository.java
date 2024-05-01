package SniffStep.repository;

import SniffStep.entity.Board;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Board findByTitle(String title);

    @Query(value = "SELECT b from Board b JOIN FETCH b.member m",
    countQuery = "select count(b) from Board b order by b.id desc")
    Page<Board> findAll(Pageable pageable);

    @Query(value = "select b from Board b join fetch b.member m where b.title like '%:title%'",
    countQuery = "select count(b) from Board b order by b.id desc ")
    Page<Board> findAllByTitleContaining(@Param(value = "title") String keyword, Pageable pageable);
}
