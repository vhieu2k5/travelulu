package view;

import dao.CustomerDAO;
import model.Customer;
import javax.swing.*;

public class LoginFrame extends JFrame {
    public LoginFrame() {
        setTitle("Login");
        setSize(350, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        JLabel lblUser = new JLabel("Username:");
        JLabel lblPass = new JLabel("Password:");
        JTextField txtUser = new JTextField();
        JPasswordField txtPass = new JPasswordField();
        JButton btnLogin = new JButton("Login");

        setLayout(null);
        lblUser.setBounds(30, 30, 80, 25);
        txtUser.setBounds(120, 30, 180, 25);
        lblPass.setBounds(30, 70, 80, 25);
        txtPass.setBounds(120, 70, 180, 25);
        btnLogin.setBounds(120, 110, 100, 30);

        add(lblUser); add(txtUser);
        add(lblPass); add(txtPass);
        add(btnLogin);

        btnLogin.addActionListener(e -> {
            String user = txtUser.getText();
            String pass = new String(txtPass.getPassword());
            CustomerDAO dao = new CustomerDAO();
            Customer c = dao.login(user, pass);

            if (c != null) {
                JOptionPane.showMessageDialog(this, "Login thành công!");
                dispose();
                if ("admin".equals(c.getRole()))
                    new AdminFrame().setVisible(true);
                else
                    new CustomerFrame(c).setVisible(true);
            } else {
                JOptionPane.showMessageDialog(this, "Sai tài khoản hoặc mật khẩu!");
            }
        });
    }
}
