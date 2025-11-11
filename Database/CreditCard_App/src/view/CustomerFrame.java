package view;

import controller.CreditCardController;
import model.CreditCard;
import model.Customer;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.Date;
import java.util.List;

public class CustomerFrame extends JFrame {

    private CreditCardController controller = new CreditCardController();
    private JTable table;
    private DefaultTableModel model;
    private Customer customer;

    private JTextField txtCardID, txtCardNumber, txtBank, txtHolder, txtPass, txtMoney, txtExpired;
    private JComboBox<String> cbFilterBank;

    public CustomerFrame(Customer c) {
        this.customer = c;

        // 🔹 Giao diện đẹp (Nimbus)
        try {
            UIManager.setLookAndFeel("javax.swing.plaf.nimbus.NimbusLookAndFeel");
        } catch (Exception ignored) {}

        setTitle("💳 Quản lý thẻ ngân hàng - Khách hàng: " + c.getUsername());
        setSize(950, 600);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout(10, 10));
        getContentPane().setBackground(new Color(245, 248, 250));

        // 🔼 Panel nhập dữ liệu
        JPanel inputPanel = new JPanel(new GridBagLayout());
        inputPanel.setBorder(BorderFactory.createTitledBorder("Thông tin thẻ"));
        inputPanel.setBackground(Color.WHITE);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 10, 5, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        txtCardID = new JTextField();
//        txtCardID.setEditable(false); // ID tự động, không nhập
        txtCardNumber = new JTextField();
        txtBank = new JTextField();
        txtHolder = new JTextField(c.getFirstName() + " " + c.getLastName());
        txtHolder.setEditable(false);
        txtPass = new JTextField();
        txtMoney = new JTextField();
        txtExpired = new JTextField("2026-01-01");

        addField(inputPanel, gbc, 0, "Mã thẻ (Card ID):", txtCardID);
        addField(inputPanel, gbc, 1, "Số thẻ (Card Number):", txtCardNumber);
        addField(inputPanel, gbc, 2, "Ngân hàng (Bank):", txtBank);
        addField(inputPanel, gbc, 3, "Tên chủ thẻ:", txtHolder);
        addField(inputPanel, gbc, 4, "Mật khẩu (Pass):", txtPass);
        addField(inputPanel, gbc, 5, "Số tiền còn lại:", txtMoney);
        addField(inputPanel, gbc, 6, "Ngày hết hạn (yyyy-mm-dd):", txtExpired);

        add(inputPanel, BorderLayout.NORTH);

        // 📋 Bảng
        model = new DefaultTableModel(new String[]{
                "Mã Thẻ", "Ngân Hàng", "Số Thẻ", "Số Tiền", "Ngày Hết Hạn"
        }, 0);
        table = new JTable(model);
        table.setRowHeight(28);
        table.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        table.getTableHeader().setFont(new Font("Segoe UI", Font.BOLD, 14));
        table.getTableHeader().setBackground(new Color(230, 230, 250));
        table.getTableHeader().setReorderingAllowed(false);
        JScrollPane scroll = new JScrollPane(table);
        scroll.setBorder(BorderFactory.createTitledBorder("Danh sách thẻ ngân hàng"));
        add(scroll, BorderLayout.CENTER);

