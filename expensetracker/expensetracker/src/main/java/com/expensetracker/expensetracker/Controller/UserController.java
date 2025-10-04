package com.expensetracker.expensetracker.Controller;

import com.expensetracker.expensetracker.Entity.User;
import com.expensetracker.expensetracker.Security.JwtUtil;
import com.expensetracker.expensetracker.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Signup
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userService.registerUser(user);
        savedUser.setPassword(null); // do not expose password
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User dbUser = (User) userService.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(dbUser.getEmail());

        // return token + minimal user info
        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "id", dbUser.getId(),
                        "name", dbUser.getName(),
                        "email", dbUser.getEmail()
                )
        );
    }

}
