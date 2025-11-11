package dao;

import model.CreditCard;
import util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CreditCardDAO {

    // Lấy danh sách tất cả thẻ
    public List<CreditCard> getAllCards() {
        List<CreditCard> list = new ArrayList<>();
        String sql = "SELECT * FROM credit_card";
        try (Connection conn = DBConnection.getConnection();
             Statement st = conn.createStatement()) {
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                CreditCard card = new CreditCard(
                        rs.getString("cardID"),
                        rs.getInt("userId"),
                        rs.getString("pass"),
                        rs.getString("cardNumber"),
                        rs.getString("bankName"),
                        rs.getString("cardholder_name"),
                        rs.getDouble("moneyLeft"),
                        rs.getDate("expiredDate")
                );
                list.add(card);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    // Lấy danh sách thẻ theo khách hàng
    public List<CreditCard> getCardsByCustomer(int userId) {
        List<CreditCard> list = new ArrayList<>();
        String sql = "SELECT * FROM credit_card WHERE userId=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(new CreditCard(
                        rs.getString("cardID"),
                        rs.getInt("userId"),
                        rs.getString("pass"),
                        rs.getString("cardNumber"),
                        rs.getString("bankName"),
                        rs.getString("cardholder_name"),
                        rs.getDouble("moneyLeft"),
                        rs.getDate("expiredDate")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    // Thêm thẻ
    public void addCard(CreditCard card) {
        String sql = "INSERT INTO credit_card(cardID,userId,pass,cardNumber,bankName,cardholder_name,moneyLeft,expiredDate) VALUES (?,?,?,?,?,?,?,?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, card.getCardID());
            ps.setInt(2, card.getUserId());
            ps.setString(3, card.getPass());
            ps.setString(4, card.getCardNumber());
            ps.setString(5, card.getBankName());
            ps.setString(6, card.getCardholderName());
            ps.setDouble(7, card.getMoneyLeft());
            ps.setDate(8, card.getExpiredDate());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Xóa thẻ
    public boolean deleteCard(String cardID) {
        String sql = "DELETE FROM credit_card WHERE cardID=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, cardID);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Tìm kiếm thẻ theo ID
    public CreditCard findCardById(String cardID) {
        String sql = "SELECT * FROM credit_card WHERE cardID=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, cardID);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new CreditCard(
                        rs.getString("cardID"),
                        rs.getInt("userId"),
                        rs.getString("pass"),
                        rs.getString("cardNumber"),
                        rs.getString("bankName"),
                        rs.getString("cardholder_name"),
                        rs.getDouble("moneyLeft"),
                        rs.getDate("expiredDate")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
     public void updateCardMoney(String cardID, double newMoney) {
        String sql = "UPDATE credit_card SET moneyLeft = ? WHERE cardID = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setDouble(1, newMoney);
            ps.setString(2, cardID);
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
