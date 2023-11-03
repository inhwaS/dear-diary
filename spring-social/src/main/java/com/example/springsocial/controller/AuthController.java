package com.example.springsocial.controller;

import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.model.*;
import com.example.springsocial.payload.*;
import com.example.springsocial.repository.CelebrationRepository;
import com.example.springsocial.repository.DiaryContentRepository;
import com.example.springsocial.repository.DiaryRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.TokenProvider;
import com.example.springsocial.security.email.GmailSender;
import com.google.api.services.gmail.model.Message;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Random;

import static java.time.temporal.ChronoUnit.DAYS;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private CelebrationRepository celebrationRepository;

    @Autowired
    private DiaryContentRepository diaryContentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        // Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }

    @PostMapping("/newdiary")
    public ResponseEntity<?> makeNewDiary(@Valid @RequestBody NewDiaryRequest newDiaryRequest) {
        if(diaryRepository.existsByEmail(newDiaryRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        System.out.println(newDiaryRequest.getBegindt());
        System.out.println(newDiaryRequest.getEmail());

        Diary diary = new Diary();
        diary.setId(generateRandomString(7));
        diary.setEmail(newDiaryRequest.getEmail());
        diary.setBegindt(newDiaryRequest.getBegindt());


        System.out.println(diary.getId());
        System.out.println(diary.getEmail());
        Diary result = diaryRepository.save(diary);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(result);
    }


    @PostMapping("/joindiary")
    public ResponseEntity<?> joinDiary(@Valid @RequestBody NewDiaryRequest newDiaryRequest) {
        Optional<Diary> optDiary = diaryRepository.findById(newDiaryRequest.getDiaryId());
        if (optDiary.isPresent()){
            Diary diary = optDiary.get();
            diary.setPemail(newDiaryRequest.getEmail());
            diaryRepository.save(diary);
            return ResponseEntity.ok(optDiary);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/diaryhome")
    @ResponseBody()
    public DiaryContentOutput diaryhome(@Valid @RequestBody NewDiaryRequest newDiaryRequest) throws Exception {
        Optional<Diary> optDiary = diaryRepository.findByEmail(newDiaryRequest.getEmail());
        if (optDiary.isPresent()){
            DiaryContentOutput diaryContentOutput = new DiaryContentOutput();
            Diary diary = optDiary.get();

            if (diary.getEmail() == null || diary.getPemail() == null){
                return diaryContentOutput;
            }

            Optional<User> user1 = userRepository.findByEmail(diary.getEmail());
            Optional<User> user2 = userRepository.findByEmail(diary.getPemail());
            if (diary.getEmail().equals(newDiaryRequest.getEmail())){
                diaryContentOutput.setName(user1.get().getName());
                diaryContentOutput.setPname(user2.get().getName());
            }else{
                diaryContentOutput.setName(user2.get().getName());
                diaryContentOutput.setPname(user1.get().getName());
            }
            diaryContentOutput.setDiaryId(diary.getId());
            diaryContentOutput.setBegindt(diary.getBegindt());

            // calcualte diary begin date
            LocalDate date = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate bDt = LocalDate.parse(diary.getBegindt(), formatter);
            int daysBetween = (int) DAYS.between(bDt, date);
            diaryContentOutput.setDays(daysBetween);

            // send email every 100, 200 days
            if (calcuateDays(daysBetween)){
                CelebrationId id = new CelebrationId(diary.getId(), daysBetween);
                Optional<Celebration> celeb = celebrationRepository.findById(id);
                if (!celeb.isPresent()){
                    //send email!!
                    GmailSender gmailSender = new GmailSender(diary.getEmail(), daysBetween, diaryContentOutput.getName(), diaryContentOutput.getPname());

                    // send email to the couple
                    gmailSender.sendMail("Congratulations for your " + daysBetween + " days!", diary.getEmail());
                    gmailSender.sendMail("Congratulations for your " + daysBetween + " days!", diary.getPemail());

                    Celebration celebration = new Celebration();
                    celebration.setSent(1);
                    celebration.setDays(daysBetween);
                    celebration.setDiaryId(diary.getId());

                    celebrationRepository.save(celebration);
                }
            }

            return diaryContentOutput;
        }else{
            return null;
        }
    }

    private boolean calcuateDays(int days){
        int hundered = days / 10;
        int remainder = days % 100;
        return  true;
//        if (hundered > 1 && remainder != 0){
//            return true;
//        }else{
//            return false;
//        }
    }

    @GetMapping("/showDiary/{diaryId}") // Specify the diaryId as a path variable
    public ResponseEntity<?> showDiary(@PathVariable String diaryId) {
        System.out.println(diaryId);
        // Retrieve the Diary by ID
        Diary diary = diaryRepository.findById(diaryId).orElseThrow();

        return ResponseEntity.ok(diary);
    }


    // Helper method to generate a random string of specified length
    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomString = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            randomString.append(characters.charAt(index));
        }

        return randomString.toString();
    }
}
