package view;

import controller.CreditCardController;
import model.CreditCard;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class AdminFrame extends JFrame {

    private CreditCardController controller = new CreditCardController();
    private JTable table;
    private DefaultTableModel model;
    private JTextField txtSearch;

    public AdminFrame() {
        setTitle("Admin - Quản lý thẻ khách hàng");
        setSize(800, 500);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // 🔍 Thanh tìm kiếm
        JPanel topPanel = new JPanel(new FlowLayout());
        txtSearch = new JTextField(20);
        JButton btnSearch = new JButton("Tìm kiếm theo Card ID");
        JButton btnRefresh = new JButton("Tải lại");
        JButton btnDelete = new JButton("Xóa thẻ");
        JButton btnTotal = new JButton("Thống kê tổng tiền theo UserID");
        topPanel.add(txtSearch);
        topPanel.add(btnSearch);
        topPanel.add(btnRefresh);
        topPanel.add(btnDelete);
        topPanel.add(btnTotal);
        add(topPanel, BorderLayout.NORTH);

        // 📋 Bảng
        model = new DefaultTableModel(new String[]{
                "CardID", "UserID", "Bank", "CardNumber", "Holder", "Money Left", "Expired Date"
        }, 0);
        table = new JTable(model);
        JScrollPane scroll = new JScrollPane(table);
        add(scroll, BorderLayout.CENTER);

        loadAllCards();

        // 🎯 Chức năng
        btnSearch.addActionListener(e -> searchCard());
        btnRefresh.addActionListener(e -> loadAllCards());
        btnDelete.addActionListener(e -> deleteCard());
        btnTotal.addActionListener(e -> totalMoneyByUser());
    }

    private void loadAllCards() {
        model.setRowCount(0);
        List<CreditCard> list = controller.getAllCards();
        for (CreditCard c : list) {
            model.addRow(new Object[]{
                    c.getCardID(), c.getUserId(), c.getBankName(),
                    c.getCardNumber(), c.getCardholderName(),
                    c.getMoneyLeft(), c.getExpiredDate()
            });
        }
    }

    private void searchCard() {
        String id = txtSearch.getText().trim();
        if (id.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Nhập CardID để tìm!");
            return;
        }
        CreditCard c = controller.searchCardById(id);
        model.setRowCount(0);
        if (c != null) {
            model.addRow(new Object[]{
                    c.getCardID(), c.getUserId(), c.getBankName(),
                    c.getCardNumber(), c.getCardholderName(),
                    c.getMoneyLeft(), c.getExpiredDate()
            });
        } else {
            JOptionPane.showMessageDialog(this, "Không tìm thấy thẻ!");
        }
    }

    private void deleteCard() {
        int row = table.getSelectedRow();
        if (row == -1) {
            JOptionPane.showMessageDialog(this, "Chọn 1 dòng để xóa!");
            return;
        }
        String cardID = model.getValueAt(row, 0).toString();
        if (controller.deleteCard(cardID)) {
            JOptionPane.showMessageDialog(this, "Xóa thành công!");
            loadAllCards();
        } else {
            JOptionPane.showMessageDialog(this, "Không thể xóa!");
        }
    }

    private void totalMoneyByUser() {
        String userIdStr = JOptionPane.showInputDialog(this, "Nhập ID khách hàng:");
        if (userIdStr == null || userIdStr.isEmpty()) return;
        try {
            int userId = Integer.parseInt(userIdStr);
            double total = controller.totalMoneyByCustomer(userId);
            JOptionPane.showMessageDialog(this, "Tổng tiền trong các thẻ của user " + userId + " là: " + total);
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "ID không hợp lệ!");
        }
    }
}
