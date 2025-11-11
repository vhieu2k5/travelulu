package dao;

import model.Customer;
import model.Bank;
import model.Card;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import util.DBConnection;

public class DAO {
    private Connection conn;

    public DAO() {
        conn = DBConnection.getConnection();
    }

    // ---------------- Customer ----------------
    public Customer getCustomerById(int id) throws SQLException {
        String sql = "SELECT * FROM customers WHERE id=?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
            return new Customer(rs.getInt("id"),
                    rs.getString("full_name"),
                    rs.getString("email"),
                    rs.getString("phone_number"),
                    rs.getString("address"),
                    rs.getString("sex"),
                    rs.getDate("dob"),
                    rs.getString("allergies"),
                    rs.getString("cccd"));
        }
        return null;
    }

    public List<Customer> searchCustomer(String keyword) throws SQLException {
        String sql = "SELECT * FROM customers WHERE email LIKE ? OR phone_number LIKE ? OR cccd LIKE ?";
        PreparedStatement ps = conn.prepareStatement(sql);
        String k = "%" + keyword + "%";
        ps.setString(1, k);
        ps.setString(2, k);
        ps.setString(3, k);
        ResultSet rs = ps.executeQuery();
        List<Customer> list = new ArrayList<>();
        while (rs.next()) {
            list.add(new Customer(rs.getInt("id"),
                    rs.getString("full_name"),
                    rs.getString("email"),
                    rs.getString("phone_number"),
                    rs.getString("address"),
                    rs.getString("sex"),
                    rs.getDate("dob"),
                    rs.getString("allergies"),
                    rs.getString("cccd")));
        }
        return list;
    }

    // ---------------- Bank ----------------
    public List<Bank> getAllBanks() throws SQLException {
        String sql = "SELECT * FROM bank";
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        List<Bank> list = new ArrayList<>();
        while (rs.next()) {
            list.add(new Bank(rs.getInt("bank_id"), rs.getString("bank_name")));
        }
        return list;
    }

    public Bank getBankById(int id) throws SQLException {
        String sql = "SELECT * FROM bank WHERE bank_id=?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
        if (rs.next()) return new Bank(rs.getInt("bank_id"), rs.getString("bank_name"));
        return null;
    }

    // ---------------- Card ----------------
    public void addCard(Card card) throws SQLException {
        String sql = "INSERT INTO card(customer_id, bank_id, cardholder_name, card_number, expiry_date, cvv) VALUES (?,?,?,?,?,?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, card.getCustomer().getId());
        ps.setInt(2, card.getBank().getBankId());
        ps.setString(3, card.getCardholderName());
        ps.setString(4, card.getCardNumber());
        ps.setDate(5, card.getExpiryDate());
        ps.setString(6, card.getCvv());
        ps.executeUpdate();
    }

   public List<Card> getAllCards() throws SQLException {
    String sql = "SELECT * FROM card";
    Statement st = conn.createStatement();
    ResultSet rs = st.executeQuery(sql);
    List<Card> list = new ArrayList<>();
    
    while (rs.next()) {
        Customer customer = getCustomerById(rs.getInt("customer_id"));
        Bank bank = getBankById(rs.getInt("bank_id"));
        
        list.add(new Card(
                rs.getInt("card_id"),
                customer,
                bank,
                rs.getString("cardholder_name"),
                rs.getString("card_number"),
                rs.getDate("expiry_date"),
                rs.getString("cvv"),
                rs.getDouble("balance") // ✅ LẤY TỪ DB
        ));
    }
    return list;
}


    public List<Card> filterByBank(String bankName) throws SQLException {
        String sql = "SELECT c.* FROM card c JOIN bank b ON c.bank_id = b.bank_id WHERE b.bank_name LIKE ?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, "%" + bankName + "%");
        ResultSet rs = ps.executeQuery();
        List<Card> list = new ArrayList<>();
        while (rs.next()) {
            Customer customer = getCustomerById(rs.getInt("customer_id"));
            Bank bank = getBankById(rs.getInt("bank_id"));
            list.add(new Card(rs.getInt("card_id"), customer, bank,
                    rs.getString("cardholder_name"),
                    rs.getString("card_number"),
                    rs.getDate("expiry_date"),
                    rs.getString("cvv"),
                    0));
        }
        return list;
    }

    public double getTotalBalanceByCustomer(int customerId) throws SQLException {
        String sql = "SELECT SUM(balance) AS total FROM card WHERE customer_id=?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, customerId);
        ResultSet rs = ps.executeQuery();
        if (rs.next()) return rs.getDouble("total");
        return 0;
    }

    public void close() {
        DBConnection.closeConnection();
    }
    
    // Update Card
public void updateCard(Card card) throws SQLException {
    String sql = "UPDATE card SET cardholder_name=?, card_number=?, expiry_date=?, cvv=?, balance=? WHERE card_id=?";
    PreparedStatement ps = conn.prepareStatement(sql);
    ps.setString(1, card.getCardholderName());
    ps.setString(2, card.getCardNumber());
    ps.setDate(3, card.getExpiryDate());
    ps.setString(4, card.getCvv());
    ps.setDouble(5, card.getBalance());
    ps.setInt(6, card.getCardId());
    ps.executeUpdate();
}

// Delete Card
public void deleteCard(int cardId) throws SQLException {
    String sql = "DELETE FROM card WHERE card_id=?";
    PreparedStatement ps = conn.prepareStatement(sql);
    ps.setInt(1, cardId);
    ps.executeUpdate();
}

}
