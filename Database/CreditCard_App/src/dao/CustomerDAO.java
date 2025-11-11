package dao;

import model.Customer;
import util.DBConnection;
import java.sql.*;

public class CustomerDAO {

    // Đăng nhập, trả về Customer nếu đúng username/password
    public Customer login(String username, String password) {
        String sql = "SELECT * FROM customers WHERE username=? AND password=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
              return new Customer(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("firstName"),
                rs.getString("lastName"),
                rs.getString("email"),
                rs.getString("phone_number"),
                rs.getString("address"),
                rs.getString("password"),
                rs.getString("sex"),
                rs.getDate("dob"),
                rs.getString("allergies"),
                rs.getString("cccd"),
                rs.getString("role"),
                rs.getTimestamp("created_at")
            );

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
