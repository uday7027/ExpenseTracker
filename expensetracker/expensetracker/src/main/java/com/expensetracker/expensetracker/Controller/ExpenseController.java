package com.expensetracker.expensetracker.Controller;

import com.expensetracker.expensetracker.Entity.Expense;
import com.expensetracker.expensetracker.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.addExpense(expense));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Expense>> getExpenses(@PathVariable Long userId) {
        return ResponseEntity.ok(expenseService.getUserExpenses(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expenseRequest) {

        // Fetch existing expense
        Expense existingExpense = (Expense) expenseService.getExpenseById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));

        // Update fields
        existingExpense.setTitle(expenseRequest.getTitle());
        existingExpense.setAmount(expenseRequest.getAmount());
        existingExpense.setCategory(expenseRequest.getCategory());
        existingExpense.setDate(expenseRequest.getDate());

        // Update user if needed (optional)
        if (expenseRequest.getUser() != null && expenseRequest.getUser().getId() != null) {
            existingExpense.setUser(expenseRequest.getUser());
        }

        // Save updated expense
        Expense updatedExpense = expenseService.updateExpense(existingExpense);

        return ResponseEntity.ok(updatedExpense);
    }

}
