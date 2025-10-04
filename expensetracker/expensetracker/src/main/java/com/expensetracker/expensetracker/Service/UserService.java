package com.expensetracker.expensetracker.Service;

import com.expensetracker.expensetracker.Entity.User;
import com.expensetracker.expensetracker.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }


    public Optional<Object> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
