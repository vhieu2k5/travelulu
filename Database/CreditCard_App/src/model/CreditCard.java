package model;

import java.sql.Date;

public class CreditCard {
    private String cardID;
    private int userId;
    private String pass;
    private String cardNumber;
    private String bankName;
    private String cardholderName;
    private double moneyLeft;
    private Date expiredDate;

    public CreditCard() {}

    public CreditCard(String cardID, int userId, String pass, String cardNumber,
                      String bankName, String cardholderName, double moneyLeft, Date expiredDate) {
        this.cardID = cardID;
        this.userId = userId;
        this.pass = pass;
        this.cardNumber = cardNumber;
        this.bankName = bankName;
        this.cardholderName = cardholderName;
        this.moneyLeft = moneyLeft;
        this.expiredDate = expiredDate;
    }

    // --- Getters và Setters ---
    public String getCardID() { return cardID; }
    public void setCardID(String cardID) { this.cardID = cardID; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getPass() { return pass; }
    public void setPass(String pass) { this.pass = pass; }

    
    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getCardholderName() { return cardholderName; }
    public void setCardholderName(String cardholderName) { this.cardholderName = cardholderName; }

    public double getMoneyLeft() { return moneyLeft; }
    public void setMoneyLeft(double moneyLeft) { this.moneyLeft = moneyLeft; }

    public Date getExpiredDate() { return expiredDate; }
    public void setExpiredDate(Date expiredDate) { this.expiredDate = expiredDate; }
}
