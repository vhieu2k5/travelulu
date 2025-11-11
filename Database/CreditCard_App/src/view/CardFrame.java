package view;

import dao.DAO;
import model.Bank;
import model.Card;
import model.Customer;

import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.Date;
import java.util.List;
import java.util.Calendar;

public class CardFrame extends JFrame {
    private DAO dao;

    private JTable table;
    private DefaultTableModel model;
    private JTextField txtTimKiem;
    private JComboBox<String> cmbNganHang;
    private JComboBox<String> cmbTrangThai;

    public CardFrame() {
        setTitle("Quản Lý Thẻ Ngân Hàng");
        setSize(1100, 650);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        dao = new DAO();

        // Panel trên: Tìm kiếm + Lọc
        JPanel topPanel = new JPanel();
        txtTimKiem = new JTextField(20);
        JButton btnTimKiem = new JButton("Tìm kiếm");

        cmbNganHang = new JComboBox<>();
        cmbTrangThai = new JComboBox<>(new String[]{"Tất cả", "Còn hạn", "Hết hạn"});
        JButton btnLoc = new JButton("Lọc");

        topPanel.add(new JLabel("Tìm kiếm (Email/SĐT/CCCD):"));
        topPanel.add(txtTimKiem);
        topPanel.add(btnTimKiem);
        topPanel.add(new JLabel("Ngân hàng:"));
        topPanel.add(cmbNganHang);
        topPanel.add(new JLabel("Trạng thái:"));
        topPanel.add(cmbTrangThai);
        topPanel.add(btnLoc);
        add(topPanel, BorderLayout.NORTH);

        // Bảng với cột Trạng thái
        model = new DefaultTableModel(new String[]{
                "ID", "Khách hàng", "Ngân hàng", "Tên chủ thẻ", "Số thẻ", "Ngày hết hạn", "Trạng thái"
        }, 0);
        table = new JTable(model);

        // Renderer màu cho thẻ hết hạn
        table.setDefaultRenderer(Object.class, new DefaultTableCellRenderer() {
            @Override
            public Component getTableCellRendererComponent(JTable tbl, Object value, boolean isSelected,
                                                           boolean hasFocus, int row, int column) {
                Component c = super.getTableCellRendererComponent(tbl, value, isSelected, hasFocus, row, column);
                String trangThai = (String) tbl.getValueAt(row, 6);
                if ("Hết hạn".equals(trangThai)) {
                    c.setBackground(new Color(255, 180, 180)); // đỏ nhạt
                } else {
                    c.setBackground(Color.WHITE);
                }
                if (isSelected) {
                    c.setBackground(new Color(184, 207, 229));
                }
                return c;
            }
        });

        add(new JScrollPane(table), BorderLayout.CENTER);

        // Panel dưới: CRUD + Tổng số dư
        JPanel bottomPanel = new JPanel();
        JButton btnThem = new JButton("Thêm thẻ");
        JButton btnSua = new JButton("Sửa thẻ");
        JButton btnXoa = new JButton("Xóa thẻ");
        JButton btnTongSoDu = new JButton("Tổng số dư");

        bottomPanel.add(btnThem);
        bottomPanel.add(btnSua);
        bottomPanel.add(btnXoa);
        bottomPanel.add(btnTongSoDu);
        add(bottomPanel, BorderLayout.SOUTH);

        // Load dữ liệu
        loadNganHang();
        loadCards();

        // Actions
        btnTimKiem.addActionListener(e -> timKiemThe());
        btnLoc.addActionListener(e -> locThe());
        btnThem.addActionListener(e -> themTheDialog());
        btnSua.addActionListener(e -> suaTheDialog());
        btnXoa.addActionListener(e -> xoaThe());
        btnTongSoDu.addActionListener(e -> tinhTongSoDu());
    }

