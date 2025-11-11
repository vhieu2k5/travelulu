/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package creditcard_app;

/**
 *
 * @author PC
 */
import javax.swing.SwingUtilities;
import view.CardFrame;
public class CreditCard_App {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // Khởi chạy GUI trên Event Dispatch Thread
        SwingUtilities.invokeLater(() -> {
            CardFrame frame = new CardFrame();
            frame.setVisible(true);
        });
    }
    
}
