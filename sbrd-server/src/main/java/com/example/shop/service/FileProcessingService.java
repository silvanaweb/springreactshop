package com.example.shop.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileProcessingService {

    @Value("${filePath}")
    private String basePath;

    public List<String> fileList() {
        File dir = new File(basePath);
        File[] files = dir.listFiles();

        return files != null ? Arrays.stream(files).map(File::getName).collect(Collectors.toList()) : null;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        if (file != null) {
            System.out.println("File name: " + file.getOriginalFilename());
            File directory=new File(String.valueOf(basePath));
            if(!directory.exists()){
                directory.mkdirs();
            }

            File destinationFile=new File(directory,file.getOriginalFilename());
            file.transferTo(destinationFile);
            return "CREATED";
        }
        return "FAILED";
    }

    public Resource downloadFile(String fileName) {
        System.out.println("File name: " + basePath + fileName);
        File dir = new File(basePath + "/" + fileName);
        try {
            if (dir.exists()) {
                return new UrlResource(dir.toURI());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        return null;
    }

}