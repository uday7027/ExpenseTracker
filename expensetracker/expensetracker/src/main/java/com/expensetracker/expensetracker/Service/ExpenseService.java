package com.expensetracker.expensetracker.Service;

import com.expensetracker.expensetracker.Entity.Expense;
import com.expensetracker.expensetracker.Repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public List<Expense> getUserExpenses(Long userId) {
        return expenseRepository.findByUserId(userId);
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Optional<Object> getExpenseById(Long id) {
        return expenseRepository.findExpenseById(id);
    }

    public Expense updateExpense(Expense existingExpense) {
        return expenseRepository.save(existingExpense);
    }
}