    private void loadNganHang() {
        try {
            List<Bank> banks = dao.getAllBanks();
            cmbNganHang.addItem("Tất cả");
            for (Bank b : banks) {
                cmbNganHang.addItem(b.getBankName());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void loadCards() {
        try {
            List<Card> cards = dao.getAllCards();
            model.setRowCount(0);
            Date today = new Date(System.currentTimeMillis());

            for (Card c : cards) {
                String trangThai = c.getExpiryDate().before(today) ? "Hết hạn" : "Còn hạn";
                model.addRow(new Object[]{
                        c.getCardId(),
                        c.getCustomer().getFullName(),
                        c.getBank().getBankName(),
                        c.getCardholderName(),
                        c.getCardNumber(),
                        c.getExpiryDate(),
                        trangThai
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void timKiemThe() {
        try {
            String keyword = txtTimKiem.getText().trim().toLowerCase();
            List<Card> cards = dao.getAllCards();
            model.setRowCount(0);
            Date today = new Date(System.currentTimeMillis());

            for (Card c : cards) {
                boolean match = c.getCustomer().getEmail().toLowerCase().contains(keyword)
                        || c.getCustomer().getPhoneNumber().toLowerCase().contains(keyword)
                        || c.getCustomer().getCccd().toLowerCase().contains(keyword);
                if (match) {
                    String trangThai = c.getExpiryDate().before(today) ? "Hết hạn" : "Còn hạn";
                    model.addRow(new Object[]{
                            c.getCardId(),
                            c.getCustomer().getFullName(),
                            c.getBank().getBankName(),
                            c.getCardholderName(),
                            c.getCardNumber(),
                            c.getExpiryDate(),
                            trangThai
                    });
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void locThe() {
        try {
            String nganHang = cmbNganHang.getSelectedItem().toString();
            String trangThaiLoc = cmbTrangThai.getSelectedItem().toString();
            List<Card> cards = nganHang.equals("Tất cả") ? dao.getAllCards() : dao.filterByBank(nganHang);
            model.setRowCount(0);
            Date today = new Date(System.currentTimeMillis());

            for (Card c : cards) {
                boolean hetHan = c.getExpiryDate().before(today);
                String trangThai = hetHan ? "Hết hạn" : "Còn hạn";

                if (trangThaiLoc.equals("Hết hạn") && !hetHan) continue;
                if (trangThaiLoc.equals("Còn hạn") && hetHan) continue;

                model.addRow(new Object[]{
                        c.getCardId(),
                        c.getCustomer().getFullName(),
                        c.getBank().getBankName(),
                        c.getCardholderName(),
                        c.getCardNumber(),
                        c.getExpiryDate(),
                        trangThai
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Tính tổng số dư: hiển thị dialog nhập Email/SĐT/CCCD
    private void tinhTongSoDu() {
        try {
            String input = JOptionPane.showInputDialog(this,
                    "Nhập Email / SĐT / CCCD của khách hàng để tính tổng số dư:",
                    "Tổng số dư", JOptionPane.QUESTION_MESSAGE);

            if (input == null || input.trim().isEmpty()) return;

            String key = input.trim();
            List<Customer> customers = dao.searchCustomer(key);
            if (customers.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Không tìm thấy khách hàng");
                return;
            }

            Customer c = customers.get(0);
            double total = dao.getTotalBalanceByCustomer(c.getId());

            JOptionPane.showMessageDialog(this,
                    "Tổng số dư tất cả thẻ của " + c.getFullName() + ": " + total,
                    "Tổng số dư", JOptionPane.INFORMATION_MESSAGE);

        } catch (Exception ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Lỗi khi tính tổng số dư");
        }
    }

       // ----------------- CRUD -----------------

private void themTheDialog() {
    try {
        // ---------- Chuẩn bị dữ liệu ----------
        List<Bank> banks = dao.getAllBanks();
        JComboBox<String> cmbBank = new JComboBox<>();
        for (Bank b : banks) cmbBank.addItem(b.getBankName());

        JTextField txtCustomerKey = new JTextField();
        JTextField txtCardholder = new JTextField();
        JTextField txtCardNumber = new JTextField();
        JTextField txtCVV = new JTextField();
        JTextField txtBalance = new JTextField();

        // ---------- Spinner chọn ngày ----------
        SpinnerDateModel dateModel = new SpinnerDateModel(new java.util.Date(), null, null, Calendar.DAY_OF_MONTH);
        JSpinner spinnerExpiry = new JSpinner(dateModel);
        JSpinner.DateEditor dateEditor = new JSpinner.DateEditor(spinnerExpiry, "yyyy-MM-dd");
        spinnerExpiry.setEditor(dateEditor);

        // ---------- Tạo Panel Form ----------
        JPanel panel = new JPanel(new GridLayout(0, 2, 5, 5));
        panel.add(new JLabel("Khách hàng (Email/SĐT/CCCD):"));
        panel.add(txtCustomerKey);
        panel.add(new JLabel("Ngân hàng:"));
        panel.add(cmbBank);
        panel.add(new JLabel("Tên chủ thẻ:"));
        panel.add(txtCardholder);
        panel.add(new JLabel("Số thẻ (16 chữ số):"));
        panel.add(txtCardNumber);
        panel.add(new JLabel("Ngày hết hạn:"));
        panel.add(spinnerExpiry);
        panel.add(new JLabel("CVV (3–4 chữ số):"));
        panel.add(txtCVV);
        panel.add(new JLabel("Số dư:"));
        panel.add(txtBalance);

        boolean valid = false;
        while (!valid) {
            int option = JOptionPane.showConfirmDialog(this, panel, "Thêm thẻ", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
            if (option != JOptionPane.OK_OPTION) return;

            String message = "";

            // ---- Validate từng field ----
            String key = txtCustomerKey.getText().trim();
            if (key.isEmpty()) message += "• Khách hàng không được để trống\n";
            List<Customer> customers = key.isEmpty() ? List.of() : dao.searchCustomer(key);
            if (customers.isEmpty()) message += "• Không tìm thấy khách hàng\n";

            String bankName = (String) cmbBank.getSelectedItem();
            Bank bank = banks.stream().filter(b -> b.getBankName().equals(bankName)).findFirst().orElse(null);
            if (bank == null) message += "• Chưa chọn ngân hàng\n";

            String cardholder = txtCardholder.getText().trim();
            if (cardholder.isEmpty()) message += "• Tên chủ thẻ không được để trống\n";

            String cardNumber = txtCardNumber.getText().trim();
            if (!cardNumber.matches("\\d{16}")) message += "• Số thẻ phải đủ 16 chữ số\n";

            java.util.Date selectedDate = (java.util.Date) spinnerExpiry.getValue();
            java.sql.Date expiry = new java.sql.Date(selectedDate.getTime());
            if (expiry.before(new java.sql.Date(System.currentTimeMillis())))
                message += "• Ngày hết hạn không được ở quá khứ\n";

            String cvv = txtCVV.getText().trim();
            if (!cvv.matches("\\d{3,4}")) message += "• CVV phải là 3 hoặc 4 chữ số\n";

            double balance = -1;
            try {
                balance = Double.parseDouble(txtBalance.getText().trim());
                if (balance < 0) message += "• Số dư phải ≥ 0\n";
            } catch (Exception ex) {
                message += "• Số dư không hợp lệ\n";
            }

            if (!message.isEmpty()) {
                JOptionPane.showMessageDialog(this, message, "Lỗi nhập liệu", JOptionPane.WARNING_MESSAGE);
                continue; // giữ nguyên form để người dùng sửa
            }

            // ---- Nếu hợp lệ ----
            Customer customer = customers.get(0);
            Card card = new Card(0, customer, bank, cardholder, cardNumber, expiry, cvv, balance);
            dao.addCard(card);
            loadCards();
            JOptionPane.showMessageDialog(this, "Thêm thẻ thành công!");
            valid = true;
        }

    } catch (Exception e) {
        e.printStackTrace();
        JOptionPane.showMessageDialog(this, "Lỗi khi thêm thẻ: " + e.getMessage());
    }
}

private void suaTheDialog() {
    try {
        int selectedRow = table.getSelectedRow();
        if (selectedRow < 0) {
            JOptionPane.showMessageDialog(this, "Chọn thẻ để sửa!");
            return;
        }

        int cardId = (int) table.getValueAt(selectedRow, 0);
        Card card = dao.getAllCards().stream()
                .filter(c -> c.getCardId() == cardId)
                .findFirst()
                .orElse(null);

        if (card == null) {
            JOptionPane.showMessageDialog(this, "Không tìm thấy thẻ!");
            return;
        }

        // ---------- Field hiện tại ----------
        JTextField txtCardholder = new JTextField(card.getCardholderName());
        JTextField txtCardNumber = new JTextField(card.getCardNumber());
        JTextField txtCVV = new JTextField(card.getCvv());
        JTextField txtBalance = new JTextField(String.valueOf(card.getBalance()));

        // ---------- Date Spinner ----------
        SpinnerDateModel dateModel = new SpinnerDateModel(
                new java.util.Date(card.getExpiryDate().getTime()), null, null, Calendar.DAY_OF_MONTH);
        JSpinner spinnerExpiry = new JSpinner(dateModel);
        JSpinner.DateEditor dateEditor = new JSpinner.DateEditor(spinnerExpiry, "yyyy-MM-dd");
        spinnerExpiry.setEditor(dateEditor);

        JPanel panel = new JPanel(new GridLayout(0, 2, 5, 5));
        panel.add(new JLabel("Tên chủ thẻ:"));
        panel.add(txtCardholder);
        panel.add(new JLabel("Số thẻ (16 chữ số):"));
        panel.add(txtCardNumber);
        panel.add(new JLabel("Ngày hết hạn:"));
        panel.add(spinnerExpiry);
        panel.add(new JLabel("CVV (3–4 chữ số):"));
        panel.add(txtCVV);
        panel.add(new JLabel("Số dư:"));
        panel.add(txtBalance);

        boolean valid = false;
        while (!valid) {
            int option = JOptionPane.showConfirmDialog(this, panel, "Sửa thẻ", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
            if (option != JOptionPane.OK_OPTION) return;

            String message = "";

            // ---- Validate ----
            String cardholder = txtCardholder.getText().trim();
            if (cardholder.isEmpty()) message += "• Tên chủ thẻ không được để trống\n";

            String cardNumber = txtCardNumber.getText().trim();
            if (!cardNumber.matches("\\d{16}")) message += "• Số thẻ phải đủ 16 chữ số\n";

            java.util.Date selectedDate = (java.util.Date) spinnerExpiry.getValue();
            java.sql.Date expiry = new java.sql.Date(selectedDate.getTime());
            if (expiry.before(new java.sql.Date(System.currentTimeMillis())))
                message += "• Ngày hết hạn không được ở quá khứ\n";

            String cvv = txtCVV.getText().trim();
            if (!cvv.matches("\\d{3,4}")) message += "• CVV phải là 3 hoặc 4 chữ số\n";

            double balance = -1;
            try {
                balance = Double.parseDouble(txtBalance.getText().trim());
                if (balance < 0) message += "• Số dư phải ≥ 0\n";
            } catch (Exception ex) {
                message += "• Số dư không hợp lệ\n";
            }

            if (!message.isEmpty()) {
                JOptionPane.showMessageDialog(this, message, "Lỗi nhập liệu", JOptionPane.WARNING_MESSAGE);
                continue; // giữ nguyên form
            }

            // ---- Nếu hợp lệ ----
            card.setCardholderName(cardholder);
            card.setCardNumber(cardNumber);
            card.setExpiryDate(expiry);
            card.setCvv(cvv);
            card.setBalance(balance);

            dao.updateCard(card); // cần có method updateCard() trong DAO
            loadCards();
            JOptionPane.showMessageDialog(this, "Cập nhật thẻ thành công!");
            valid = true;
        }

    } catch (Exception e) {
        e.printStackTrace();
        JOptionPane.showMessageDialog(this, "Lỗi khi sửa thẻ: " + e.getMessage());
    }
}


    private void xoaThe() {
        try {
            int selectedRow = table.getSelectedRow();
            if (selectedRow < 0) {
                JOptionPane.showMessageDialog(this, "Chọn thẻ để xóa!");
                return;
            }
            int cardId = (int) table.getValueAt(selectedRow, 0);
            int option = JOptionPane.showConfirmDialog(this, "Xóa thẻ ID " + cardId + "?", "Xác nhận", JOptionPane.YES_NO_OPTION);
            if (option == JOptionPane.YES_OPTION) {
                dao.deleteCard(cardId);
                loadCards();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new CardFrame().setVisible(true));
    }
}
