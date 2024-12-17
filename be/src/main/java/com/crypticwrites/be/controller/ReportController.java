package com.crypticwrites.be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crypticwrites.be.model.PostReport;
import com.crypticwrites.be.service.ReportService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/addreport")
    public ResponseEntity<String> reportPost(@RequestBody PostReport reportRequest) {
        try {
            reportService.reportPost(reportRequest);
            return new ResponseEntity<>("Post reported successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error reporting the post: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getreport")
    public ResponseEntity<List<PostReport>> getReports() {
        try {
            List<PostReport> reports = reportService.getAllReports();
            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
