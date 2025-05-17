package ch.wiss.m223.Ticketsystem.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping(path = "/demo")
    public String getDemoPage() {

        return "Hello World!";
    }

    @GetMapping(path = "/private")
    public ResponseEntity<String> getPrivatePage() {
        ResponseEntity<String> result = ResponseEntity.ok()
                .body("Private Area");
        return result;
    }

    @GetMapping(path = "/public")
    public ResponseEntity<String> getPublicPage() {
        ResponseEntity<String> result = ResponseEntity.ok()
                .body("Public Area");
        return result;
    }

    @PostMapping(path = "items")
    public ResponseEntity<String> getItems() {
        ResponseEntity<String> result = ResponseEntity.ok()
                .body("Admin Area");
        return result;
    }
}
