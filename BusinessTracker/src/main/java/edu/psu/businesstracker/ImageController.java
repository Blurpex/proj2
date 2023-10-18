package edu.psu.businesstracker;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/employees")
public class ImageController {

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("image") MultipartFile image) {
        try {
            String fileName = "/home/haris/Documents/courses/487/Project2/frontend/src/images/" + image.getOriginalFilename();
            File destFile = new File(fileName);
            image.transferTo(destFile);
            return "File uploaded successfully";
        } catch (IOException e) {
            return "File upload failed: " + e.getMessage();
        }
    }

}
