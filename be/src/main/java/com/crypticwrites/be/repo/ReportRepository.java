package com.crypticwrites.be.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crypticwrites.be.model.PostReport;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<PostReport, Long> {
    Optional<PostReport> findByPostId(Long postId);
}
