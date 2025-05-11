package com.projetPOO.TR.demo.GestionReseau;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NetManagerProApplication {
    public static void main(String[] args) {
        SpringApplication.run(NetManagerProApplication.class, args);
    }
}