        // 🎯 Khi click vào bảng → hiển thị dữ liệu lên các ô nhập
        table.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                int row = table.getSelectedRow();
                if (row != -1) {
                    txtCardID.setText(model.getValueAt(row, 0).toString());
                    txtBank.setText(model.getValueAt(row, 1).toString());
                    txtCardNumber.setText(model.getValueAt(row, 2).toString());
                    txtMoney.setText(model.getValueAt(row, 3).toString());
                    txtExpired.setText(model.getValueAt(row, 4).toString());

                    CreditCard card = controller.searchCardById(txtCardID.getText());
                    if (card != null) {
                        txtPass.setText(card.getPass());
                        txtHolder.setText(card.getCardholderName());
                    }
                }
            }
        });

        // 🔘 Panel dưới
        JButton btnAdd = new JButton("➕ Thêm thẻ");
        JButton btnDelete = new JButton("🗑 Xóa thẻ");
        JButton btnUpdate = new JButton("💰 Cập nhật số tiền");
        JButton btnTotal = new JButton("📊 Tổng tiền");
        cbFilterBank = new JComboBox<>(new String[]{"Tất cả", "Vietcombank", "ACB", "Techcombank", "MB Bank"});

        JPanel bottomPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 10));
        bottomPanel.setBackground(new Color(240, 245, 250));
        bottomPanel.add(btnAdd);
        bottomPanel.add(btnDelete);
        bottomPanel.add(btnUpdate);
        bottomPanel.add(btnTotal);
        bottomPanel.add(new JLabel("🔍 Lọc theo ngân hàng:"));
        bottomPanel.add(cbFilterBank);

        add(bottomPanel, BorderLayout.SOUTH);

        // ⚙️ Load dữ liệu
        loadCards();

        // ⚙️ Các chức năng
        btnAdd.addActionListener(e -> addCard());
        btnDelete.addActionListener(e -> deleteCard());
        btnUpdate.addActionListener(e -> updateMoney());
        btnTotal.addActionListener(e -> showTotal());
        cbFilterBank.addActionListener(e -> filterByBank());
    }

    // 👉 Hàm tiện ích thêm ô nhập liệu
    private void addField(JPanel panel, GridBagConstraints gbc, int y, String label, JTextField field) {
        gbc.gridx = 0; gbc.gridy = y; gbc.weightx = 0.3;
        panel.add(new JLabel(label), gbc);
        gbc.gridx = 1; gbc.weightx = 0.7;
        panel.add(field, gbc);
    }

    private void loadCards() {
        model.setRowCount(0);
        List<CreditCard> list = controller.getCardsByCustomer(customer.getId());
        for (CreditCard c : list) {
            model.addRow(new Object[]{
                    c.getCardID(), c.getBankName(), c.getCardNumber(),
                    c.getMoneyLeft(), c.getExpiredDate()
            });
        }
    }

    private void addCard() {
    try {
        // Lấy dữ liệu nhập
        String cardID = txtCardID.getText().trim();
        String cardNumber = txtCardNumber.getText().trim();
        String bank = txtBank.getText().trim();
        String pass = txtPass.getText().trim();
        String holder = txtHolder.getText().trim();
        String expired = txtExpired.getText().trim();
        String moneyText = txtMoney.getText().trim();

        // Kiểm tra trống
        if (cardID.isEmpty() || cardNumber.isEmpty() || bank.isEmpty() || pass.isEmpty() || moneyText.isEmpty()) {
            JOptionPane.showMessageDialog(this, "⚠️ Vui lòng nhập đầy đủ thông tin thẻ!", "Thiếu thông tin", JOptionPane.WARNING_MESSAGE);
            return;
        }

        // Kiểm tra CardID trùng
        CreditCard existing = controller.searchCardById(cardID);
        if (existing != null) {
            JOptionPane.showMessageDialog(this, "❌ Mã thẻ \"" + cardID + "\" đã tồn tại! Vui lòng nhập mã khác.", "Lỗi trùng mã", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Tạo thẻ mới
        CreditCard c = new CreditCard(
                cardID,
                customer.getId(),
                pass,
                cardNumber,
                bank,
                holder,
                Double.parseDouble(moneyText),
                Date.valueOf(expired)
        );

        // Gọi controller để thêm
        controller.addCard(c);
        JOptionPane.showMessageDialog(this, "✅ Thêm thẻ thành công!", "Thành công", JOptionPane.INFORMATION_MESSAGE);
        loadCards();
        clearFields();

    } catch (IllegalArgumentException ex) {
        JOptionPane.showMessageDialog(this, "⚠️ Ngày hết hạn không hợp lệ! Vui lòng nhập đúng định dạng yyyy-mm-dd.", "Lỗi định dạng", JOptionPane.ERROR_MESSAGE);
    } catch (Exception ex) {
        JOptionPane.showMessageDialog(this, "⚠️ Đã xảy ra lỗi khi thêm thẻ!\n" + ex.getMessage(), "Lỗi hệ thống", JOptionPane.ERROR_MESSAGE);
    }
}


    private void deleteCard() {
        int row = table.getSelectedRow();
        if (row == -1) return;
        String id = model.getValueAt(row, 0).toString();
        controller.deleteCard(id);
        loadCards();
        clearFields();
        JOptionPane.showMessageDialog(this, "🗑 Đã xóa thẻ!");
    }

    private void updateMoney() {
        int row = table.getSelectedRow();
        if (row == -1) return;

        String id = txtCardID.getText();
        String newMoney = JOptionPane.showInputDialog("💰 Nhập số tiền mới:", txtMoney.getText());
        if (newMoney != null && !newMoney.isEmpty()) {
            try {
                double money = Double.parseDouble(newMoney);
                controller.updateCardMoney(id, money);
                loadCards();
                JOptionPane.showMessageDialog(this, "💾 Cập nhật thành công!");
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "⚠️ Dữ liệu không hợp lệ!");
            }
        }
    }

    private void showTotal() {
        double total = controller.totalMoneyByCustomer(customer.getId());
        JOptionPane.showMessageDialog(this, "📊 Tổng tiền trong các thẻ của bạn: " + total + " VNĐ");
    }

    private void filterByBank() {
        String bank = cbFilterBank.getSelectedItem().toString();
        model.setRowCount(0);
        List<CreditCard> list = controller.getCardsByCustomer(customer.getId());
        for (CreditCard c : list) {
            if (bank.equals("Tất cả") || c.getBankName().equalsIgnoreCase(bank)) {
                model.addRow(new Object[]{
                        c.getCardID(), c.getBankName(), c.getCardNumber(),
                        c.getMoneyLeft(), c.getExpiredDate()
                });
            }
        }
    }

    private void clearFields() {
        txtCardID.setText("");
        txtCardNumber.setText("");
        txtBank.setText("");
        txtPass.setText("");
        txtMoney.setText("");
        txtExpired.setText("2026-01-01");
    }
}
