package com.crypticwrites.be.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crypticwrites.be.model.PostReport;
import com.crypticwrites.be.repo.ReportRepository;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public void reportPost(PostReport reportRequest) {
        Optional<PostReport> existingReport = reportRepository.findByPostId(reportRequest.getPostId());

        if (existingReport.isPresent()) {
            // Increment the counter if the post already exists in the database
        	PostReport report = existingReport.get();
            report.incrementReportCount();
            reportRepository.save(report);
        } else {
            // Create a new report if it doesn't exist
        	PostReport newReport = new PostReport();
            newReport.setPostId(reportRequest.getPostId());
            newReport.setAuthor(reportRequest.getAuthor());
            newReport.incrementReportCount();
            reportRepository.save(newReport);
        }
    }

    public List<PostReport> getAllReports() {
        return reportRepository.findAll();
    }
}
