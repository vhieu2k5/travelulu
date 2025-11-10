
package travelulu;

public class Booking {
    public String id;
    public int CusId;
    public String tourName;
    public String status;

    public Booking(String id, int CusId, String tourName, String status) {
        this.id = id;
        this.CusId = CusId;
        this.tourName = tourName;
        this.status = status;
    }
    public String getInfor(){
        return "Chuyen di "+id+"-"+tourName+" cua Khach hang "+CusId;
    }
    
    
}
