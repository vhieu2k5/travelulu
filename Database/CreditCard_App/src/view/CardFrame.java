package view;

import dao.DAO;
import model.Bank;
import model.Card;
import model.Customer;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.Date;
import java.util.List;
import java.util.Calendar;
import javax.swing.table.DefaultTableCellRenderer;
public class CardFrame extends JFrame {
    private DAO dao;

    private JTable table;
    private DefaultTableModel model;
    private JTextField txtSearch;
    private JComboBox<String> cmbBank;
    private JLabel lblTotalBalance;
private JComboBox<String> cmbStatus;
        public CardFrame() {
        setTitle("Card Management");
        setSize(1100, 650);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        dao = new DAO();

        // Top panel: Search + Filter
        JPanel topPanel = new JPanel();
        txtSearch = new JTextField(20);
        JButton btnSearch = new JButton("Search");

        cmbBank = new JComboBox<>();
        cmbStatus = new JComboBox<>(new String[]{"All", "Valid", "Expired"}); // Filter trạng thái
        JButton btnFilter = new JButton("Filter");

        topPanel.add(new JLabel("Search (Email/Phone/CCCD):"));
        topPanel.add(txtSearch);
        topPanel.add(btnSearch);
        topPanel.add(new JLabel("Filter by Bank:"));
        topPanel.add(cmbBank);
        topPanel.add(new JLabel("Status:"));
        topPanel.add(cmbStatus);
        topPanel.add(btnFilter);
        add(topPanel, BorderLayout.NORTH);

        // Table với cột Status
        model = new DefaultTableModel(new String[]{
                "ID", "Customer", "Bank", "Cardholder", "Card Number", "Expiry Date", "Status"
        }, 0);
        table = new JTable(model);

        // Renderer màu cho hết hạn
        table.setDefaultRenderer(Object.class, new DefaultTableCellRenderer() {
            @Override
            public Component getTableCellRendererComponent(JTable tbl, Object value, boolean isSelected,
                                                           boolean hasFocus, int row, int column) {
                Component c = super.getTableCellRendererComponent(tbl, value, isSelected, hasFocus, row, column);
                String status = (String) tbl.getValueAt(row, 6);
                if ("Expired".equals(status)) {
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

        // Bottom panel: CRUD + Show Total Balance
        JPanel bottomPanel = new JPanel();
        JButton btnAdd = new JButton("Add Card");
        JButton btnEdit = new JButton("Edit Card");
        JButton btnDelete = new JButton("Delete Card");
        JButton btnShowTotal = new JButton("Show Total Balance");
        lblTotalBalance = new JLabel("Total Balance: 0");

        bottomPanel.add(btnAdd);
        bottomPanel.add(btnEdit);
        bottomPanel.add(btnDelete);
        bottomPanel.add(btnShowTotal);
        bottomPanel.add(lblTotalBalance);
        add(bottomPanel, BorderLayout.SOUTH);

        // Load data
        loadBanks();
        loadCards();

        // Actions
        btnSearch.addActionListener(e -> searchCards());
        btnFilter.addActionListener(e -> filterCards());
        btnAdd.addActionListener(e -> addCardDialog());
        btnEdit.addActionListener(e -> editCardDialog());
        btnDelete.addActionListener(e -> deleteCard());
        btnShowTotal.addActionListener(e -> showCustomerTotalBalance());
    }
    private void loadBanks() {
        try {
            List<Bank> banks = dao.getAllBanks();
            cmbBank.addItem("All");
            for (Bank b : banks) {
                cmbBank.addItem(b.getBankName());
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

     // Load toàn bộ thẻ với cột Status
    private void loadCards() {
        try {
            List<Card> cards = dao.getAllCards();
            model.setRowCount(0);
            Date today = new Date(System.currentTimeMillis());

            for (Card c : cards) {
                String status = c.getExpiryDate().before(today) ? "Expired" : "Valid";
                model.addRow(new Object[]{
                        c.getCardId(),
                        c.getCustomer().getFullName(),
                        c.getBank().getBankName(),
                        c.getCardholderName(),
                        c.getCardNumber(),
                        c.getExpiryDate(),
                        status
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void searchCards() {
        try {
            String keyword = txtSearch.getText().trim();
            List<Card> cards = dao.getAllCards();
            model.setRowCount(0);
            for (Card c : cards) {
                if (c.getCustomer().getEmail().contains(keyword)
                        || c.getCustomer().getPhoneNumber().contains(keyword)
                        || c.getCustomer().getCccd().contains(keyword)) {
                    model.addRow(new Object[]{
                            c.getCardId(),
                            c.getCustomer().getFullName(),
                            c.getBank().getBankName(),
                            c.getCardholderName(),
                            c.getCardNumber(),
                            c.getExpiryDate()
                    });
                }
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    private void filterCards() {
        try {
            String bankName = cmbBank.getSelectedItem().toString();
            String statusFilter = cmbStatus.getSelectedItem().toString();

            List<Card> cards = bankName.equals("All") ? dao.getAllCards() : dao.filterByBank(bankName);
            model.setRowCount(0);
            Date today = new Date(System.currentTimeMillis());

            for (Card c : cards) {
                boolean expired = c.getExpiryDate().before(today);
                String status = expired ? "Expired" : "Valid";

                if (statusFilter.equals("Expired") && !expired) continue;
                if (statusFilter.equals("Valid") && expired) continue;

                model.addRow(new Object[]{
                        c.getCardId(),
                        c.getCustomer().getFullName(),
                        c.getBank().getBankName(),
                        c.getCardholderName(),
                        c.getCardNumber(),
                        c.getExpiryDate(),
                        status
                });
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    private void updateTotalBalance() {
        try {
            int selectedRow = table.getSelectedRow();
            if (selectedRow >= 0) {
                int customerId = dao.getAllCards().get(selectedRow).getCustomer().getId();
                double total = dao.getTotalBalanceByCustomer(customerId);
                lblTotalBalance.setText("Total Balance for Selected Customer: " + total);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    // ----------------- CRUD -----------------

private void addCardDialog() {
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
        panel.add(new JLabel("Customer (Email/Phone/CCCD):"));
        panel.add(txtCustomerKey);
        panel.add(new JLabel("Bank:"));
        panel.add(cmbBank);
        panel.add(new JLabel("Cardholder Name:"));
        panel.add(txtCardholder);
        panel.add(new JLabel("Card Number (16 digits):"));
        panel.add(txtCardNumber);
        panel.add(new JLabel("Expiry Date:"));
        panel.add(spinnerExpiry);
        panel.add(new JLabel("CVV (3–4 digits):"));
        panel.add(txtCVV);
        panel.add(new JLabel("Balance:"));
        panel.add(txtBalance);

        boolean valid = false;
        while (!valid) {
            int option = JOptionPane.showConfirmDialog(this, panel, "Add Card", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
            if (option != JOptionPane.OK_OPTION) return;

            String message = "";

            // ---- Validate từng field ----
            String key = txtCustomerKey.getText().trim();
            if (key.isEmpty()) message += "• Customer cannot be empty\n";
            List<Customer> customers = key.isEmpty() ? List.of() : dao.searchCustomer(key);
            if (customers.isEmpty()) message += "• Customer not found\n";

            String bankName = (String) cmbBank.getSelectedItem();
            Bank bank = banks.stream().filter(b -> b.getBankName().equals(bankName)).findFirst().orElse(null);
            if (bank == null) message += "• Bank not selected\n";

            String cardholder = txtCardholder.getText().trim();
            if (cardholder.isEmpty()) message += "• Cardholder name required\n";

            String cardNumber = txtCardNumber.getText().trim();
            if (!cardNumber.matches("\\d{16}")) message += "• Card number must be 16 digits\n";

            java.util.Date selectedDate = (java.util.Date) spinnerExpiry.getValue();
            java.sql.Date expiry = new java.sql.Date(selectedDate.getTime());
            if (expiry.before(new java.sql.Date(System.currentTimeMillis())))
                message += "• Expiry date cannot be in the past\n";

            String cvv = txtCVV.getText().trim();
            if (!cvv.matches("\\d{3,4}")) message += "• CVV must be 3 or 4 digits\n";

            double balance = -1;
            try {
                balance = Double.parseDouble(txtBalance.getText().trim());
                if (balance < 0) message += "• Balance must be ≥ 0\n";
            } catch (Exception ex) {
                message += "• Invalid balance format\n";
            }

            if (!message.isEmpty()) {
                JOptionPane.showMessageDialog(this, message, "Validation Error", JOptionPane.WARNING_MESSAGE);
                continue; // giữ nguyên form để người dùng sửa
            }

            // ---- Nếu hợp lệ ----
            Customer customer = customers.get(0);
            Card card = new Card(0, customer, bank, cardholder, cardNumber, expiry, cvv, balance);
            dao.addCard(card);
            loadCards();
            JOptionPane.showMessageDialog(this, "Card added successfully!");
            valid = true;
        }

    } catch (Exception e) {
        e.printStackTrace();
        JOptionPane.showMessageDialog(this, "Error adding card: " + e.getMessage());
    }
}








    private void editCardDialog() {
    try {
        int selectedRow = table.getSelectedRow();
        if (selectedRow < 0) {
            JOptionPane.showMessageDialog(this, "Select a card to edit!");
            return;
        }

        int cardId = (int) table.getValueAt(selectedRow, 0);
        Card card = dao.getAllCards().stream()
                .filter(c -> c.getCardId() == cardId)
                .findFirst()
                .orElse(null);

        if (card == null) {
            JOptionPane.showMessageDialog(this, "Card not found!");
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
        panel.add(new JLabel("Cardholder Name:"));
        panel.add(txtCardholder);
        panel.add(new JLabel("Card Number (16 digits):"));
        panel.add(txtCardNumber);
        panel.add(new JLabel("Expiry Date:"));
        panel.add(spinnerExpiry);
        panel.add(new JLabel("CVV (3–4 digits):"));
        panel.add(txtCVV);
        panel.add(new JLabel("Balance:"));
        panel.add(txtBalance);

        boolean valid = false;
        while (!valid) {
            int option = JOptionPane.showConfirmDialog(this, panel, "Edit Card", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
            if (option != JOptionPane.OK_OPTION) return;

            String message = "";

            // ---- Validate ----
            String cardholder = txtCardholder.getText().trim();
            if (cardholder.isEmpty()) message += "• Cardholder name required\n";

            String cardNumber = txtCardNumber.getText().trim();
            if (!cardNumber.matches("\\d{16}")) message += "• Card number must be 16 digits\n";

            java.util.Date selectedDate = (java.util.Date) spinnerExpiry.getValue();
            java.sql.Date expiry = new java.sql.Date(selectedDate.getTime());
            if (expiry.before(new java.sql.Date(System.currentTimeMillis())))
                message += "• Expiry date cannot be in the past\n";

            String cvv = txtCVV.getText().trim();
            if (!cvv.matches("\\d{3,4}")) message += "• CVV must be 3–4 digits\n";

            double balance = -1;
            try {
                balance = Double.parseDouble(txtBalance.getText().trim());
                if (balance < 0) message += "• Balance must be ≥ 0\n";
            } catch (Exception ex) {
                message += "• Invalid balance format\n";
            }

            if (!message.isEmpty()) {
                JOptionPane.showMessageDialog(this, message, "Validation Error", JOptionPane.WARNING_MESSAGE);
                continue; // giữ nguyên form
            }

            // ---- Nếu hợp lệ ----
            card.setCardholderName(cardholder);
            card.setCardNumber(cardNumber);
            card.setExpiryDate(expiry);
            card.setCvv(cvv);
            card.setBalance(balance);

            dao.updateCard(card); // phải có method updateCard() trong DAO
            loadCards();
            JOptionPane.showMessageDialog(this, "Card updated successfully!");
            valid = true;
        }

    } catch (Exception e) {
        e.printStackTrace();
        JOptionPane.showMessageDialog(this, "Error editing card: " + e.getMessage());
    }
}


    private void deleteCard() {
        try {
            int selectedRow = table.getSelectedRow();
            if (selectedRow < 0) {
                JOptionPane.showMessageDialog(this, "Select a card to delete!");
                return;
            }
            int cardId = (int) table.getValueAt(selectedRow, 0);
            int option = JOptionPane.showConfirmDialog(this, "Delete card ID " + cardId + "?", "Confirm", JOptionPane.YES_NO_OPTION);
            if (option == JOptionPane.YES_OPTION) {
                dao.deleteCard(cardId); // cần viết method deleteCard trong DAO
                loadCards();
            }
        } catch (Exception e) { e.printStackTrace(); }
    }
 private void showCustomerTotalBalance() {
        try {
            String key = txtSearch.getText().trim();
            if (key.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Nhập Email/Phone/CCCD của khách hàng để tính tổng số dư");
                return;
            }
            List<Customer> customers = dao.searchCustomer(key);
            if (customers.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Không tìm thấy khách hàng");
                return;
            }
            Customer c = customers.get(0);
            double total = dao.getTotalBalanceByCustomer(c.getId());
            lblTotalBalance.setText("Total Balance for " + c.getFullName() + ": " + total);
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "Lỗi khi tính tổng số dư");
        }
    }
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new CardFrame().setVisible(true));
    }
}
