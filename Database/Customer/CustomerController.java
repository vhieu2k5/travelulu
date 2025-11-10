package travelulu;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.ObjectOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import javax.swing.*;
import java.text.*;
import java.util.stream.Collectors;
import static travelulu.TraveluluFrame.model;

public class CustomerController {

    List<Customer> listOfCus = new ArrayList<>();
    static Connection conn = ConnectDB.getConnect();

    public void Reload() {
        String sql = "select * from customer.customers";
        try (Statement stmt = conn.createStatement(); ResultSet res = stmt.executeQuery(sql)) {
            model.setRowCount(0);
            while (res.next()) {
                int id = res.getInt("id");
                String username = res.getString("username");
                String firstname = res.getString("firstName");
                String lastname = res.getString("lastName");
                String email = res.getString("email");
                String phoneNumber = res.getString("phoneNumber");
                String address = res.getString("address");
                String password = res.getString("password");
                String sex = res.getString("sex");
                String dob = res.getString("dob");
                String cccd = res.getString("cccd");

                Customer newCus = new Customer(id, username, firstname, lastname, email, phoneNumber, address, password, sex, dob, null, cccd);
                listOfCus.add(newCus);

                model.addRow(new Object[]{id, username, firstname, lastname});
                // System.out.println(id + ", " + "Username: " + username + firstname + " " + lastname + " ");
            }
        } catch (SQLException e) {
            System.out.println("Taken the datas!");
        }
    }

    public int ValidifyCustomerInfor(String userName, String email, String phonenumber, String sex, String cccd, String dob) {
        if (!email.contains("@")) {
            return 1;
        } else if (phonenumber.length() < 10) {
            return 2;
        } else if (sex.equals("male") && sex.equals("female")) {
            return 3;
        } else if (cccd.length() != 12) {
            return 4;
        }
        //Dinh dang ngay
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        sdf.setLenient(false); // Disable lenient parsing (e.g., "32/01/2025" will be invalid)

        try {
            sdf.parse(dob);
        } catch (ParseException e) {
            return 5;
        }
        for (Customer c : listOfCus) {
            if (c.username.equals(userName)) {
                return 0;
            }
        }
        return 6;
    }

    public int AddingCustomer(String userName, String firstname, String lastname, String email, String phonenumber, String address, String password, String sex, String dob, String cccd) {
        int check = ValidifyCustomerInfor(userName, email, phonenumber, sex, cccd, dob);
        if (check == 6) {
            String sql = "insert into customer.customers(username, firstName, lastName, email, phoneNumber, address, password, sex, dob, cccd) values(?,?,?,?,?,?,?,?,?,?)";

            try (PreparedStatement res = conn.prepareStatement(sql)) {
                res.setString(1, userName);
                res.setString(2, firstname);
                res.setString(3, lastname);
                res.setString(4, email);
                res.setString(5, phonenumber);
                res.setString(6, address);
                res.setString(7, password);
                res.setString(8, sex);
                res.setString(9, dob);
                res.setString(10, cccd);
                res.executeUpdate();
                Reload();
            } catch (Exception e) {
            }
        }
        return check;
    }

    public int UpdateInfor(int id, String userName, String lastname, String firstname, String email, String phonenumber, String sex, String cccd, String dob) {
        int check = ValidifyCustomerInfor(userName, email, phonenumber, sex, cccd, dob);
        if (check == 0 || check == 6) {
            //insert into customer.customers(username, firstName, lastName, email, phoneNumber, address, password, sex, dob, cccd) values(?,?,?,?,?,?,?,?,?,?)";
            String sql = "update customer.customers set  firstName = ?, lastName = ?,email = ?, phoneNumber = ?,  sex= ?,  dob = ?,  cccd =? where id=?;";

            try (PreparedStatement res = conn.prepareStatement(sql)) {
                res.setString(1, firstname);
                res.setString(2, lastname);
                res.setString(3, email);
                res.setString(4, phonenumber);
                res.setString(5, sex);
                res.setString(6, dob);
                res.setString(7, cccd);
                res.setString(8, String.valueOf(id));
                res.executeUpdate();
                Reload();
            } catch (Exception e) {
            }
        }
        return check;
    }

    public boolean ExportingDatas() {
        File f = new File("C:\\Users\\Admin\\OneDrive\\Documents\\NetBeansProjects\\Travelulu\\src\\travelulu\\customerData.txt");
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(f, false))) {
            oos.writeObject(listOfCus);
            oos.close();
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public List<Customer> FindCustomer(String key) {
        List<Customer> temp_ListOfCus = new ArrayList<>();
        model.setRowCount(0);//reset bang hien thi
        String sql = "select * from customer.customers";
        try (Statement stmt = conn.createStatement(); ResultSet res = stmt.executeQuery(sql)) {

            while (res.next()) {
                int id = res.getInt("id");
                String username = res.getString("username");
                String firstname = res.getString("firstName");
                String lastname = res.getString("lastName");
                String email = res.getString("email");
                String phoneNumber = res.getString("phoneNumber");
                String address = res.getString("address");
                String password = res.getString("password");
                String sex = res.getString("sex");
                String dob = res.getString("dob");
                String cccd = res.getString("cccd");
                //Xu ly
                Customer newCus = new Customer(id, username, firstname, lastname, email, phoneNumber, address, password, sex, dob, null, cccd);
                temp_ListOfCus.add(newCus);
            }
            temp_ListOfCus = temp_ListOfCus.stream().filter((Customer c) -> MatchName(key, c)).collect(Collectors.toList());
            for (Customer c : temp_ListOfCus) {
                model.addRow(new Object[]{c.getId(), c.username, c.firstName, c.lastName});
            }
        } catch (SQLException e) {
            System.out.println("Taken the datas!");
        }
        return temp_ListOfCus;
    }

    public Customer FindCustomerByID(int ID) {
        for (Customer c : listOfCus) {
            if (c.getId() == ID) {
                return c;
            }
        }
        return null;
    }

    public boolean MatchName(String a, Customer b) {
        return (a.equalsIgnoreCase(b.username) || a.equalsIgnoreCase(b.firstName) || a.equalsIgnoreCase(b.lastName));
    }

    public boolean RemoveCustomer(int id) {
        String sql = "delete from customer.customers where id = ?;";
        try (PreparedStatement p = conn.prepareStatement(sql)) {
            p.setString(1, String.valueOf(id));
            p.executeUpdate();
            listOfCus.remove(FindCustomerByID(id));
            Reload();
            return true;
        } catch (SQLException ex) {
            System.getLogger(CustomerController.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return false;
    }

    public static void main(String[] args) {

    }

}
