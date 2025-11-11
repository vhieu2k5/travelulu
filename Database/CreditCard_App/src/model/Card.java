package model;

import java.sql.Date;

public class Card {
    private int cardId;
    private Customer customer;
    private Bank bank;
    private String cardholderName;
    private String cardNumber;
    private Date expiryDate;
    private String cvv;
    private double balance;

    // --- Constructor rỗng (bắt buộc nên có cho DAO / mapping) ---
    public Card() {}

    // --- Constructor đầy đủ ---
    public Card(int cardId, Customer customer, Bank bank,
                String cardholderName, String cardNumber,
                Date expiryDate, String cvv, double balance) {
        this.cardId = cardId;
        this.customer = customer;
        this.bank = bank;
        this.cardholderName = cardholderName;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.balance = balance;
    }

    // --- Constructor không có ID (khi insert mới) ---
    public Card(Customer customer, Bank bank,
                String cardholderName, String cardNumber,
                Date expiryDate, String cvv, double balance) {
        this.customer = customer;
        this.bank = bank;
        this.cardholderName = cardholderName;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.balance = balance;
    }

    // --- Getters & Setters ---
    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public String getCardholderName() {
        return cardholderName;
    }

    public void setCardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    // --- Optional: dễ debug hơn ---
    @Override
    public String toString() {
        return "Card{" +
                "cardId=" + cardId +
                ", customer=" + (customer != null ? customer.getFullName() : "null") +
                ", bank=" + (bank != null ? bank.getBankName() : "null") +
                ", cardNumber='" + cardNumber + '\'' +
                ", expiryDate=" + expiryDate +
                ", balance=" + balance +
                '}';
    }
}
