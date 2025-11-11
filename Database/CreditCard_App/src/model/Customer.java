package model;

import java.sql.Date;

public class Customer {
    private int id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private String sex;
    private Date dob;
    private String allergies;
    private String cccd;

    // Constructor
    public Customer(int id, String fullName, String email, String phoneNumber, String address,
                    String sex, Date dob, String allergies, String cccd) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.sex = sex;
        this.dob = dob;
        this.allergies = allergies;
        this.cccd = cccd;
    }

    // Getters and Setters
    public int getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getAddress() { return address; }
    public String getSex() { return sex; }
    public Date getDob() { return dob; }
    public String getAllergies() { return allergies; }
    public String getCccd() { return cccd; }
}
