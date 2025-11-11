package controller;

import dao.CreditCardDAO;
import model.CreditCard;
import java.util.List;

public class CreditCardController {
    private CreditCardDAO dao = new CreditCardDAO();

    public List<CreditCard> getAllCards() { return dao.getAllCards(); }

    public List<CreditCard> getCardsByCustomer(int userId) { return dao.getCardsByCustomer(userId); }

    public void addCard(CreditCard card) { dao.addCard(card); }

    public boolean deleteCard(String cardID) { return dao.deleteCard(cardID); }

    public CreditCard searchCardById(String cardID) { return dao.findCardById(cardID); }

    // Thống kê tổng tiền theo khách
    public double totalMoneyByCustomer(int userId) {
        return dao.getCardsByCustomer(userId)
                .stream()
                .mapToDouble(CreditCard::getMoneyLeft)
                .sum();
    }
    
     public void updateCardMoney(String cardID, double money) {
        dao.updateCardMoney(cardID, money);
    }

}
